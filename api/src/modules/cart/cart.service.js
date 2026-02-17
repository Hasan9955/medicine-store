"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartservice = exports.addToCart = exports.getUserCart = void 0;
const prisma_1 = require("../../lib/prisma");
const getUserCart = async (userId) => {
    return prisma_1.prisma.cart.findFirst({
        where: { userId },
        include: { items: { include: { product: true } } },
    });
};
exports.getUserCart = getUserCart;
const addToCart = async (userId, productId, quantity) => {
    let cart = await prisma_1.prisma.cart.findFirst({ where: { userId: userId } });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({
            data: { userId },
        });
    }
    const existingItem = await prisma_1.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId },
    });
    if (existingItem) {
        return prisma_1.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    }
    // add new item
    return prisma_1.prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
    });
};
exports.addToCart = addToCart;
const deleteCartservice = async (cartId) => {
    return prisma_1.prisma.cart.delete({
        where: {
            id: cartId
        }
    });
};
exports.deleteCartservice = deleteCartservice;
