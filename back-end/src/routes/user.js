const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const userController = require('../controllers/user');

router.post('/create-user', [
    body('userEmail').isLength({min:5}).withMessage('Event Title tidak sesuai'),
    body('userPassword').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
    body('userType').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
],
userController.postUser);

router.get('/users', userController.getAllUsers);
router.get('/getByIdentifier', userController.getUserByIdentifier);

module.exports = router;
