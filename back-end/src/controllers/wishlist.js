const { validationResult } = require('express-validator');
const path = require('path');
const Wishlist = require('../models/Wishlist');

exports.postWishlist = (req, res, next) => {

    const userId = req.body.userId;
    const eventId = req.body.eventId;

    const PostWishlist = new Wishlist({
        userId : userId,
        eventId: eventId
    });

    PostWishlist.save()
    .then(result => {
        const response = {
            message: 'Add Wishlist Success',
            wishlist: result
        };
    
        res.status(201).json(response);
    })
    .catch( err => {
        console.log('err: ', err);
    })

}

exports.getAllWishlists = (req, res, next) => {
    const currPage = req.params.page || 1;
    const perPage = req.params.perPage || 12;

    let totalItems;

    Wishlist.find()
    .countDocuments()
    .then( result => {
        totalItems = result;

        return Wishlist.find()
        .skip((parseInt(currPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then( result => {
        const response = {
            message: 'Get All Wishlist Success',
            wishlists: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currPage)
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    });

}

exports.getWishlist = (req, res, next) => {
    const wishlistId = req.params.wishlistId;
    Wishlist.findById(wishlistId)
    .then( result => {
        if (!result) {
            const error = new Error('Wishlist not found');
            error.errorStatus = 404;
            throw error;
        }
        const response = {
            message: 'Get Event Success',
            event: result
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteWishlist = (req, res, next) => {
    const wishlistId = req.params.wishlistId;
    Wishlist.findById(wishlistId)
    .then( result => {
        if (!result) {
            const error = new Error('Wishlist not found');
            error.errorStatus = 404;
            throw error;
        }

        return Wishlist.findByIdAndRemove(wishlistId);
    })
    .then(result => {
        const response = {
            message: 'Delete Wishlist Success',
            event: result
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    })
}

exports.getWishlistFromUser = (req, res, next) => {
    const userId = req.params.userId;

    Wishlist.find({userId : userId})
    .then( result => {
        if (!result) {
            const error = new Error('Wishlists not found');
            error.errorStatus = 404;
            throw error;
        }
        const response = {
            message: 'Get Wishlists Success',
            wishlists: result
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    })
}

exports.getWishlistFromEvent = (req, res, next) => {
    const eventId = req.params.eventId;

    Wishlist.find({eventId : eventId})
    .then( result => {
        if (!result) {
            const error = new Error('Wishlists not found');
            error.errorStatus = 404;
            throw error;
        }
        const response = {
            message: 'Get Wishlists Success',
            wishlists: result
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    })
}

exports.getWishlistFromEventUser = (req, res, next) => {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    console.log(eventId, userId);

    Wishlist.find({$and: [{eventId : eventId}, {userId : userId}]})
    .then( result => {
        if (result.length <= 0) {
            const error = new Error('Wishlists not found');
            error.errorStatus = 404;
            throw error;
        }

        console.log(result);
        const response = {
            message: 'Get Wishlists Success',
            wishlists: result
        };
    
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    })
}