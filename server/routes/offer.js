const express = require('express');
const router = express.Router();

const { createOffer, getAllOffers, updateOffer, deleteOffer } = require('../controllers/offer');
const { getUserById } = require('../controllers/user');
const { isSignedin,isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);

// @desc Get All Offers
// @access Public
router.get('/offers', getAllOffers);

// @desc Create a Offer
// @access Admin
router.post('/offer/:userId', isSignedin, isAuthenticated, isAdmin, createOffer);

// @desc Update a Offer
// @access Admin
router.put('/offer/:offerId/:userId', isSignedin, isAuthenticated, isAdmin, updateOffer);

// @desc Delete a Offer
// @access Admin
router.delete('/offer/:offerId/:userId', isSignedin, isAuthenticated, isAdmin, deleteOffer);


module.exports = router;