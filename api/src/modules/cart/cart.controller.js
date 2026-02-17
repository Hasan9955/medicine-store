"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.addProductToCart = exports.getCart = void 0;
const cart_service_1 = require("./cart.service");
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await (0, cart_service_1.getUserCart)(userId);
        res.json({ success: true, cart });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};
exports.getCart = getCart;
const addProductToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: "productId and quantity required" });
    }
    try {
        const item = await (0, cart_service_1.addToCart)(userId, productId, quantity);
        res.json({ success: true, item });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};
exports.addProductToCart = addProductToCart;
const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        if (!cartId) {
            return res.status(400).json({
                success: false,
                message: "cart id is required",
            });
        }
        const result = await (0, cart_service_1.deleteCartservice)(cartId);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete cart",
        });
    }
};
exports.deleteCart = deleteCart;
