const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL).then(
    () => { console.log('ready to use'); },
    err => { console.log(err); }
);
const User = require('../models/user');

const userdataobj = JSON.parse(
    fs.readFileSync('dev-data/usersdata.json', "utf-8")
);


router.route('/')

.get((req, res) => {
    res.render('register');
})

.post((req, res) => {
    console.log(req.body);

    // const newId = userdataobj.length;
    // console.log(newId);

    // const newUser = Object.assign({ id: newId }, req.body);
    // console.log(newUser);

    // userdataobj.push(newUser);
    // console.log(userdataobj);
    // console.log(JSON.stringify(userdataobj));

    // https://mongoosejs.com/docs/models.html#constructing-documents
    const query = User.where({ username: req.body.uname });
    query.findOne(function(err, doc) {
        if (err) return handleError(err);
        if (doc) {
            // doc may be null if no document matched
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'an account with this username already exists'
                }
            });
        } else {
            const u = new User({
                username: req.body.uname,
                password: req.body.pwd,
                email: req.body.email
            });
            console.log(u);
            u.save(function(err) {
                if (err) return console.log(err);
                // saved!
                console.log('user saved');
                res.status(201).json({
                    status: 'success',
                    data: {
                        newUser: u,
                        messsage: 'new user created'
                    }
                });
            });
        }
    });

    // fs.writeFile(`dev-data/usersdata.json`, JSON.stringify(userdataobj), (err) => {
    //     if (err) throw err;
    //     console.log('done');
    // });
});

module.exports = router;