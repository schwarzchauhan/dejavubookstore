const express = require('express');
const router = express.Router();
const https = require('https');


router.route('/')


.post((req, res) => {
    console.log(req.body);
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         body: req.body
    //     }
    // });
    var url = req.body.bookLink;
    console.log(url);


    https.get(url, (resp) => {
        console.log('statusCode:', resp.statusCode);
        // console.log('headers:', resp.headers);

        var jsondata = "";


        resp.on('data', (d) => {
            // process.stdout.write(d);
            jsondata += d;

        });

        resp.on("end", () => {

            try {
                // console.log(jsondata);
                const jsobj = JSON.parse(jsondata);
                // console.log(jsobj);
                const volumeInfoObj = jsobj.volumeInfo;
                console.log(volumeInfoObj);
                // res.status(200).json({
                //     status: 'success',
                //     data: {
                //         volumeInfoObj
                //     }
                // });
                // console.log(volumeInfoObj.title);
                // console.log(volumeInfoObj.description);
                // const title = volumeInfoObj.title;
                // const desc = volumeInfoObj.description;
                // const imgUrl = volumeInfoObj.imageLinks.thumbnail;

                const urlEncodedData = encodeURIComponent("title : " + title + "\ndescription : " + desc);
                // console.log(urlEncodedData);
                res.render('detail', { title: title, desc: desc, urlEncodedData: urlEncodedData, imgUrl: imgUrl });
            } catch (err) {
                console.log(err.message);
            }
        });

    }).on('error', (e) => {
        console.error(e);
    });
});

module.exports = router;