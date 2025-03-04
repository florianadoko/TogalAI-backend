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
const documentService_1 = __importDefault(require("../services/documentService"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
const fs_1 = __importDefault(require("fs"));
class DocumentController {
    // api for creating document
    static createDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { folderId, title, description } = req.body;
                // (Optional) You can also verify if req.user exists if needed
                const document = yield documentService_1.default.createDocument(Number(folderId), title, description);
                res.status(201).json({ message: "Document created", document });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for getting docuemnts
    static getDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ error: "Unauthorized" });
                    return;
                }
                const { folderId } = req.query;
                if (!folderId) {
                    res.status(400).json({ error: "Folder ID is required" });
                    return;
                }
                const documents = yield documentService_1.default.getDocuments(req.user.id, Number(folderId));
                res.json({ message: "Documents retrieved", documents });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for uploading file into document(creates new file version)
    static uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documentId } = req.body;
                const file = req.file;
                if (!file)
                    throw new Error("No file uploaded");
                const fileVersion = yield documentService_1.default.uploadFile(Number(documentId), file.originalname, `/uploads/${file.filename}`);
                res.status(201).json({ message: "File uploaded", fileVersion });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for downloading latest file uploaded(default one)
    static downloadLatestFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documentId } = req.params;
                const fileVersions = yield documentService_1.default.getFileVersions(Number(documentId));
                if (!fileVersions || fileVersions.length === 0) {
                    res.status(404).json({ error: "No file versions found" });
                    return;
                }
                // Assuming the latest version is the first (sorted DESC by version)
                const latestFile = fileVersions[0];
                if (!latestFile.fileUrl) {
                    res.status(400).json({ error: "File URL is missing" });
                    return;
                }
                // Resolve the absolute file path
                const filePath = path_1.default.join(process.cwd(), latestFile.fileUrl);
                if (!fs_1.default.existsSync(filePath)) {
                    res.status(404).json({ error: "File not found on server" });
                    return;
                }
                // Determine the content type based on the filename
                const contentType = mime_types_1.default.lookup(latestFile.filename) || "application/octet-stream";
                const fileStat = fs_1.default.statSync(filePath);
                // Set headers explicitly
                res.setHeader("Content-Type", contentType);
                res.setHeader("Content-Length", fileStat.size);
                res.setHeader("Content-Disposition", `attachment; filename="${latestFile.filename}"`);
                // Create a read stream and pipe it to the response
                const readStream = fs_1.default.createReadStream(filePath);
                readStream.pipe(res);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for getting file versions
    static getFileVersions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documentId } = req.params;
                const fileVersions = yield documentService_1.default.getFileVersions(Number(documentId));
                res.json({ message: "File versions retrieved", fileVersions });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    //api for downloading file version
    static downloadFileVersion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documentId, version } = req.params;
                const fileVersions = yield documentService_1.default.getFileVersions(Number(documentId));
                if (!fileVersions || fileVersions.length === 0) {
                    res.status(404).json({ error: "No file versions found" });
                    return;
                }
                const fileVersion = fileVersions.find(fv => fv.version === Number(version));
                if (!fileVersion) {
                    res.status(404).json({ error: "File version not found" });
                    return;
                }
                if (!fileVersion.fileUrl || typeof fileVersion.fileUrl !== "string") {
                    res.status(400).json({ error: "Invalid file URL" });
                    return;
                }
                const filePath = path_1.default.join(process.cwd(), fileVersion.fileUrl);
                if (!fs_1.default.existsSync(filePath)) {
                    res.status(404).json({ error: "File not found on server" });
                    return;
                }
                // Determine MIME type and set headers.
                const contentType = mime_types_1.default.lookup(fileVersion.filename) || "application/octet-stream";
                res.setHeader("Content-Type", contentType);
                res.setHeader("Content-Disposition", `attachment; filename="${fileVersion.filename}"`);
                // <-- This is the key: expose the header to the frontend.
                res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
                const readStream = fs_1.default.createReadStream(filePath);
                readStream.pipe(res);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = DocumentController;
