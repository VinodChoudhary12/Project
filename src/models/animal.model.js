const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String
    },
    age: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Animal', animalSchema);
