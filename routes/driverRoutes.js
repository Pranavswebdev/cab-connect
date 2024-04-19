
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const auth = require('../middleware/auth');

router.post('/signup', driverController.signup);
router.post('/login', driverController.login);
router.get('/profile',  driverController.getProfile);
router.put('/profile',  driverController.updateProfile);
router.post('/nearby', driverController.getNearby);

module.exports = router;