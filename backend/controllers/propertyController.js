const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');
const User = require('../models/User');

const createProperty = asyncHandler(async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearbyFacilities } = req.body;

    const property = new Property({
        seller: req.user._id,
        place,
        area,
        bedrooms,
        bathrooms,
        nearbyFacilities,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
});

const getProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find({});
    res.json(properties);
});

const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        res.json(property);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

const updateProperty = asyncHandler(async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearbyFacilities } = req.body;
    const property = await Property.findById(req.params.id);

    if (property) {
        if (property.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this property');
        }

        property.place = place;
        property.area = area;
        property.bedrooms = bedrooms;
        property.bathrooms = bathrooms;
        property.nearbyFacilities = nearbyFacilities;

        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        if (property.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this property');
        }

        await property.remove();
        res.json({ message: 'Property removed' });
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

const likeProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        property.likes += 1;
        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

const expressInterest = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    const seller = await User.findById(property.seller);

    if (property && seller) {
        // Send email to the seller about the interested buyer
        // (Assuming you have a function sendEmail to handle sending emails)
        sendEmail({
            to: seller.email,
            subject: 'Interest in your property',
            text: `A buyer is interested in your property at ${property.place}. Contact details: ${req.user.email}, ${req.user.phoneNumber}`,
        });

        // Send email to the buyer with seller's contact details
        sendEmail({
            to: req.user.email,
            subject: 'Property interest confirmation',
            text: `You expressed interest in a property at ${property.place}. Contact details of the seller: ${seller.email}, ${seller.phoneNumber}`,
        });

        res.json({ message: 'Interest expressed and emails sent' });
    } else {
        res.status(404);
        throw new Error('Property or seller not found');
    }
});

module.exports = {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    likeProperty,
    expressInterest,
};