const express = require('express');
const router = express.Router();
const https = require('https');


router.route('/search')


.post((req, res) => {
    console.log(req.body);
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         body: req.body
    //     }
    // });
    var url = 'https://www.googleapis.com/books/v1/volumes';
    url += '?q=' + req.body.query;
    https.get(url, (resp) => {
        console.log('statusCode:', resp.statusCode);
        console.log('headers:', resp.headers);

        var jsondata = "";


        resp.on('data', (d) => {
            // process.stdout.write(d);
            jsondata += d;
        });

        resp.on("end", () => {
            try {
                const jsobj = JSON.parse(jsondata);
                const bookObj = jsobj.items;
                // res.status(200).json({
                //     status: 'success',
                //     data: {
                //         bookObj
                //     }
                // });
                var book = [];
                for (let i = 0; i < bookObj.length; i++) {
                    var selfLink = bookObj[i].selfLink;
                    var ele = bookObj[i].volumeInfo;
                    if (ele.title && ele.description && ele.imageLinks && ele.imageLinks.thumbnail && selfLink) {
                        book.push({
                            title: ele.title,
                            desc: ele.description,
                            imgSrc: ele.imageLinks.thumbnail,
                            selfLink: selfLink
                        });
                    }
                }
                // res.status(200).json({
                //     status: 'success',
                //     data: {
                //         book
                //     }
                // });
                res.render('catalog', { a: book });
            } catch (err) {
                console.log(err.message);
            }
        });

    }).on('error', (e) => {
        console.error(e);
    });
});

module.exports = router;