const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// SIGNUP

router.post("/signup", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        // check existing user

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user

        const newUser = new User({

            name,
            email,
            phone,
            password: hashedPassword

        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // check user

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email"
            });

        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        // generate token

        const token = jwt.sign(

            {
                id: user._id
            },

            "secretkey",

            {
                expiresIn: "7d"
            }

        );

        res.json({

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;