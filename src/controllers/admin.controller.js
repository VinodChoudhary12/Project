import RescueTeam from "../models/rescueTeam.model.js";
import Employee from "../models/employee.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";


export const deleteEmployeeById = async (req, res) => {
    const id = req.body;

    try {

        await Employee.findByIdAndDelete(id);

        return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
export const getEmployeeById = async (req, res) => {
    const id = req.body;

    try {
        // Find the employee by id
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
export const editEmployeeDetails = async (req, res) => {
    const { id, updates } = req.body;

    try {
        // Find the employee by id and update
        const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ message: "Employee details updated successfully", employee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
export const changePassword = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;

    try {
        // Find the employee by id
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Check if the current password matches
        const isPasswordValid = await bcrypt.compare(currentPassword, employee.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the employee's password
        await Employee.findByIdAndUpdate(id, { password: hashedNewPassword });

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
export const signupController = async (req, res) => {
    const { email, password } = req.body;

    try {

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });


        await newAdmin.save();


        const token = jwt.sign({ id: newAdmin._id }, "Here is my Secret Key", { expiresIn: "1h" });
        res.status(201).json({ token, newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const forgetPasswordController = async (req, res) => {
    const email  = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Generate a password reset token
        const token = jwt.sign({ id: admin._id }, "your_secret_key_here", { expiresIn: "1h" });

        res.status(200).json({ resetToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, "your_secret_key_here", { expiresIn: "1h" });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


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