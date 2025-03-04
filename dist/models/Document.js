"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const FileVersion_1 = __importDefault(require("../models/FileVersion"));
const Folder_1 = __importDefault(require("../models/Folder"));
let Document = class Document extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Document.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Folder_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Document.prototype, "folderId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Folder_1.default, {
        foreignKey: "folderId",
    }),
    __metadata("design:type", Folder_1.default)
], Document.prototype, "folder", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => FileVersion_1.default, {
        foreignKey: "documentId",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Document.prototype, "files", void 0);
Document = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: "documents" })
], Document);
exports.default = Document;
