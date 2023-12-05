require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const router = express.Router();


router.put('/', async (req, res) => {

    console.log("#### reset-password");
    try {
        const password = req.body.password;
        const token = req.headers.authorization.split(" ")[1];

        console.log(password);
        console.log("reset-password token: " + token);

        console.log("### process.env.JWT_SECRET: " + process.env.JWT_SECRET);


        if (!password || !token) {
            return res.status(400).send({ message: "Missing password !" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodedToken: " + decodedToken);
        const user = UserModel.findOne({ email: decodedToken.email });
        console.log(user);


        if (!user) {
            return res.status(404).set({ message: "User not exists" });
        }

        const newHashedPassword = await bcrypt.hash(password, 10);
        console.log(newHashedPassword);
        const userSet = await UserModel.findOneAndUpdate({ email: decodedToken.email }, { $set: { hashedPassword: newHashedPassword } })

        console.log("password hashed and saved")
        res.status(200).send({ message: "Password updated" });

    } catch (error) {
        res.status(500).send({ message: "internal servier error" });
    }

    // Ausgabe aus der Konsolle von dem Token: 
    //[0] reset-password token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    //eyJlbWFpbCI6Ijc5eHg5N0BnbWFpbC5jb20iL
    //CJpYXQiOjE3MDEwMDY1MTV9.rtVsMk2T6iw8pYB8PHwty8b6N7N31v5oCEkOXRRWSus
});

module.exports = router;