const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const authMiddleware = require("../middleware/middleware");
const {userNameSchema, passwordSchema, firstNameSchema, lastNameSchema} = require("../type");
const { User, Account } = require("../db");

const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.post("/signup", async (req, res) => {
    let {username, password, firstname, lastname} = req.body;

    const userNameResult = userNameSchema.safeParse({username});
    const passwordResult = passwordSchema.safeParse({password});
    const firstNameResult = firstNameSchema.safeParse({firstname});
    const lastNameResult = lastNameSchema.safeParse({lastname});

    if(userNameResult.success && passwordResult.success && firstNameResult.success && lastNameResult.success) {

        password = bcrypt.hashSync(password, salt);

        try {

            const userAlreadyExist = await User.findOne({username});

            if(userAlreadyExist) {

                return res.status(411).json({
                    message: "user already exist"
                });

            }

            const user = await User.create({
                                username,
                                password,
                                firstname,
                                lastname
                            });

            if(user) {

                let amount = 1  + Math.random() * 10000;
                amount = amount.toFixed(2);
                amount = parseFloat(amount);
                
                const result = await Account.create({userid: user._id, balance: amount});

                if(!result) {
                    return res.status(500).json({
                        message: "error while adding amount"
                    });
                }

                const id = user.id;
                let token = jwt.sign({id}, jwtSecret);
                token = "Bearer " + token;

                return res.status(201).json({
                    token,
                    message: "User created successfully"
                });

            }
            else {

                return res.status(500).json({
                    message: "Error while creating user"
                });

            }
        }
        catch(err) {

            return res.status(500).json({
                message: "Error while creating user" + err
            });

        }
        
    }
    else {

        return res.status(400).json({
            message: "Invalid credentials"
        });

    }
    
    
});

router.post("/signin", async (req, res) => {
    const {username, password } = req.body;

    try {

        const user = await User.findOne({username});

        if(!user) {

            return res.status(401).json({
                message: "Invalid user name and password"
            });

        } 

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(401).json({
                message: "Password Invalid user name or password"
            });

        }

        const id = user.id;

        let token = jwt.sign({id}, jwtSecret);
        token = "Bearer " + token;
        
        return res.status(200).json({
            token
        });

    }
    catch(err) {

        return res.status(411).json({
            message: "Error while logging in"
        });

    }
});

router.put("/", authMiddleware, async (req, res) => {
    let {firstname, lastname, password} = req.body;
    const id = req.userId;

    try {
        const passwordResult = passwordSchema.safeParse({password});
        const firstNameResult = firstNameSchema.safeParse({firstname});
        const lastNameResult = lastNameSchema.safeParse({lastname});

        if(!(firstNameResult.success && lastNameResult.success && passwordResult.success)) {
            return res.status(411).json({
                message: "first name or last name or password are invalid"
            });
        }

        password = jwt.sign({id}, jwtSecret);

        const result = await User.findOneAndUpdate({_id: req.userId}, {$set: {firstname, lastname, password}});

        if(result) {
            return res.status(200).json({
                message: "information updated successfully"
            });
        }
        else {
            return res.status(411).json({
                message: "error while updating the user information"
            });
        }
    }
    catch(error) {
        return res.status(500).json({
            message: "error while updating the user information"
        });
    }
    
});

router.get("/populate", authMiddleware, async(req, res) => {
    const id = req.userId;

    const user = await User.findById(id, "firstname");
    const firstname = user.firstname;
    const userAccount = await Account.findOne({userid: id}, "balance");
    const balance = userAccount.balance;
    
    if(!user) {
        return res.status(500).json({
            message: "error while fetching the user information"
        });
    }

    return res.status(200).json({
        firstname,
        balance
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const id = req.userId;

    const user = await User.find({
        _id: { $ne: id },
        $or: [
            {
                firstname: {
                    $regex: filter,
                    $options: "i"
                }
            },
            {
                lastname: {
                    $regex: filter,
                    $options: "i"
                }
            }
        ]
    }, "username firstname lastname _id");
    
    if(user) {
        return res.status(200).json({
            user
        });
    }
    
    return res.status(500).json({
        message: "error while fetching the users data"
    })
})

module.exports = router;