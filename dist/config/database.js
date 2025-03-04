"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Folder_1 = __importDefault(require("../models/Folder"));
const Document_1 = __importDefault(require("../models/Document"));
const FileVersion_1 = __importDefault(require("../models/FileVersion"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    models: [User_1.default, Folder_1.default, Document_1.default, FileVersion_1.default],
});
exports.default = sequelize;
