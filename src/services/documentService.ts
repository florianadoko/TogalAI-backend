import Document from "../models/Document";
import FileVersion from "../models/FileVersion";
import Folder from "../models/Folder";
  
  class DocumentService {
    
    static async createDocument(folderId: number, title: string, description?: string) {
      return await Document.create({ folderId, title, description: description ?? null });
    }
    // retrieve all documents in a folder that belongs to a specific user.
    static async getDocuments(userId: number, folderId: number) {
        return await Document.findAll({
        where: { folderId },
        include: [
            {
            model: Folder,
            where: { userId },
            },
        ],
        attributes: ["id", "title", "description", "createdAt", "updatedAt"],
        });
    }
    static async uploadFile(documentId: number, filename: string, fileUrl: string) {
      const latestVersion = (await FileVersion.count({ where: { documentId } })) + 1;
      return await FileVersion.create({
        documentId,
        filename,
        fileUrl,
        version: latestVersion,
      });
    }
    static async getLatestFile(documentId: number) {
        return await FileVersion.findOne({
        where: { documentId },
        order: [["version", "DESC"]],
        });
    }

    static async getFileVersions(documentId: number) {
        return await FileVersion.findAll({
        where: { documentId },
        order: [["version", "DESC"]],
        });
    }


}

export default DocumentService;
