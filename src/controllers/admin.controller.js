import { RescueTeam } from "../models/rescueTeam.model.js";
import { Employee } from "../models/employee.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


export const addTeam = asyncHandler(async (req, res) => {
    let { teamId, teamName, teamMemberId, teamLeadId } = req.body;
    let rescueTeam = await RescueTeam.findOne({ teamId });
    if (rescueTeam) {
        let status = rescueTeam.teamMembers.some((teamMembers) => teamMembers._id == teamMemberId);
        let status1 = rescueTeam.teamLead.some((teamLead) => { teamLead._id == teamLeadId });
        if (status)
            return res.status(201).json(new ApiResponse(200, "Team Member Already Exists"));
        else if (status1)
            return res.status(201).json(new ApiResponse(200, "Team Lead Already Exists"));
        rescueTeam.teamMembers.push({ teamMemberId });
        rescueTeam.teamLead.push({ teamLeadId });
        await rescueTeam.save();
        return res.status(201).json(new ApiResponse(200, "RescueTeam Added Successfully"));
    }
    else {
        rescueTeam = await RescueTeam.create({ teamId, teamName, teamMembers: [{ teamMemberId }], teamLead: [{ teamLeadId }] });
        return res.status(201).json(new ApiResponse(200, "RescueTeam Added Successfully"));
    }
});
export const updateById = async (req, res, next) => {
    let { teamId, teamName, teamMemberId, teamLeadId } = req.body;
    const existedEmp = await RescueTeam.findOne({ teamId });
    if (existedEmp) {
        const del = await RescueTeam.updateOne({ teamId, teamName, teamMembers: [{ teamMemberId }], teamLead: [{ teamLeadId }] });
        console.log(del);
        return res.status(201).json(new ApiResponse(200, "Update Successfully"));
    }
    throw new ApiError(409, "Bad Request");
}
export const deleteById = async (req, res, next) => {
    const { teamId } = req.body;
    const existedEmp = await RescueTeam.findOne({ teamId });
    if (existedEmp) {
        const del = await RescueTeam.deleteOne({ teamId });
        console.log(del);
        return res.status(201).json(new ApiResponse(200, "Delete Successfully"));
    }
    throw new ApiError(409, "Bad Request");

}

export const addemploye = asyncHandler(async (req, res) => {
    const { name, email, type, contact, adharCardNo, address, designation, reg_date, status, salary, joinDate, userName, password, empImage } = req.body;
    console.log(req.body);
    if (
        [name, type, contact, password, address, designation, reg_date, joinDate, salary, status].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedEmp = await Employee.findOne({
        $or: [{ adharCardNo }, { email }, { userName }]
    })

    if (existedEmp) {

        throw new ApiError(409, "Member with email or username already exists")
    }
    await Employee.insertMany(req.body);
    return res.status(201).json(
        new ApiResponse(200, "Member registered Successfully")
    )
});

export const updateByEmail = async (req, res, next) => {
    const { email } = req.body;
    const existedEmp = await Employee.findOne({ email });
    if (existedEmp) {
        await Employee.updateOne(req.body);
        return res.status(201).json(new ApiResponse(200, "Update Successfully"));
    }
    throw new ApiError(409, "Bad Request");
};


export const updateByDesignation = async (req, res, next) => {
    const { designation } = req.body;
    const existedEmp = await Employee.findOne({ designation });
    if (existedEmp) {
        await Employee.updateOne(req.body);
        return res.status(201).json(new ApiResponse(200, "Update Successfully"));
    }
    throw new ApiError(409, "Bad Request");
};

export const deleteByEmail = async (req, res, next) => {
    const { email } = req.body;
    const existedEmp = await Employee.findOne({ email });
    if (existedEmp) {
        const del = await Employee.deleteOne({ email });
        console.log(del);
        return res.status(201).json(new ApiResponse(200, "Delete Successfully"));
    }
    throw new ApiError(409, "Bad Request");

}

export const getAllEmployee = async (req, res, next) => {
    try {
        const employees = await Employee.find({});
        return res.status(200).json(new ApiResponse(200, "succefully ", employees));
    } catch (error) {
        throw new ApiError(500, "Internal server error  ....");
    }
};