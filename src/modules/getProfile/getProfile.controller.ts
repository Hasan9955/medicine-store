import { Request, Response } from "express";
import { getProfileService, updateUserProfile } from "./getProfile.service";


export const getProfileController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const result = await getProfileService(user.id);

  res.json(result);
};



export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const updatedUser = await updateUserProfile(id as string, { name, email });
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};