"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const getProfile_routes_1 = require("./modules/getProfile/getProfile.routes");
const category_route_1 = require("./modules/category/category.route");
const medicine_route_1 = require("./modules/medicine/medicine.route");
const user_route_1 = require("./modules/user/user.route");
const order_route_1 = require("./modules/order/order.route");
const cart_route_1 = require("./modules/cart/cart.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/auth/profile", getProfile_routes_1.getProfileRouter);
app.use("/api/category", category_route_1.categoryRouter);
app.use("/api/medicine", medicine_route_1.medicineRouter);
app.use("/api/admin", user_route_1.userRouter);
app.use("/api/order", order_route_1.orderRouter);
app.use("/api/cart", cart_route_1.cartRoutes);
app.get("/", (req, res) => {
    res.send('hellow world 123');
});
app.use(globalErrorHandler_1.default);
exports.default = app;
