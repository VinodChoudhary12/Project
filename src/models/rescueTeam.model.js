import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamId: {
        type: Number,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamMembers: [{  // Array of references to Employee schema
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    teamLead: {  // Reference to an Employee schema for the team lead
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
});

module.exports = mongoose.model('RescueTeam', teamSchema);
