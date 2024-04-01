const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalRescueRequestSchema = new Schema({
    requestId: {
        type: Number,
        autoIncreament: true,
        unique: true
    },
    description: { // Description of the animal (optional)
        type: String
    },
    image: { // Image URL of the animal (optional)
        type: String
    },
    location: { // Location where the animal needs rescue (required)
        type: String,
        required: true
    },
    coplainerName: {
        type: String,

    },
    contact: { // Contact information of the person requesting rescue (required)
        type: String,

    },
    status: { // Status of the request (optional)
        type: String,
        enum: ['Pending', 'Assigned', 'Resolved']
    },
    description: { // Optional field for capturing any additional details 
        type: String
    },
    date: {
        type: Date
    },
    rescuedBy: {
        type: Schema.Types.ObjectId,
        ref: "RescueTeam"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('AnimalRescueRequest', animalRescueRequestSchema);
