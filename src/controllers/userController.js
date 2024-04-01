import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"

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
        [name, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )



})