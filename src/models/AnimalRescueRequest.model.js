import mongoose from "mongoose";

const Schema = mongoose.Schema;

const animalRescueRequestSchema = new Schema({
    // requestId: {
    //     type: Number,
    //     autoIncreament: true,
    //     unique: true
    // },
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
    // status: { // Status of the request (optional)
    //     type: String,
    //     default: "pending",
    //     enum: ['Pending', 'Assigned', 'Resolved']

    // }, 
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'assigned', 'resolved'] // Lowercase values without spaces
    },

    date: {
        type: Date,
        default: Date.now
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

const AnimalRescueRequest = mongoose.model('AnimalRescueRequest', animalRescueRequestSchema);
export default AnimalRescueRequest;
