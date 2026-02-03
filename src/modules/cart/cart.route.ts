import express, { Router } from "express";
import { addProductToCart, deleteCart, getCart } from "./cart.controller";


const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addProductToCart);  
router.delete("/:cartId" , deleteCart)

export const cartRoutes:Router = router;
