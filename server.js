const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const express = require('express');

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'client')));

server.listen(port, () => console.log(`Server listening on port ${port}`));