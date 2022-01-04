const express = require('express');
const app = express();

require('./config/db');

app.get('/', (req, res) => {
	res.send('Kirana-store-api working!');
});

module.exports = app;
