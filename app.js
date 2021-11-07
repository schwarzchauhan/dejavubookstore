require('dotenv').config();
// console.log(process.env);
const fs = require('fs');
const express = require("express");
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.YOUR_GOOGLE_CLIENT_ID);
const registerRoute = require('./routes/register');
const usersRoute = require('./routes/users');
const booksRoute = require('./routes/books');

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
app.use('/books', booksRoute);
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
    res.render('index', { p1: p[0], p2: p[1], p3: p[2], YOUR_GOOGLE_CLIENT_ID: process.env.YOUR_GOOGLE_CLIENT_ID });
});

app.route('/login')

.get((req, res) => {
    console.log(process.env.YOUR_GOOGLE_CLIENT_ID);
    res.render('login', { YOUR_GOOGLE_CLIENT_ID: process.env.YOUR_GOOGLE_CLIENT_ID });
})

.post((req, res) => {
    console.log(process.env.YOUR_GOOGLE_CLIENT_ID);
    console.log(req.body);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.YOUR_GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        console.log(payload);
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         payload
        //     }
        // });
        res.render('dashboard', { profileImgUrl: payload.picture, profileName: payload.name });
    }
    verify().catch(console.error);

    // res.render('login', { YOUR_CLIENT_ID: process.env.YOUR_CLIENT_ID });
});

// ~~~~~~~~~~~~~ code for listening to port

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});