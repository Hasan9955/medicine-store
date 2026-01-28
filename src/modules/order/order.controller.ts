import { Request, Response } from "express";
import { orderService } from "./order.service";
import { UserRole } from "../../middlewares/route-auth";

export enum OrderStatus {
  PENDING ="PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const {total } = req.body;
        const userId = req.user?.id

        if (!total ) {
            return res.status(400).json({
                success: false,
                message: "total must be provided",
            });
        }

        const result = await orderService.createOrder(userId as string, total as number)

        res.status(201).json({
            success: true,
            message: "Order made successfully",
            data: result,
        });



    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add order",
        });
    }
}


const getAllUserOrder = async (req: Request, res: Response) => {
    try {

        const result = await orderService.getAllUserOrder();

        res.status(200).json({
            success: true,
            message: "All order delevery Successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all order",
        });
    }
}


const getAllSellerOrder = async (req: Request, res: Response) => {
    try {

        const result = await orderService.getAllSellerOrder();

        res.status(200).json({
            success: true,
            message: "All order delevery Successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all order",
        });
    }
}


const getOrderById = async (req: Request, res: Response) => {
    try {

        const {orderId} = req.params 

        const result = await orderService.getOrderById(orderId as string);
        
        res.status(200).json({
            success: true,
            message: "Order found successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find order",
        });
    }
}



export const orderController = {
    createOrder,
    getAllUserOrder,
    getOrderById,
    getAllSellerOrder
}