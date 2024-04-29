import Animal from "../models/animal.model.js";
import RescueTeam from "../models/rescueTeam.model.js";
import Employee from "../models/employee.model.js";
import AnimalRescueRequest from "../models/AnimalRescueRequest.model.js";

export const getEmployeesCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments();
        return res.status(200).json({ employeesCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getDoctorsCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments({ designation: "Doctor" });
        return res.status(200).json({ employeesCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getShelterWorkerCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments({ designation: "Shelter Worker" });
        return res.status(200).json({ employeesCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getShelterManagerCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments({ designation: "Shelter Manager" });
        return res.status(200).json({ employeesCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getReleasedAnimalsCount = async (req, res) => {
    try {
        const releasedAnimalsCount = await Animal.countDocuments({ state: 'Released' });
        return res.status(200).json({ releasedAnimalsCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const getStayAnimalsCount = async (req, res) => {
    try {
        const releasedAnimalsCount = await Animal.countDocuments({ state: 'Stay In Shelter' });
        return res.status(200).json({ releasedAnimalsCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
export const getTreatmentCount = async (req, res) => {
    try {
        const animalsInShelterCount = await Animal.countDocuments();
        return res.status(200).json({ animalsInShelterCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const getTreatmentInProcess = async (req, res) => {
    try {
        const animalsInShelterCount = await AnimalRescueRequest.countDocuments({ status: { $in: ['assigned', 'pending'] } });
        return res.status(200).json({ animalsInShelterCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const getTreatmentDoneByRescueTeam = async (req, res) => {
    try {
        const animalsInShelterCount = await AnimalRescueRequest.countDocuments({ descriptionByRescueTeam: "Done on the spot" });
        return res.status(200).json({ animalsInShelterCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const getRescueTeamCount = async (req, res) => {
    try {
        const animalsInShelterCount = await RescueTeam.countDocuments();
        return res.status(200).json({ animalsInShelterCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};



