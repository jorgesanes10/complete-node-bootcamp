const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
} = require('../controllers/toursController');

const router = express.Router();

router.param('id', (req, res, next, value) => {
  next();
});

router.route('/tour-stats').get(getTourStats);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
