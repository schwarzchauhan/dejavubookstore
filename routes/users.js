const express = require('express');
const router = express.Router();
const fs = require('fs');

const userdataobj = JSON.parse(
    fs.readFileSync(`dev-data/usersdata.json`, "utf-8")
);

router.route('/:id?')

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

module.exports = router;