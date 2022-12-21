const express = require('express');

const app = express();

app.use(express.static('public'));

app.get("/" , (req,res)=>{
    res.sendFile('views/index.html',{root:__dirname})
});


module.exports = app;