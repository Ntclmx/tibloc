const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const Event = require('../models/event');

exports.getAllEvents = async (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 12;
  const paramKey = req.query.paramKey || "null";
  const paramValue = req.query.paramValue || "null";

  let totalItems;

  if(paramKey === "null" || paramValue === "null"){
    Event.find()
    .countDocuments()
    .then((result) => {
      totalItems = result;

      return Event.find()
        .skip((parseInt(currPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      const response = {
        message: "Get All Events Success",
        events: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currPage),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });

  } else {
    Event.find()
    .where(paramKey, paramValue)
    .skip((parseInt(currPage) - 1) * parseInt(perPage))
    .limit(parseInt(perPage))
    .then((result) => {
      const response = {
        message: "Get Events by Parameter Success",
        events: result,
        per_page: parseInt(perPage),
        current_page: parseInt(currPage),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
  }  
};

exports.getEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId)
    .then((result) => {
      if (!result) {
        const error = new Error("Event not found");
        error.errorStatus = 404;
        throw error;
      }
      const response = {
        message: "Get Event Success",
        event: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateEvent = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        const err = new Error('Value Does Not Match');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }
    
    let eventLogo = null;
    if(req.files) {
        eventLogo = req.file.path;
    }
    
    const eventTitle = req.body.eventTitle;
    const eventDescription = req.body.eventDescription;
    const eventTnc = req.body.eventTnc;
    const eventAddress = req.body.eventAddress;
    const eventDate = req.body.eventDate;
    const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((result) => {
      if (!result) {
        const error = new Error("Event not found");
        error.errorStatus = 404;
        throw error;
      }

        result.eventTitle = eventTitle;
        result.eventDescription = eventDescription;
        result.eventTnc = eventTnc;
        result.eventAddress = eventAddress;
        result.eventDate = eventDate;
        if (eventLogo)
        {
            result.eventLogo = eventLogo;
        }
        result.eventOrganizer = eventOrganizer;
        result.eventTime = eventTime;
        result.eventCategory = eventCategory;

      return result.save();
    })
    .then((result) => {
      const response = {
        message: "Update Event Success",
        event: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postEvent = (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        const err = new Error('Value Does Not Match');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }
    
    if(!req.file) {
        const err = new Error('Image Must Be Uploaded');
        err.errorStatus = 422;
        throw err;
    }

    const eventTitle = req.body.eventTitle;
    const eventDescription = req.body.eventDescription;
    const eventTnc = req.body.eventTnc;
    const eventAddress = req.body.eventAddress;
    const eventDate = req.body.eventDate;
    const eventLogo = req.files.eventLogo[0].path;
    const eventOrganizer = req.body.eventOrganizer;
    const eventTime = req.body.eventTime;
    const eventCategory = req.body.eventCategory;


    const PostEvent = new Event({
        eventTitle : eventTitle,
        eventDescription: eventDescription,
        eventTnc: eventTnc,
        eventAddress: eventAddress,
        eventDate: eventDate,
        eventLogo: eventLogo,
        eventOrganizer: eventOrganizer,
        eventTime: eventTime,
        eventCategory: eventCategory
    });

  PostEvent.save()
    .then((result) => {
      const response = {
        message: "Create Event Success",
        event: result,
      };

      res.status(201).json(response);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId)
    .then((result) => {
      if (!result) {
        const error = new Error("Event not found");
        error.errorStatus = 404;
        throw error;
      }

      removeImage(result.eventLogo);
      return Event.findByIdAndRemove(eventId);
    })
    .then((result) => {
      const response = {
        message: "Delete Event Success",
        event: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};


