const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const formidable = require('formidable');
const nodemailer = require('nodemailer');
const express = require('express');

const server = express();
const port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: { ciphers: 'SSLv3' }
});

transporter.verify((err, suc) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is ready to take our message.");
    }
});

server.use(express.static(path.join(__dirname, 'client')));

server.post('/fileupload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let filepath = files.fileupload.path;
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});