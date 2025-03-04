import express from "express";
import DocumentController from "../controllers/documentController";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  

router.post("/", authMiddleware, DocumentController.createDocument);
router.get("/", authMiddleware, DocumentController.getDocuments);

router.post("/upload", authMiddleware, upload.single("file"), DocumentController.uploadFile);

router.get("/:documentId/download", authMiddleware, DocumentController.downloadLatestFile);
router.get("/:documentId/versions", authMiddleware, DocumentController.getFileVersions);
router.get("/:documentId/download/:version", authMiddleware, DocumentController.downloadFileVersion);



export default router;
