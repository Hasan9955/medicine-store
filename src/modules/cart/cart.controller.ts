import { Request, Response } from "express";
import { addToCart, getUserCart, deleteCartservice } from "./cart.service";


export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart = await getUserCart(userId as string);
    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "productId and quantity required" });
  }

  try {
    const item = await addToCart(userId as string, productId, quantity);
    res.json({ success: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};



export const deleteCart = async (req: Request, res: Response) => {
  try {

    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "cart id is required",
      });
    }

    const result = await deleteCartservice(cartId as string);

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete cart",
    });
  }
}
