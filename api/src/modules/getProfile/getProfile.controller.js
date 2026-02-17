"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getProfileController = void 0;
const getProfile_service_1 = require("./getProfile.service");
const getProfileController = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const result = await (0, getProfile_service_1.getProfileService)(user.id);
    res.json(result);
};
exports.getProfileController = getProfileController;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    try {
        const updatedUser = await (0, getProfile_service_1.updateUserProfile)(id, { name, email });
        res.json({ success: true, user: updatedUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
};
exports.updateUser = updateUser;
