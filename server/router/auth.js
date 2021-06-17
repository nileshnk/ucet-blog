const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send('Hello world from the server router.js');
});

//Using promises
/* router.post('/register', (req, res) => {

    const { name, email, mobile, password, cpassword } = req.body;

    if (!name || !email || !mobile || !password || !cpassword)
        return res.status(422).json({ error: "Please fill the fields" });

        
    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "email already exist" });
            }

            const user = new User({ name, email, mobile, password, cpassword });

            user.save().then(() => {
                res.status(201).json({ message: "user registerd successfully" });
            }).catch((err) =>  res.status(500).json({ error: "Failed to register" }));

        }).catch(err => { console.log(err);})

}); */

router.post('/register', async (req, res) => {

    const { name, email, mobile, password, cpassword } = req.body;

    if (!name || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the fields" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        }

        const user = new User({ name, email, mobile, password, cpassword });
        
        await user.save();

        res.status(201).json({ message: "user registerd successfully" });

        
    
    } catch (err) {
        console.log(err);
    }


});

//login route

router.post('/signin', async (req,res)=> {
   /*  console.log(req.body);
    res.json({message :"signed in"}); */
    try {
        const { email,password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({error:"Invalid Credentials"})
        }

        const userLogin = await User.findOne({email:email});

        console.log(userLogin);

        if(!userLogin) {
            res.json({ message: "Invalid Credentials"});
        }
        else {
            res.json({ message: "Signed In Successfully"});
        }
      

    } catch(err) {
        console.log(err);
    }
} )


module.exports = router;