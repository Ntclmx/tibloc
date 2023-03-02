const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const eventController = require('../controllers/login');

router.get('/pages/auth', eventController.authenticate);