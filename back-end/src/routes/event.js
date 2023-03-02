const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const eventController = require('../controllers/event');


router.post('/event', [
        body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
        body('eventTnc').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
    ],
    eventController.postEvent);

router.get('/events', eventController.getAllEvents);

router.get('/event/:eventId', eventController.getEvent);

router.put('/event/:eventId', [
    body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
    body('eventTnc').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
],eventController.updateEvent);

router.delete('/event/:eventId', eventController.deleteEvent);

module.exports = router;
