"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.updateUserStatus = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllUser = async () => {
    const users = await prisma_1.prisma.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return users;
};
const updateUserStatus = async (userId, data) => {
    const user = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            role: data.role,
            emailVerified: data.emailVerified,
        },
    });
    return user;
};
exports.updateUserStatus = updateUserStatus;
exports.userService = {
    getAllUser,
    updateUserStatus: exports.updateUserStatus
};
