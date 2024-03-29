
const express=require('express');
const tourController=require('./../controllers/tourController');
const router=express.Router();
const authController=require('./../controllers/authController');
const reviewRouter =require('./../routes/reviewRouters');

// router.param('id',tourController.checkId);

router.use('/:tourId/reviews',reviewRouter);


router.route('/tour-stats')
.get(tourController.getTourStats);

router.route('/monthly-plan/:year')
.get(authController.protect,authController.restrictTo('admin','lead-guide','guide'),tourController.getMonthlyPlan);

router
.route('/top-5-tours')
.get(tourController.aliasTopTour,
tourController.getAllTours);

router
.route('/tours-within/:distance/center/:latlng/unit/:unit')
.get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi 

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);   

router
.route('/')
.get(tourController.getAllTours)
.post(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.createTour);

router
.route('/:id')
.get(authController.protect,tourController.getTour)
.patch(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.uploadTourImages,tourController.resizeTourImages,tourController.updateTour)
.delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);


module.exports=router;