const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.validateTour = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Name and price are required',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id.toString() === id);

  res.status(tour ? 200 : 404).json({
    status: 'success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id;
  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { newTour } });
    },
  );
};

exports.updateTour = (req, res) => {
  const { id } = req.params;
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;
};
