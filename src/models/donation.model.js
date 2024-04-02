import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contact: {
        type: String
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('Donation', donationSchema);
