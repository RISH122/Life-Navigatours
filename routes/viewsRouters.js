const express = require('express');
const authController=require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();


router.get('/',authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug',authController.protect, viewsController.getTour);
router.get('/signup',viewsController.getSignup);
router.get('/login',authController.isLoggedIn,viewsController.getLogin);
router.get('/me',authController.protect,viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post('/submit-user-data',authController.protect,viewsController.updateUserData);

module.exports = router;