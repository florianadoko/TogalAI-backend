import express from "express";
import FolderController from "../controllers/folderController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, FolderController.createFolder);
router.get("/", authMiddleware, FolderController.getAllFolders);

export default router;
