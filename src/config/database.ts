import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/User";
import Folder from "../models/Folder";
import Document from "../models/Document";
import FileVersion from "../models/FileVersion";

dotenv.config();

const sequelize = new Sequelize(
//   process.env.DB_NAME as string,
//   process.env.DB_USER as string,
//   process.env.DB_PASS as string,
process.env.DATABASE_URL as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    models: [User, Folder, Document, FileVersion],
  }
);

export default sequelize;
