const express = require('express');

const apiRouter = require('./api');
const htmlRouter = require('./html');


const app = express();

app.use('/api', apiRouter);
app.use('/html', htmlRouter);

module.exports = app;