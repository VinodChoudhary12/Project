// models/ShelterManager.js
import mongoose from 'mongoose';

const shelterManagerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const ShelterManager = mongoose.model('ShelterManager', shelterManagerSchema);

export default ShelterManager;
    