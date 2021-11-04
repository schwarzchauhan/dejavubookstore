const express = require('express');
const router = express.Router();
const fs = require('fs');


const userdataobj = JSON.parse(
    fs.readFileSync(`dev-data/usersdata.json`, "utf-8")
);


router.route('/')

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

    fs.writeFile(`dev-data/usersdata.json`, JSON.stringify(userdataobj), (err) => {
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

module.exports = router;