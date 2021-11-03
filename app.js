require('dotenv').config();
const fs = require('fs');
const express = require("express");
const app = express();
const path = require('path');
const ejs = require('ejs');
const e = require('express');

// console.log(arguments);
// console.log(require("module").wrapper);

app.set('view engine', 'ejs');

//
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// to serve static content
app.use(express.static(path.join(__dirname, 'public')));


const userdataobj = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/usersdata.json`)
);


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

//
app.route('/register')

.get((req, res) => {
    res.render('register');
})

.post((req, res) => {
    console.log(req.body);

    const newId = userdataobj.length;
    console.log(newId);

    const newUser = Object.assign({ id: newId }, req.body);
    console.log(newUser);

    userdataobj.push(newUser);
    console.log(userdataobj);
    console.log(JSON.stringify(userdataobj));

    fs.writeFile(`${__dirname}/dev-data/usersdata.json`, JSON.stringify(userdataobj), (err) => {
        if (err) throw err;
        res.status(201).json({
            status: 'success',
            data: {
                newUser: newUser,
                userdataobj: userdataobj
            }
        });
        console.log('done');
    });
});

//
app.route('/users/:id?')

.get((req, res) => {

    const id = req.params.id;
    if (!id) {
        res.render('users', { a: userdataobj });
    } else {
        if (id >= 0 && id < userdataobj.length) {
            // res.status(200).json({
            //     status: 'success',
            //     data: {
            //         user_detail: userdataobj[id]
            //     }
            // });
            res.render('users', {
                a: [userdataobj[id]]
            });
        } else {
            res.status(404).json({
                status: '404 Not Found'
            })
        }
    }
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         userdataobj
    //     }
    // });
})

.post((req, res) => {


    console.log(req.body);
    const uname = req.body.uname;

    var flag = false;
    var user;
    for (let i = 0; i < userdataobj.length; i++) {
        const ele = userdataobj[i];
        if (ele.uname == uname) {
            f = true;
            user = ele
            break;
        }
    }
    if (!user) {
        res.status(404).json({
            status: '404 Not Found'
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
});


// ~~~~~~~~~~~~~ code for listening to port

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});