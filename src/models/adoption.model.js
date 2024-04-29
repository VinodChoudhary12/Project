import mongoose from "mongoose";

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

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;

