import mongoose from "mongoose";

const Schema = mongoose.Schema;

const animalRescueRequestSchema = new Schema({

    descriptionByUser: {
        type: String
    },
    descriptionByRescueTeam: {
        type: String
    },
    avtar: {
        type: String,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    coplainerName: {
        type: String,

    },
    contact: {
        type: String,

    },
    animalType: {
        type: String,
        required: true
    },

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
