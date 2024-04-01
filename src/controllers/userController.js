import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
export const addUsers = async (req, res, next) => {
    try {
        await User.create({
            name: 'Nihar'
        }).then(res => { "then chali" }).catch(err => { "Err" })
        res.status(201).json({ msg: "User is Created by vinod" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error" })
    }
}
export const userRegistraion = asyncHandler(async (req, res) => {
    const { name, email, password, contact, age, gender, image } = req.body;
    console.log(req.body);
    if (
        [name, email, password, contact, age, gender].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const createdUser = await User.create(req.body)

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
})