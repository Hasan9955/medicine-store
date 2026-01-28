import { Request, Response } from "express";
import { orderService } from "./order.service";

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


const getAllOrder = async (req: Request, res: Response) => {
    try {
        const result = await orderService.getAllOrder();

        res.status(200).json({
            success: true,
            message: "All order delevery Successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all user",
        });
    }
}



export const orderController = {
    createOrder,
    getAllOrder
}