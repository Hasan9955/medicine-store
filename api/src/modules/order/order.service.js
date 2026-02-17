"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prisma_1 = require("../../lib/prisma");
const createOrder = async (userId, total) => {
    const order = await prisma_1.prisma.order.create({
        data: {
            userId: userId,
            total: total
        }
    });
    return order;
};
const getAllUserOrder = async () => {
    const orders = await prisma_1.prisma.order.findMany({
        where: {
            user: {
                role: "USER",
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true, // optional
        },
    });
    return orders;
};
const getAllSellerOrder = async () => {
    const orders = await prisma_1.prisma.order.findMany({
        where: {
            user: {
                role: "SELLER",
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true, // optional
        },
    });
    return orders;
};
const getOrderById = async (id) => {
    const order = await prisma_1.prisma.order.findUnique({
        where: {
            id: id
        }
    });
    return order;
};
exports.orderService = {
    createOrder,
    getAllUserOrder,
    getOrderById,
    getAllSellerOrder
};
