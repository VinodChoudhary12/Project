import RescueRequest from "../models/AnimalRescueRequest.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Employee from "../models/employee.model.js";


export const MemberLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the employee exists
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Check if the post is "Rescue Member"
        if (employee.designation !== "Rescue Member") {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, employee.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee._id }, "your_secret_key_here", { expiresIn: "1h" });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the employee exists
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Generate a password reset token
        const token = jwt.sign({ id: employee._id }, "your_secret_key_here", { expiresIn: "1h" });

        // In a real-world scenario, you would send this token via email to the user's registered email address
        // For demonstration purposes, let's just return the token in the response
        res.status(200).json({ resetToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, "your_secret_key_here");

        // Find the employee by id
        const employee = await Employee.findById(decodedToken.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the employee's password
        await Employee.findByIdAndUpdate(decodedToken.id, { password: hashedPassword });

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};



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

//  /resque/Done/660b97bb87813fb50a65e46c
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


