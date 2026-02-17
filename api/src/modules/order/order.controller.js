"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.OrderStatus = void 0;
const order_service_1 = require("./order.service");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
const createOrder = async (req, res) => {
    try {
        const { total } = req.body;
        const userId = req.user?.id;
        if (!total) {
            return res.status(400).json({
                success: false,
                message: "total must be provided",
            });
        }
        const result = await order_service_1.orderService.createOrder(userId, total);
        res.status(201).json({
            success: true,
            message: "Order made successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add order",
        });
    }
};
const getAllUserOrder = async (req, res) => {
    try {
        const result = await order_service_1.orderService.getAllUserOrder();
        res.status(200).json({
            success: true,
            message: "All order delevery Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all order",
        });
    }
};
const getAllSellerOrder = async (req, res) => {
    try {
        const result = await order_service_1.orderService.getAllSellerOrder();
        res.status(200).json({
            success: true,
            message: "All order delevery Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all order",
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await order_service_1.orderService.getOrderById(orderId);
        res.status(200).json({
            success: true,
            message: "Order found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find order",
        });
    }
};
exports.orderController = {
    createOrder,
    getAllUserOrder,
    getOrderById,
    getAllSellerOrder
};
