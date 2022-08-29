const express = require("express");
const app = express();
const cookieParser =require("cookie-parser");
const jwt = require('jsonwebtoken');


const User = require('../models/userSchema')
app.use(cookieParser)

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.MY_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log(rootUser);
        if (!rootUser) {
            throw new Error ("User not found");
            alert("user not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("unauthorize: no token provided")
        console.log("no token provided:",err)


    }


}

module.exports = Authenticate;