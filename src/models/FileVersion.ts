import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Document from "./Document";
import { FileVersionCreationAttributes } from "../interfaces/FileVersionCreationAttributes";

@Table({ timestamps: true, tableName: "file_versions" })
class FileVersion extends Model<FileVersion, FileVersionCreationAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    filename!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fileUrl!: string;

    @ForeignKey(() => Document)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    documentId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1, 
    })
    version!: number;

    @BelongsTo(() => Document, {
        foreignKey: "documentId",
    })
    document!: Document;
}

export default FileVersion;
