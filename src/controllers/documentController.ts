import { Response } from "express";
import DocumentService from "../services/documentService";
import { AuthRequest } from "../middleware/authMiddleware";
import path from "path";
import mime from "mime-types";
import fs from "fs";

class DocumentController {
  //  creating document
  static async createDocument(req: AuthRequest, res: Response) {
    try {
      const { folderId, title, description } = req.body;
      // (Optional) You can also verify if req.user exists if needed

      const document = await DocumentService.createDocument(
        Number(folderId),
        title,
        description
      );

      res.status(201).json({ message: "Document created", document });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // getting docuemnts
  static async getDocuments(req: AuthRequest, res: Response): Promise<void> {
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
      
      const documents = await DocumentService.getDocuments(req.user.id, Number(folderId));
      res.json({ message: "Documents retrieved", documents });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // uploading file into document(creates new file version)
  static async uploadFile(req: AuthRequest, res: Response) {
    try {
      const { documentId } = req.body;
      const file = req.file;
      if (!file) throw new Error("No file uploaded");

      const fileVersion = await DocumentService.uploadFile(
        Number(documentId),
        file.originalname,
        `/uploads/${file.filename}`
      );

      res.status(201).json({ message: "File uploaded", fileVersion });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // downloading latest file uploaded(default one)
static async downloadLatestFile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { documentId } = req.params;
      const fileVersions = await DocumentService.getFileVersions(Number(documentId));
  
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
      const filePath = path.join(process.cwd(), latestFile.fileUrl);
      if (!fs.existsSync(filePath)) {
         res.status(404).json({ error: "File not found on server" });
         return;
      }
  
      // Determine the content type based on the filename
      const contentType = mime.lookup(latestFile.filename) || "application/octet-stream";
      const fileStat = fs.statSync(filePath);
  
      // Set headers explicitly
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Length", fileStat.size);
      res.setHeader("Content-Disposition", `attachment; filename="${latestFile.filename}"`);
  
      // Create a read stream and pipe it to the response
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

// getting file versions
  static async getFileVersions(req: AuthRequest, res: Response) {
    try {
      const { documentId } = req.params;
      const fileVersions = await DocumentService.getFileVersions(Number(documentId));
      res.json({ message: "File versions retrieved", fileVersions });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

// downloading file version
  static async downloadFileVersion(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { documentId, version } = req.params;
      const fileVersions = await DocumentService.getFileVersions(Number(documentId));
  
      if (!fileVersions || fileVersions.length === 0) {
         res.status(404).json({ error: "No file versions found" });
         return
      }
  
      const fileVersion = fileVersions.find(fv => fv.version === Number(version));
      if (!fileVersion) {
         res.status(404).json({ error: "File version not found" });
         return
      }
  
      if (!fileVersion.fileUrl || typeof fileVersion.fileUrl !== "string") {
         res.status(400).json({ error: "Invalid file URL" });
         return
      }
  
      const filePath = path.join(process.cwd(), fileVersion.fileUrl);
      if (!fs.existsSync(filePath)) {
         res.status(404).json({ error: "File not found on server" });
         return
      }
  
      //  MIME type and set headers.
      const contentType = mime.lookup(fileVersion.filename) || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${fileVersion.filename}"`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


}  

export default DocumentController;
