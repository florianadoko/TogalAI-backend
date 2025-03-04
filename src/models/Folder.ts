import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  import User from "./User";
  import Document from "./Document";
import { FolderCreationAttributes } from "../interfaces/FolderCreationAttributes";

  
  @Table({ timestamps: true, tableName: "folders" })
  class Folder extends Model<Folder, FolderCreationAttributes> {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;
  
    @BelongsTo(() => User, { foreignKey: "userId" })
    user!: User;
  
    @HasMany(() => Document, { foreignKey: "folderId", onDelete: "CASCADE" })
    documents!: Document[];
  }
  
  export default Folder;