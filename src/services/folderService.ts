import Folder from "../models/Folder";

class FolderService {
  static async createFolder(name: string, userId: number) {
    return await Folder.create({ name, userId });
  }

  static async getAllFolders() {
    return await Folder.findAll();
  }
}

export default FolderService;
