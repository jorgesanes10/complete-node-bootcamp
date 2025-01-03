const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/toursController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewsRoute');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.param('id', (req, res, next, value) => {
  console.log(`Tour id is ${value}`);
  next();
});

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
