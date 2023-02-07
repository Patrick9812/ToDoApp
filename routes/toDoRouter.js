const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');
const ToDo = require('../schema/toDoSchema');
const router = express.Router();
const auth = require('../security/loginAccess');
const dataNow = require('../security/aktData');
const dataCheck = require("../security/dataCheck");
const compare = require('../security/dataComp');
const joiValid = require('../security/toDoJoi');
const ExpressError = require("../security/ExpressError");
const ErrAsync = require("../security/asyncSec");

router.get("/", auth, (req, res) =>
{
    const {id} = req.params;
    res.render("todo.ejs");
})

router.get("/:id", auth, async(req, res) => {
    const {id} = req.params;
    const find = await User.findById(id).populate("activities");
    const to = await ToDo.find({userId: find._id, stan: "Do Zrobienia"}).populate("userId");
    const wh = await ToDo.find({userId: find._id, stan: "W Trakcie"}).populate("userId");
    const done = await ToDo.find({userId: find._id, stan: "Zrobione"}).populate("userId");
    res.render("todo.ejs", {find, to, wh, done});
})

router.get("/:id/new", auth, async(req, res) => 
{
    const {id} = req.params;
    const find = await User.findById(id);
    res.render("new", {find});
})

router.get("/:userid/:id/edit", auth, async(req, res) => 
{
    const {userid} = req.params;
    const {id} = req.params;
    const find = await User.findById(userid);
    const doo = await ToDo.findById(id);
    res.render("edit", {doo, find})
})

router.put("/:userid/:id/edit", auth, ErrAsync(async(req, res) => 
{
    joiValid;
    const { error } = joiValid.validate(req.body);
    if (error)
    {
        const message = error.details.map(c => c.message).join(",")
        throw new ExpressError(message, 400);
    }
    const {userid} = req.params;
    const {id} = req.params;
    await User.findById(userid);
    await ToDo.findById(id);
    const {title, stan, date} = req.body;
    let dataAkt = dataNow();
    const body = dataCheck(dataAkt, date);
    const bool = compare(dataAkt, date);
    if(bool === true)
    {
        if(body === 1)
        {
            await ToDo.findByIdAndUpdate(id, {title: title, stan: stan, date: date, bord: "none"}, {runValidators: true});
            return res.redirect(`/toDo/${userid}`);
        }
        
        else if(body === 2)
        {
            await ToDo.findByIdAndUpdate(id, {title: title, stan: stan, date: date, bord: "true"}, {runValidators: true});
            return res.redirect(`/toDo/${userid}`);
        }
        else if(body === 3)
        {
            await ToDo.findByIdAndUpdate(id, {title: title, stan: stan, date: date, bord: "false"}, {runValidators: true});
            return res.redirect(`/toDo/${userid}`);
        }
        else if(body === 4)
        {
            await ToDo.findByIdAndUpdate(id, {title: title, stan: stan, date: date, bord: "after"}, {runValidators: true});
            return res.redirect(`/toDo/${userid}`);
        }
        return res.redirect(`/toDo/${userid}`);
    }
    else
    {
        return res.redirect(`/toDo/${userid}`)
    }
}))

router.delete("/:id/:questId", auth, ErrAsync(async(req, res) => 
{
    const {id} = req.params;
    const find = await User.findById(id).populate("activities");
    const {questId} = req.params;
    await ToDo.findByIdAndDelete({_id: questId})
    res.redirect(`/toDo/${id}`)
}))

router.post("/:id/new", auth, ErrAsync(async(req, res) => 
{
    joiValid;
    const { error } = joiValid.validate(req.body);
    if (error)
    {
        const message = error.details.map(c => c.message).join(",")
        throw new ExpressError(message, 400);
    }
    const {id} = req.params;
    const user = await User.findById(id);
    const {title, stan, date} = req.body;
    let dataAkt = dataNow();
    const body = dataCheck(dataAkt, date);
    console.log(body)
    const bool = compare(dataAkt, date);
    if(bool === true)
    {
        if(body === 1)
        {
            const task = new ToDo({title: title, stan: stan, date: date, bord: "none"});
            const usr = user._id;
            user.activities.push(task);
            task.userId.push(usr);
            task.save();
            user.save();
            return res.redirect(`/toDo/${usr}`)
        }
        else if(body === 2)
        {
            const task = new ToDo({title: title, stan: stan, date: date, bord: "true"});
            const usr = user._id;
            user.activities.push(task);
            task.userId.push(usr);
            task.save();
            user.save();
            return res.redirect(`/toDo/${usr}`)
        }
        else if(body === 3)
        {
            const task = new ToDo({title: title, stan: stan, date: date, bord: "false"});
            const usr = user._id;
            user.activities.push(task);
            task.userId.push(usr);
            task.save();
            user.save();
            return res.redirect(`/toDo/${usr}`)
        }
        else if(body === 4)
        {
            const task = new ToDo({title: title, stan: stan, date: date, bord: "after"});
            const usr = user._id;
            user.activities.push(task);
            task.userId.push(usr);
            task.save();
            console.log("jestem")
            user.save();
            return res.redirect(`/toDo/${usr}`)
        }
    } 
    if(bool === false)
    {
        const usr = user._id;
        return res.redirect(`/toDo/${usr}`)
    }
}))

router.delete("/", auth, (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})
module.exports = router;