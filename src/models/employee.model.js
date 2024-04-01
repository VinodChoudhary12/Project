const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: { // Designation or department
        type: String, required: true
    },
    contact: { // Employee contact information
        type: String,
        required: true
    },
    adharCardNo: { // Unique ID (assuming Aadhar Card is used in your location)
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    designation: { // Specific job role
        type: String
    },
    reg_date: { // Registration date
        type: Date,
        default: Date.now
    },
    status: { // Employment status (e.g., active, inactive)
        type: String
    },
    salary: {
        type: Number
    },
    joinDate: { // Date of joining
        type: Date
    },
    userName: { // Username for login purposes (optional)
        type: String
    },
    password: { // Password for login purposes (optional)
        type: String
    },
    empImage: { // Employee profile picture (optional)
        type: String
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
