const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const flash = require('connect-flash');
const method = require('method-override');
const mate = require('ejs-mate');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const joi = require('joi')

const User = require('./schema/userSchema');
const ToDo = require('./schema/toDoSchema');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const toDoRouter = require('./routes/toDoRouter');
app.use(method('_method'));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());
app.use(cookieParser());

app.set('public', path.join(__dirname , "/public"));
app.set('views', path.join(__dirname , "/views"));
app.set('view engine', 'ejs');
mongoose.set('strictQuery', false);

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/toDo", toDoRouter);
app.engine("ejs", mate);

const port = 3000;


main().catch(err => console.log(err));
async function main() 
{
    await mongoose.connect('mongodb://mongo:27017/docker-node-mongo');
    console.log("Udało się połączyć")
}
app.get("/test", (req, res) => {
    
    res.send("login");
})
app.get("/", (req, res) =>
{
    res.redirect("/login");
})

app.use((err, req, res, next) =>
{
    const {status = 500} = err;
    if(!err.message)
    {
        err.message = "Coś poszło nie tak";
    }
    res.status(status).render("error2", {err});
})

app.get('*', (req, res) =>
    {
        res.send('error', 404);
    });

app.listen(port, () =>
{
    console.log(`Serwer działa na porcie 3000`);
})