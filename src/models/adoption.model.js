const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adoptionSchema = new Schema({
    adopterName: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contactInfo: {
        type: String,
        required: true
    },
    animalId: {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
    },
    adoptionDate: {
        type: Date
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied']
    }
});

module.exports = mongoose.model('Adoption', adoptionSchema);
