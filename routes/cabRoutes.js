
const express = require('express');
const router = express.Router();
const cabController = require('../controllers/cabController');
const auth = require('../middleware/auth');

router.post('/', auth, cabController.createCab);
router.get('/', auth, cabController.getCabs);
router.get('/:id', auth, cabController.getCabById);
router.put('/:id', auth, cabController.updateCab);
router.delete('/:id', auth, cabController.deleteCab);

module.exports = router;