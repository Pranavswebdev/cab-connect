
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const auth = require('../middleware/auth');

router.post('/signup', driverController.signup);
router.post('/login', driverController.login);
router.get('/profile', auth, driverController.getProfile);
router.put('/profile', auth, driverController.updateProfile);
router.get('/nearby', auth, driverController.getNearby);

module.exports = router;