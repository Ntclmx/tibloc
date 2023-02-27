const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/category');
const Category = require('../models/category');

// exports.getAllEvents = (req, res, next) => {
//     const currPage = req.params.page || 1;
//     const perPage = req.params.perPage || 12;

//     let totalItems;

//     Event.find()
//     .countDocuments()
//     .then( result => {
//         totalItems = result;

//         return Event.find()
//         .skip((parseInt(currPage) - 1) * parseInt(perPage))
//         .limit(parseInt(perPage));
//     })
//     .then( result => {
//         const response = {
//             message: 'Get All Events Success',
//             events: result,
//             total_data: totalItems,
//             per_page: parseInt(perPage),
//             current_page: parseInt(currPage)
//         };
    
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         next(err);
//     });

// }

// exports.getEvent = (req, res, next) => {
//     const eventId = req.params.eventId;
//     Event.findById(eventId)
//     .then( result => {
//         if (!result) {
//             const error = new Error('Event not found');
//             error.errorStatus = 404;
//             throw error;
//         }
//         const response = {
//             message: 'Get Event Success',
//             event: result
//         };
    
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         next(err);
//     })
// }

// exports.updateEvent = (req, res, next) => {
//     const errors = validationResult(req);
    
//     if(!errors.isEmpty()) {
//         const err = new Error('Value Does Not Match');
//         err.errorStatus = 400;
//         err.data = errors.array();
//         throw err;
//     }
    
//     if(!req.file) {
//         const err = new Error('Image Must Be Uploaded');
//         err.errorStatus = 422;
//         throw err;
//     }
    
//     const eventTitle = req.body.eventTitle;
//     const eventDescription = req.body.eventDescription;
//     const eventTnc = req.body.eventTnc;
//     const eventAddress = req.body.eventAddress;
//     const eventDate = req.body.eventDate;
//     const eventLogo = req.file.path;
//     const eventId = req.params.eventId;
//     const eventOrganizer = req.params.eventOrganizer;
//     const eventTime = req.params.eventTime;
//     const eventCategory = req.params.eventCategory;

//     Event.findById(eventId)
//     .then( result => {
//         if (!result) {
//             const error = new Error('Event not found');
//             error.errorStatus = 404;
//             throw error;
//         }

//         result.eventTitle = eventTitle;
//         result.eventDescription = eventDescription;
//         result.eventTnc = eventTnc;
//         result.eventAddress = eventAddress;
//         result.eventDate = eventDate;
//         result.eventLogo = eventLogo;
//         result.eventOrganizer = eventOrganizer;
//         result.eventTime = eventTime;
//         result.eventCategory = eventCategory;

//         return result.save();
//     })
//     .then(result => {
        
//         const response = {
//             message: 'Update Event Success',
//             event: result
//         };
    
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         next(err);
//     })

// }

exports.postCategory = (req, res, next) => {

    // console.log(req.body);
    let arrResult = [];
    tickets = req.body.tickets;
    tickets.forEach(ticket => {
        const eventId = req.body.eventId;
        const categoryName = ticket.categoryName;
        const categoryDescription = ticket.categoryDescription;
        const categoryPrice = ticket.categoryPrice;
        const categoryStock = ticket.categoryStock;
    
    
        const PostCategory = new Category({
            eventId : eventId,
            categoryName: categoryName,
            categoryDescription: categoryDescription,
            categoryPrice: categoryPrice,
            categoryStock: categoryStock,
        });

        PostCategory.save()
        .then(result => {
            response = {
                category: result
            };
            
            console.log(response);
        })
        .catch( err => {
            console.log('err: ', err);
        })
        
    });
    const finalResponse = {
        message: 'Create Categories Success',
    };

    res.status(201).json(finalResponse);

}

// exports.deleteEvent = (req, res, next) => {
//     const eventId = req.params.eventId;
//     Event.findById(eventId)
//     .then( result => {
//         if (!result) {
//             const error = new Error('Event not found');
//             error.errorStatus = 404;
//             throw error;
//         }

//         removeImage(result.eventLogo);
//         return Event.findByIdAndRemove(eventId);
//     })
//     .then(result => {
//         const response = {
//             message: 'Delete Event Success',
//             event: result
//         };
    
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         next(err);
//     })
// }

// const removeImage = (filePath) => {
//     filePath = path.join(__dirname, '../..', filePath);
//     fs.unlink(filePath, err => console.log(err));
// }