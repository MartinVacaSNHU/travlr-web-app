const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const authController= require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  const authHeader = req.headers['authorization'];
  // console.log('Auth Header: ' + authHeader);
  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }
  const parts = authHeader.split(' ');
  if (parts.length < 2) {
    console.log('Not enough tokens in Auth Header: ' + parts.length);
    return res.status(401).json({ message: 'Invalid Authorization header' });
  }
  const token = parts[1];
  // console.log('Token: ' + token);
  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = verified;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Validation Error!' });
  }
}

router.route('/login').post(authController.login);
router.route("/register").post(authController.register);

// Define route for our trips endpoint
router  
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);
 
// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
