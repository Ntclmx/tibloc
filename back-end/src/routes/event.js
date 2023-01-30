const express = require('express');
const app = express();

const eventController = require('../controllers/event');

app.get('/event', eventController.getEvents);

app.post('/event', eventController.postEvents);

module.exports = app;