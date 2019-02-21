const path = require('path');
const fs = require('fs');

require('dotenv').config();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const express = require('express');

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'client')));

server.post('/fileupload', (req, res) => {
    console.log(req.body);
    let form = new formidable.IncomingForm();
    let filepath = new Promise((res, rej) => {
        form.parse(req, (err, fields, files) => {
            res(files.fileupload.path);
        });
    });
    
    filepath.then(path => {
        let customer;
        let filename = req.body.filename;
        let isSame = req.body.isSame;
        let subject = (isSame) ? req.body.filename : req.body.subject;

        switch (req.body.customer) {
            case 'haskel':
                customer = process.env.HASKEL;
            default:
                customer = process.env.USER;
        }
        nodeoutlook.sendEmail({
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            from: process.env.USER,
            to: process.env.USER,
            subject: subject,
            text: 'Documents attached.',
            attachments: [
                {
                    filename: filename,
                    path: path
                }
            ]
        });
    });
    res.redirect('index.html');
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});