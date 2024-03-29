
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema); // Changed 'vandor' to 'Vendor'

export default User;
