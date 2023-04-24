const Organizer = require('../models/organizer.js');

exports.getAllOrganizers = (req, res, next) => {
    Organizer.find()
        .then(result => {
            const response = {
                message: 'Get All Organizers Success',
                organizer: result,
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        });

}

exports.getOrganizer = (req, res, next) => {
    const organizerId = req.params.organizerId;
    Organizer.findById(organizerId)
        .then(result => {
            if (!result) {

                const response = {
                    message: 'Organizer Not Found',
                };

                res.status(404).json(response);
            }
            const response = {
                message: 'Get Organizer Success',
                organizer: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}


exports.postOrganizer = (req, res, next) => {

    if (!req.files) {
        const err = new Error('Image Must Be Uploaded');
        err.errorStatus = 422;
        throw err;
    }

    const organizerName = req.body.organizerName;
    const organizerEmail = req.body.organizerEmail;
    const organizerPhoneNumber = req.body.organizerPhoneNumber;
    const organizerLogo = req.files[0].path;

    console.log(organizerName);
    const PostOrganizer = new Organizer({
        organizerName : organizerName,
        organizerEmail : organizerEmail,
        organizerPhoneNumber : organizerPhoneNumber,
        organizerLogo : organizerLogo
    });
    
    PostOrganizer.save()
        .then(result => {
            const response = {
                message: 'Create Organizer Success',
                organizer: result
            };

            res.status(201).json(response);
        })
        .catch(err => {
            console.log('err: ', err);
        })

}
