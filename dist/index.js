"use strict";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
require("reflect-metadata");
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const folderRoutes_1 = __importDefault(require("./routes/folderRoutes"));
const FileVersion_1 = __importDefault(require("./models/FileVersion"));
dotenv_1.default.config();
const app = (0, express_1.default)();

app.use(
  (0, cors_1.default)({
    origin: "http://localhost:3002",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);
app.use(express_1.default.json());

app.use("/api/auth", auth_1.default);
app.use("/api/folders", folderRoutes_1.default);
app.use("/api/documents", documentRoutes_1.default);
const PORT = process.env.PORT || 5001;

function checkFileVersionSchema() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const attributes = yield FileVersion_1.default.describe();
      console.log("FileVersion Table Schema:", attributes);
    } catch (error) {
      console.error("Error retrieving FileVersion schema:", error);
    }
  });
}
// connect to database and start server
database_1.default
  .sync({ alter: true })
  .then(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      console.log("Database synced successfully!");
      console.log("Database Name:", process.env.DB_NAME);
      console.log("Using Database:", database_1.default.getDatabaseName());
      yield checkFileVersionSchema();
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    })
  )
  .catch((err) => console.error("Database connection error:", err));
