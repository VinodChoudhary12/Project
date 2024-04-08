

import mongoose from "mongoose";

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
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    Before_Treatment_image: {
        type: String
    },
    After_Treatment_image: {
        type: String
    },
    state: {
        type: String,
        enum: ["Patient", "Ready for Adoption", "Released, Stay In Shelter"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Animal = mongoose.model('Animal', animalSchema);
export default Animal;