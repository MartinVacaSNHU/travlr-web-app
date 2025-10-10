// app_api/controllers/trips.js
const mongoose = require('mongoose');
require('../models/travlr');                 // registers the model
const Trip = mongoose.model('trips');        // name must match your schema registration

exports.tripsList = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (e) { next(e); }
};

exports.tripsFindByCode = async (req, res, next) => {
  try {
    const { tripCode } = req.params;         // MUST match :tripCode
    const trip = await Trip.findOne({ code: tripCode }).exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found', code: tripCode });
    res.status(200).json(trip);
  } catch (e) { next(e); }
};
