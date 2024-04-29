import RescueRequest from "../models/AnimalRescueRequest.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"

//http://localhost:8000/resque/Resque/660b268c4df9ee6eb56813aa with userId
//http://localhost:8000/resque/Resque without userId
export const genRequest = asyncHandler(async (req, res) => {
    let userId = req.params.userId;
    if (userId) {
        console.log(userId);
        const { description, Location } = req.body;
        let result = await RescueRequest.create({ user: userId, description, Location });

        return res.status(201).json(new ApiResponse(200, result, "Request genrate Successfully"));
    }
    else {
        const { coplainerName, contact, description, Location } = req.body;
        let result = await RescueRequest.create({ coplainerName, contact, description, Location });
        return res.status(201).json(new ApiResponse(200, result, "Request genrate Successfully"));
    }


});
//http://localhost:8000/resque/Checkall all Requst show
export const checkallRequest = asyncHandler(async (req, res) => {

    let result = await RescueRequest.find();
    if (result)
        return res.status(201).json(new ApiResponse(200, result, "Show All records"));
    throw new ApiError(500, "Internal Server Error ")
})
//http://localhost:8000/resque/accept/:userId/:resId  
export const acceptrequest = asyncHandler(async (req, res) => {
    let userId = req.params.userId;
    let resId = req.params.resId;


    const logedUser = await RescueRequest.findOne({ user: userId }).populate({
        path: 'user',
        select: 'name contact'
    });
    const updatedData = await RescueRequest.updateOne(
        { user: userId },
        {
            $set: {
                status: "assigned",
                coplainerName: logedUser.user.name,
                contact: logedUser.user.contact,
                rescuedBy: resId

            }
        }
    );

    return res.status(201).json(new ApiResponse(200, updatedData, "Accept Request "));
    throw new ApiError(500, "internal Server Error");
});

//http://localhost:8000/resque/Done/660b97bb87813fb50a65e46c
export const workDone = asyncHandler(async (req, res) => {
    let resId = req.params.resId;
    console.log(resId);
    const { descriptionByRescueTeam } = req.body;
    console.log(descriptionByRescueTeam);
    const updatedData = await RescueRequest.updateOne(
        { rescuedBy: resId },
        {
            $set: {
                status: "resolved",
                descriptionByRescueTeam: descriptionByRescueTeam
            }
        }
    );

    return res.status(201).json(new ApiResponse(200, updatedData, "Accept Request "));
    //throw new ApiError(500, "internal Server Error");
})


