import animalModel from "../models/animal.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ShelterManager from '../models/ShelterManager.model.js'
import AnimalRescueRequest from '../models/AnimalRescueRequest.model.js'
export const getAnimalRescueRequestsByRescueTeam = async (req, res) => {
    const { rescueTeamId } = req.body;

    try {
        const requests = await AnimalRescueRequest.find({ rescuedBy: rescueTeamId });
        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getAllAnimalRescueRequests = async (req, res) => {
    try {
        const requests = await AnimalRescueRequest.find();
        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getAnimalRescueRequestsByStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const requests = await AnimalRescueRequest.find({ status });
        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists
        const existingManager = await ShelterManager.findOne({ email });

        if (existingManager) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new shelter manager
        const newManager = await ShelterManager.create({ email, password: hashedPassword });

        return res.status(201).json({ message: 'Shelter Manager created successfully', manager: newManager });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const manager = await ShelterManager.findOne({ email });

        if (!manager) {
            return res.status(404).json({ message: 'Shelter Manager not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, manager.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: manager._id }, 'your_secret_key_here', { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists
        const manager = await ShelterManager.findOne({ email });

        if (!manager) {
            return res.status(404).json({ message: 'Shelter Manager not found' });
        }

        // Generate a password reset token
        const token = jwt.sign({ id: manager._id }, 'your_secret_key_here', { expiresIn: '1h' });

        // In a real-world scenario, you would send this token via email to the user's registered email address
        // For demonstration purposes, let's just return the token in the response
        return res.status(200).json({ resetToken: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, 'your_secret_key_here');

        // Find the manager by id
        const manager = await ShelterManager.findById(decodedToken.id);

        if (!manager) {
            return res.status(404).json({ message: 'Shelter Manager not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the manager's password
        await ShelterManager.findByIdAndUpdate(decodedToken.id, { password: hashedPassword });

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};
export const getAnimalByid = async (req, res) => {
    const { id } = req.params;

    try {

        const animal = await animalModel.findById(id);

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        return res.status(200).json(animal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getAnimalByName = async (req, res) => {
    const { name } = req.body;

    try {
        const animals = await animalModel.find({ name });

        return res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getAnimalByBreed = async (req, res) => {
    const { breed } = req.body;

    try {
        const animals = await animalModel.find({ breed });

        return res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getAnimalByType = async (req, res) => {
    const { type } = req.body;

    try {
        const animals = await animalModel.find({ species: type });

        return res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const addAnimal = asyncHandler(async (req, res) => {
    console.log(req.body);
    const animal = await animalModel.create(req.body)

    if (!animal)
        throw new ApiError(500, "internal server error ")
    res.status(201).json(new ApiResponse(201, animal, "Animal registered Successfully"))

})
export const getAllAnimal = asyncHandler(async (req, res) => {
    const animals = await animalModel.find()
    if (animals)
        res.status(201).json(new ApiResponse(200, animals, "Animals fetch Successfully"))
    throw new ApiError(500, "internal server error")
})
export const getRescuedAnimal = asyncHandler(async (req, res) => {
    const animals = await animalModel.find({ State: "Patient" })
    if (!animals)
        throw new ApiError(500, "Internal Server Error")
    return res.status(200).json(
        new ApiResponse(200, animals)
    )

})
export const InsertAminal = asyncHandler(async (req, res, next) => {    
    try {
        const { name, species, age, description, state } = req.body;

        if (![name, species, age, description].every(field => field && field.trim() !== "")) {
            throw new ApiError(400, "Required fields are missing.");
        }

        const newAnimal = new Animal({
            name,
            species,
            age,
            description,
            state
        });

        await newAnimal.save();

        return res.status(201).json(new ApiResponse(200, "Animal Inserted Successfully"));
    } catch (error) {
        next(error);
    }
});
export const editAnimal = async (req, res) => {
    const { id } = req.params;
    const updatedAnimalData = req.body;

    try {
        const existingAnimal = await animalModel.findById(id);

        if (!existingAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        // Update the existing animal with the new data
        await Animal.findByIdAndUpdate(id, updatedAnimalData);

        // Fetch the updated animal after the update operat ion
        const updatedAnimal = await animalModel.findById(id);

        return res.status(200).json({ message: 'Animal updated successfully', animal: updatedAnimal });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};