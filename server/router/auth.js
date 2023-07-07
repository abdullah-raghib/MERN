const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const authenticate = require('../middleware/authenticate');
const { findOne } = require('../models/userSchema');





// Register Routing Using Promises

// router.post('/register', (req, res) => {
//     console.log(req.body);
//     // res.json({message:req.body});
//     // res.send("my register page.");


//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.json({ Error: "all field must be filled" });

//     }
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ Error: "email already exist" })
//             }
//             const user = new User({ name, email, phone, work, password, cpassword });
//             user.save().then(() => {
//                 res.status(220).json({ message: "your data saved in database" })
//             }).catch((error) => {
//                 res.status(500).json({ error: "Failed to save data in database" })
//             })
//         }).catch((err)=>{console.log(err);})


// })



// Register routing

router.post('/register', async (req, res) => {
    console.log(req.body);
    // res.json({message:req.body});
    // res.send("my register page.");


    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.json({ Error: "all field must be filled" });


    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ Error: "email already exist" })
            console.log("email already exist");
        }
        else if (password != cpassword) {
            return res.status(422).json({ Error: "Password didn't match" })
            console.log("Password didn't match");
        }
        else {


            const user = new User({ name, email, phone, work, password, cpassword });

            const userData = await user.save();
            if (userData) {

                res.status(220).json({ message: "your data saved in database" })
            }
            else {

                res.status(500).json({ error: "Failed to save data in database" })
            }
        }

    } catch (err) {
        console.log(err);
    }



})


// Login Routing

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        // window.alert("all field must be filled");
        res.status(422).json({ Error: "all field must be filled" });
    console.log("all field must be filled");
    }

    try {
        const userExistL = await User.findOne({ email: email });


        if (userExistL) {
            let token;

            const isMatch = await bcrypt.compare(password, userExistL.password);

            token = await userExistL.generateAuthToken();

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })


            console.log(isMatch);
            if (!isMatch) {
                res.status(422).json({ Error: "Invalid Credential pw" })
                console.log("Invalid Credential pw");

            }
            else {
                res.status(200).json({ message: "login successfull" })
            }





            // I did it on my own way ..... dont know whether it is right or not .... but working.

            // const userPassL = await User.findOne({ password : userExistL.password });
            // console.log(userExistL.password);
            // console.log(userPassL);
            // if (userPassL) {
            //     res.status(220).json({ message: "User login successfull" });
            // } else {

            //     res.status(422).json({ Error: "Invalid credential pw" });
            // }

        } else {
            // window.alert("invalid credentials em");

            res.status(422).json({ Error: "Invalid credential " });
           console.log("invalid credential em");

        }



    } catch (err) {
        console.log(err);
    }



})


// About Us Page

router.get('/abouts', authenticate, (req, res) => {
    res.send(req.rootUser);
    console.log("welcome to the about page");
})


router.get('/getData', authenticate, (req, res) => {
    res.send(req.rootUser);
    console.log("welcome to the about page");
})


router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log(" error in contact form");
            return res.json({ error: "contact form not filled" })

        }

        const userContact = await User.findOne({ _id: req.userId });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();

            res.status(200).json({ message: "contact saved in database" });
        }

    } catch (err) {
        console.log(err);
    }
})
router.get('/',(req,res)=>{
    res.send("welcome to the home pagnbnbbnbbe from app");
})
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken'); 
    res.redirect('/');
    res.status(200).send("welcome to logout page");
    console.log("welcome to the about page");
})


module.exports = router;
