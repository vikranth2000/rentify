const express = require('express');
const {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    likeProperty,
    expressInterest,
} = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createProperty)
    .get(getProperties);

router.route('/:id')
    .get(getPropertyById)
    .put(protect, updateProperty)
    .delete(protect, deleteProperty);

router.route('/:id/like').post(protect, likeProperty);
router.route('/:id/interest').post(protect, expressInterest);

module.exports = router;