"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Folder_1 = __importDefault(require("../models/Folder"));
class FolderController {
    //api for creating folder
    static createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { name } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ error: "Unauthorized: Missing user ID" });
                    return;
                }
                if (!name || name.trim() === "") {
                    res.status(400).json({ error: "Folder name is required" });
                    return;
                }
                const folder = yield Folder_1.default.create({ name, userId });
                res.status(201).json({ message: "Folder created successfully", folder });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for getting all folders
    static getAllFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ error: "Unauthorized: Missing user ID" });
                    return;
                }
                // Only retrieve folders for the logged-in user
                const folders = yield Folder_1.default.findAll({ where: { userId } });
                res.json(folders);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = FolderController;
