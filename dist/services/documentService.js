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
const Document_1 = __importDefault(require("../models/Document"));
const FileVersion_1 = __importDefault(require("../models/FileVersion"));
const Folder_1 = __importDefault(require("../models/Folder"));
class DocumentService {
    static createDocument(folderId, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Document_1.default.create({ folderId, title, description: description !== null && description !== void 0 ? description : null });
        });
    }
    // retrieve all documents in a folder that belongs to a specific user.
    static getDocuments(userId, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Document_1.default.findAll({
                where: { folderId },
                include: [
                    {
                        model: Folder_1.default,
                        where: { userId },
                    },
                ],
                attributes: ["id", "title", "description", "createdAt", "updatedAt"],
            });
        });
    }
    static uploadFile(documentId, filename, fileUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const latestVersion = (yield FileVersion_1.default.count({ where: { documentId } })) + 1;
            return yield FileVersion_1.default.create({
                documentId,
                filename,
                fileUrl,
                version: latestVersion,
            });
        });
    }
    static getLatestFile(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FileVersion_1.default.findOne({
                where: { documentId },
                order: [["version", "DESC"]],
            });
        });
    }
    static getFileVersions(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FileVersion_1.default.findAll({
                where: { documentId },
                order: [["version", "DESC"]],
            });
        });
    }
}
exports.default = DocumentService;
