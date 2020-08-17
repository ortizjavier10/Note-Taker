const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoute');

const htmlRoutes = require('./routes/htmlRoute');

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use(express.json());

app.use('/api', apiRoutes);

app.use('/', htmlRoutes);