import { Request, Response } from "express";
import { categoryService } from "./category.service";


const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const category = await categoryService.createCategory(name);

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create category",
        });
    }
};


const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategory();
        
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to find all category",
        });
    }
}

export const categoryController = {
    createCategory,
    getAllCategory
}
