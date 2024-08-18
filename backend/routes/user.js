const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
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
                res.status(411).json({
                    message: "user already exist"
                })
                return;
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

                res.status(201).json({
                    token,
                    message: "User created successfully"
                });

                return;
            }
            else {
                res.status(500).json({
                    message: "Error while creating user"
                });

                return;
            }
        }
        catch(err) {
            res.status(500).json({
                message: "Catch Error while creating user" + err
            });

            return;
        }
        
    }
    else {
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
    
    
});

router.post("/signin", (req, res) => {
    res.send("signin");
});

module.exports = router;