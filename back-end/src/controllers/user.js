const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 12;
  const paramKey = req.query.paramKey || "null";
  const paramValue = req.query.paramValue || "null";

  let totalItems;

  if (paramKey === "null" || paramValue === "null") {
    User.find()
      .countDocuments()
      .then((result) => {
        totalItems = result;

        return User.find()
          .skip((parseInt(currPage) - 1) * parseInt(perPage))
          .limit(parseInt(perPage));
      })
      .then((result) => {
        const response = {
          message: "Get All Users Success",
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
  }
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((result) => {
      if (!result) {
        const error = new Error("Event not found");
        error.errorStatus = 404;
        throw error;
      }
      const response = {
        message: "Get User Success",
        event: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByIdentifier = (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 12;
  const identifier = req.query.identifier || "null";

  console.log(`${identifier} nih`);
  
  if (identifier === "null") {
  } else {
    User.find()
      .or([{userEmail: identifier}, {userType: "A"}])
      .skip((parseInt(currPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .then((result) => {
        const response = {
          message: "Get User by Identifier Success",
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

exports.postUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Value Does Not Match");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  //   if (!req.file) {
  //     const err = new Error("Image Must Be Uploaded");
  //     err.errorStatus = 422;
  //     throw err;
  //   }

  const userEmail = req.body.userEmail;
  //   const userPassword = req.body.userPassword;
  //   const userType = req.body.eventTnc;

  const PostUser = new User({
    userEmail: userEmail,
    userPassword: userPassword,
    // userType: userType,
  });

  PostUser.save()
    .then((result) => {
      const response = {
        message: "Create User Success",
        event: result,
      };

      res.status(201).json(response);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
