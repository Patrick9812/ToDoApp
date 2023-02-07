const express = require('express');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const auth = (req, res, next) =>
{
    const token = req.cookies.token;
    try
    {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    }
    catch (err)
    {
        res.clearCookie("token")
        console.log("Logowanie nie powiodło się")
        return res.redirect("/login")
    }
}

module.exports = auth;