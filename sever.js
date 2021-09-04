'use strict';

const express = require('express');
const path = require('path');
const app = express();

const servePath = path.join(__dirname, './build');

app.use(express.static(servePath));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const SERVER_PORT = process.env.PORT || 4000;
app.listen(SERVER_PORT);

console.log(`Sever run on port ${SERVER_PORT}`);