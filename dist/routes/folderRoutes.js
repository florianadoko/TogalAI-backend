"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folderController_1 = __importDefault(require("../controllers/folderController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, folderController_1.default.createFolder);
router.get("/", authMiddleware_1.default, folderController_1.default.getAllFolders);
exports.default = router;
