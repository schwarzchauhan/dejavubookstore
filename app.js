require('dotenv').config();
// console.log(process.env);
const fs = require('fs');
const express = require("express");
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const usersRoute = require('./routes/users');

//
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// to serve static content
app.use(express.static(path.join(__dirname, 'public')));
// setting html template
app.set('view engine', 'ejs');


app.use('/register', registerRoute);
app.use('/users', usersRoute);
// console.log(arguments);
// console.log(require("module").wrapper);



//
app.route('/')

.get((req, res) => {
    var p = [];
    for (let i = 1; i <= 3; i++) {
        p.push(`/pix/carousel/${i}.jpg`);
    }
    console.log(p);
    res.render('index', { p1: p[0], p2: p[1], p3: p[2] });
});


// ~~~~~~~~~~~~~ code for listening to port

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});