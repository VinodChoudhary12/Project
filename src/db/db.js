import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const Connection = await mongoose.connect(`mongodb+srv://vinodvc9811:vinod123@cluster0.awn3fwo.mongodb.net/App`)
        console.log(`\n MongoDB Connected !! DB Host : ${Connection.connection.host}`);


    } catch (error) {
        console.log("MONGODB Connection error", error);
        process.exit(1)
    }
}

export default connectDB
//askdjfnkasjdnfa
//kiuhikuoikjoli
// nihar
// niahrkajbndfabsudfka
// niharsadffkajsd