import { Router } from "express";
import { orderController } from "./order.controller";
import routeAuth, { UserRole } from "../../middlewares/route-auth";

const router = Router();

router.post("/", routeAuth(UserRole.ADMIN, UserRole.SELLER, UserRole.USER) ,orderController.createOrder);

router.get("/", routeAuth(UserRole.ADMIN, UserRole.SELLER), orderController.getAllOrder)

export const orderRouter :Router = router;