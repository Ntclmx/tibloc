const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const eventController = require('../controllers/event');
const categoryController = require('../controllers/category');
const wishlistController = require('../controllers/wishlist');

// event
router.post('/event', [
        body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
        body('eventTnc').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
],eventController.postEvent);

router.get('/events', eventController.getAllEvents);

router.get('/event/:eventId', eventController.getEvent);

router.put('/event/:eventId', [
    body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
    body('eventTnc').isLength({min:5}).withMessage('Event TNC tidak sesuai'),
],eventController.updateEvent);

router.delete('/event/:eventId', eventController.deleteEvent);

// category
router.post('/categories', categoryController.postCategory);

router.get('/categories', categoryController.getAllCategories);

router.get('/category/:categoryId', categoryController.getCategory);

router.get('/event/:eventId/categories', categoryController.getCategoryFromEvent);

router.put('/event/:eventId/categories', categoryController.updateCategory);

// wishlist
router.post('/wishlist', wishlistController.postWishlist);

router.get('/wishlists', wishlistController.getAllWishlists);

router.get('/wishlist/:wishlistId', wishlistController.getWishlist);

router.delete('/wishlist/:wishlistId', wishlistController.deleteWishlist);

router.get('/wishlists/event/:eventId', wishlistController.getWishlistFromEvent );

router.get('/wishlists/user/:userId', wishlistController.getWishlistFromUser );

router.get('/wishlists/event/:eventId/user/:userId', wishlistController.getWishlistFromEventUser);

module.exports = router;