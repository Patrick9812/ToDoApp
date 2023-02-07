const express = require('express');
const cookie = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const User = require('../schema/userSchema');
const flash = require('connect-flash')
const toDo = require('../schema/toDoSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");



router.get("/", (req, res) => {
    res.clearCookie("token");
    res.render("login");
})


router.post("/", async(req, res) => 
{
    const {login, password} = req.body;
    const uservalid = await User.findOne({login: login});
    
    if(!uservalid)
    {
        console.log("Nie ma takiego użytkownika")
        return res.redirect("/login")
    }
    else
    {
        const hash = await bcrypt.compare(password, uservalid.password)
        if(!hash)
        {
            console.log("Złe hasło")
            return res.redirect("/login")
        }
        else
        {
            const val = uservalid._id;
            const token = jwt.sign({_id: val}, process.env.TOKEN_SECRET, {expiresIn: '35min'});
            res.cookie("token", token,
            {
                httpOnly: true,
            })
            res.redirect(`/toDo/${val}`);
        }
        
    }
    
    
})


module.exports = router;