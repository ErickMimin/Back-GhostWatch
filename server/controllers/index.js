const express = require('express');

const app = express();

app.use(require('./process-image'));

module.exports = app;