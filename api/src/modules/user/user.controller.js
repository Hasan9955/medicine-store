"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const route_auth_1 = require("../../middlewares/route-auth");
const getAllUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.getAllUser();
        res.status(200).json({
            success: true,
            message: "All User Fetched Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all user",
        });
    }
};
const updateUserStatus = async (req, res) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access reject. Admin only.",
            });
        }
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is not given",
            });
        }
        const { role, emailVerified } = req.body;
        if (role && !Object.values(route_auth_1.UserRole).includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role value",
            });
        }
        const user = await user_service_1.userService.updateUserStatus(userId, {
            role,
            emailVerified,
        });
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update user status",
        });
    }
};
exports.userController = {
    getAllUser,
    updateUserStatus
};
