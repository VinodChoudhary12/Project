
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    }, password: {
        type: String
    },
    contact: {
        type: Number,
        trim: true
    },
    profile: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,

    },
    password: {
        type: String
    },
    blockStatus: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;
