"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (name) => {
    const category = await prisma_1.prisma.category.create({
        data: {
            name,
        },
        include: {
            medicines: true,
        },
    });
    return category;
};
const getAllCategory = async () => {
    const categories = await prisma_1.prisma.category.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return categories;
};
exports.categoryService = {
    createCategory,
    getAllCategory
};
