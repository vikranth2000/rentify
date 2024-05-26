const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearbyFacilities: { type: [String], required: true },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);