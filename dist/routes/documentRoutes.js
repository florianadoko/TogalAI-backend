"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = __importDefault(require("../controllers/documentController"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post("/", authMiddleware_1.default, documentController_1.default.createDocument);
router.get("/", authMiddleware_1.default, documentController_1.default.getDocuments);
router.post("/upload", authMiddleware_1.default, upload.single("file"), documentController_1.default.uploadFile);
router.get("/:documentId/download", authMiddleware_1.default, documentController_1.default.downloadLatestFile);
router.get("/:documentId/versions", authMiddleware_1.default, documentController_1.default.getFileVersions);
router.get("/:documentId/download/:version", authMiddleware_1.default, documentController_1.default.downloadFileVersion);
exports.default = router;
