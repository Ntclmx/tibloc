const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const eventController = require('../controllers/event');
const categoryController = require('../controllers/category');
const wishlistController = require('../controllers/wishlist');
const nftController = require('../controllers/nft');
const adminController = require('../controllers/admin');
const organizerController = require('../controllers/organizer');


// event
router.post('/event', [
        body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
],eventController.postEvent);

router.get('/events',  eventController.getAllEvents);

router.get('/event/:eventId', eventController.getEvent);

router.put('/event/:eventId', [
    body('eventTitle').isLength({min:5}).withMessage('Event Title tidak sesuai'),
],eventController.updateEvent);

router.delete('/event/:eventId', eventController.deleteEvent);

// category
router.post('/categories', categoryController.postCategory);

router.get('/categories', categoryController.getAllCategories);

router.get('/category/:categoryId', categoryController.getCategory);

router.get('/category/:categoryId/qr', categoryController.getQRCode);

router.get('/event/:eventId/categories', categoryController.getCategoryFromEvent);

router.put('/event/:eventId/categories', categoryController.updateCategory);

router.get('/qr', categoryController.generateQrTemp);

router.put('/category/:categoryId/stock', categoryController.updateStock);

// wishlist
router.post('/wishlist', wishlistController.postWishlist);

router.get('/wishlists', wishlistController.getAllWishlists);

router.get('/wishlist/:wishlistId', wishlistController.getWishlist);

router.delete('/wishlist/:wishlistId', wishlistController.deleteWishlist);

router.get('/wishlists/event/:eventId', wishlistController.getWishlistFromEvent );

router.get('/wishlists/user/:userId', wishlistController.getWishlistFromUser );

router.get('/wishlists/event/:eventId/user/:userId', wishlistController.getWishlistFromEventUser);

// organizer
router.get('/organizers', organizerController.getAllOrganizers);

router.get('/organizer/:organizerId', organizerController.getOrganizer);

router.post('/organizer', organizerController.postOrganizer);

// nft
router.get('/nfts', nftController.getAllNfts);

router.get('/nft/:nftId', nftController.getNft);

router.post('/nfts', nftController.postNft);

router.get('/nfts/category/:categoryId', nftController.getNftFromEvent);

router.get('/category/:categoryId/nft', nftController.randomNFT);

// admin
router.post('/admin', adminController.postAdmin);

router.get('/admins', adminController.getAllAdmins);

router.get('/admin/:adminId', adminController.getAdmin);

router.get('/admin/address/:publicAddress', adminController.getAdminFromAddress);

module.exports = router;
