const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schema/userSchema');
const joi = require('joi');
const joiValid = require('../security/loginJoi');
const toDo = require('../schema/toDoSchema');
const ExpressError = require("../security/ExpressError");
const ErrAsync = require("../security/asyncSec");

router.get("/", (req, res) => {
    res.render("register");
})

router.post("/", ErrAsync(async (req, res) => {
    joiValid;
    const { error } = joiValid.validate(req.body);
    if (error)
    {
        const message = error.details.map(c => c.message).join(",")
        throw new ExpressError(message, 400);
    }
    const { login, password } = req.body;
    const hash = await bcrypt.hash(password, 13);
    const user = new User({login: login, password: hash});
    user.save()
    res.redirect("/login");
}))

module.exports = router;