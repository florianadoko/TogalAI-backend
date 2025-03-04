import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
import FileVersion from "../models/FileVersion";
import Folder from "../models/Folder";
import { DocumentCreationAttributes } from "../interfaces/DocumentCreationAttributes";

  @Table({ timestamps: true, tableName: "documents" })
  class Document extends Model<Document, DocumentCreationAttributes> {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    title!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    description!: string | null;
  
    @ForeignKey(() => Folder)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    folderId!: number;
  
    @BelongsTo(() => Folder, {
      foreignKey: "folderId",
    })
    folder!: Folder;
  
    @HasMany(() => FileVersion, {
      foreignKey: "documentId",
      onDelete: "CASCADE",
    })
    files!: FileVersion[];
  }
  
  export default Document;
  