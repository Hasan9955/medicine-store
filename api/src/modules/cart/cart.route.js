"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.get("/:userId", cart_controller_1.getCart);
router.post("/:userId/add", cart_controller_1.addProductToCart);
router.delete("/:cartId", cart_controller_1.deleteCart);
exports.cartRoutes = router;
