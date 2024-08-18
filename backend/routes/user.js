const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const authMiddleware = require("../middleware/middleware");
const {userNameSchema, passwordSchema, firstNameSchema, lastNameSchema} = require("../type");
const { User } = require("../db");

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
                message: "Catch Error while creating user" + err
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
                message: "Invalid user name or password"
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

router.post("/restricted", authMiddleware, (req, res) => {
    console.log(req.userId);
});

module.exports = router;