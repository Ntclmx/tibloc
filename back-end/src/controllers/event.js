const { validationResult } = require('express-validator');

exports.getEvent = (req, res, next) => {
    res.json({
        message: 'get event successfully',
    });
    next();
}

exports.postEvent = (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        const err = new Error('Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const eventId = req.body.eventId;
    const eventTitle = req.body.eventTitle;
    const eventDescription = req.body.eventDescription;
    const eventTnc = req.body.eventTnc;
    const eventAddress = req.body.eventAddress;
    const eventDate = req.body.eventDate;
    const eventLogo = req.body.eventLogo;


    const response = {
        message: 'Create event successfully',
        event: {
            "event_id" : eventId,
            "event_title" : eventTitle,
            "event_description" : eventDescription,
            "event_tnc" : eventTnc,
            "event_address" : eventAddress,
            "event_date" : eventDate,
            "event_logo" : eventLogo
        }
    };

    res.status(201).json(response);
}