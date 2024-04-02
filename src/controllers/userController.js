import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import Animal from '../models/animal.model.js'
import AnimalRescueRequest from '../models/AnimalRescueRequest.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    // const { name, email, password, contact, age, gender, image } = req.body;
    console.log(req.body);
    if (
        [name, email, password, contact, age, gender].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    let password = request.body.password;
    let saltKey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, saltKey);
    req.body.password = password;
    const createdUser = await User.create(req.body)

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
})
export const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const existedUser = User.find({ _id: id })
    if (!existedUser)
        throw new ApiError(404, "User Not Found")
    const user = await User.deleteOne({ _id: id })
    console.log(user);
    if (user.deletedCount) {
        return res.status(200).json(
            new ApiResponse(200, user, "User Has been Deleted Secessfully")
        )
    }




})

export const GetAnimalForAdoption = asyncHandler(async (req, res) => {
    const animals = await Animal.find({ State: "Ready for Adoption" })
    if (!animals)
        throw new ApiError(500, "Internal Server Error")
    return res.status(200).json(
        new ApiResponse(200, animals)
    )
})
export const requestForrescue = asyncHandler(async (req, res) => {

    const request = await AnimalRescueRequest.create(req.body)
    if (!request)
        throw new ApiError(500, "Internal Server Error")

    return res.status(201).json(
        new ApiResponse(201, request, 'Request Has Been Submited Successfully')
    )

})