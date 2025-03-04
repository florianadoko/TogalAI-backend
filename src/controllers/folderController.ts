import { Response } from "express";
import Folder from "../models/Folder";
import { AuthRequest } from "../middleware/authMiddleware";

class FolderController {

// creating folder
  static async createFolder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized: Missing user ID" });
        return;
      }
      if (!name || name.trim() === "") {
         res.status(400).json({ error: "Folder name is required" });
         return;
      }
      const folder = await Folder.create({ name, userId });
      res.status(201).json({ message: "Folder created successfully", folder });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // getting all folders
  static async getAllFolders(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized: Missing user ID" });
        return;
      }
      const folders = await Folder.findAll({ where: { userId } });
      res.json(folders);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default FolderController;
