const express = require('express');
const cookieParser=require('cookie-parser');
const sessions = require('express-session');

const app = express();

app.use(express.static('public'));


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret:'thisismysecret',
    saveUninitialized:true,
    cookie:{maxAge: oneDay },
    resave : false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const myUsername = 'user1';
const myPass = 'mypassword';

var session;




app.get("/" , (req,res)=>{
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>Click to logout</a>");
    }
    else
    res.sendFile('views/index.html',{root:__dirname})
});

app.post("/user",(req,res)=>{
    if(req.body.username === myUsername && req.body.password === myPass){
        session=req.session;
        session.userid = req.body.username;
        console.log(req.session);
        res.send("Welcome User <a href=\'/logout'>Click to logout</a>");
    }
    else{
        res.send('Invalid username or password');
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    console.log("Session ended");
    res.redirect('/');
})


module.exports = app;