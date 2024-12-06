const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  validateTour,
} = require('../controllers/tours');

const router = express.Router();

router.param('id', (req, res, next, value) => {
  console.log(`Tour id is ${value}`);
  next();
});

router.route('/').get(getAllTours).post(validateTour, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
