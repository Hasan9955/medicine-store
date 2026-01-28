import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/route-auth";




const createOrder = async (userId: string, total: number) => {
    const order = await prisma.order.create({
        data: {
            userId: userId,
            total: total
        }
    })
    return order;
}


const getAllUserOrder = async () => {
    const orders = await prisma.order.findMany({
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
    return orders
}


const getAllSellerOrder = async () => {
    const orders = await prisma.order.findMany({
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
    return orders
}

const getOrderById = async (id: string) => {
    const order = await prisma.order.findUnique(
        {
            where: {
                id: id
            }
        }
    )
    return order;
}

export const orderService = {
    createOrder,
    getAllUserOrder,
    getOrderById,
    getAllSellerOrder
}