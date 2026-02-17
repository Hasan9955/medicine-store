"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineController = void 0;
const medicine_service_1 = require("./medicine.service");
const addMedicine = async (req, res) => {
    try {
        const { name, description, price, stock, categoryName } = req.body;
        const sellerId = req.user?.id;
        if (!name || !price || !stock || !categoryName || !sellerId) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }
        const result = await medicine_service_1.medicineService.addMedicine({ name, description, price, stock, sellerId, categoryName });
        res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add medicine",
        });
    }
};
const updateMedicine = async (req, res) => {
    try {
        const { idParam } = req.params;
        const { name, description, price, stock, categoryName } = req.body;
        if (!idParam) {
            return res.status(400).json({
                success: false,
                message: "Medicine id is required",
            });
        }
        const result = await medicine_service_1.medicineService.updateMedicine(idParam, { name, description, price, stock, categoryName });
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to modify medicine",
        });
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const { idParam } = req.params;
        if (!idParam) {
            return res.status(400).json({
                success: false,
                message: "Medicine id is required",
            });
        }
        const result = await medicine_service_1.medicineService.deleteMedicine(idParam);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete medicine",
        });
    }
};
const getAllMedicine = async (req, res) => {
    try {
        const { featured } = req.query;
        const result = await medicine_service_1.medicineService.getAllMedicine(featured !== undefined ? featured === "true" : undefined);
        res.status(200).json({
            success: true,
            message: "Medicine fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all medicine",
        });
    }
};
const getMedicineById = async (req, res) => {
    try {
        const { idParam } = req.params;
        const result = await medicine_service_1.medicineService.getMedicineById(idParam);
        res.status(200).json({
            success: true,
            message: "Medicine fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find medicine",
        });
    }
};
exports.medicineController = {
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getAllMedicine,
    getMedicineById
};
