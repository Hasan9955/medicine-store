"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getProfileService = void 0;
const prisma_1 = require("../../lib/prisma");
const getProfileService = async (userId) => {
    return prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.getProfileService = getProfileService;
const updateUserProfile = async (id, data) => {
    return prisma_1.prisma.user.update({
        where: { id },
        data,
    });
};
exports.updateUserProfile = updateUserProfile;
