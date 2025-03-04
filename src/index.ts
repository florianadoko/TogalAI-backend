import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import authRoutes from "./routes/auth";
import "reflect-metadata";
import documentRoutes from "./routes/documentRoutes";
import folderRoutes from "./routes/folderRoutes";
import FileVersion from "./models/FileVersion"; 

dotenv.config();

const app = express();


app.use(cors({
    origin: "http://localhost:3002", //localhost based on frontend url
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5001;


async function checkFileVersionSchema() {
    try {
        const attributes = await FileVersion.describe();
        console.log("FileVersion Table Schema:", attributes);
    } catch (error) {
        console.error("Error retrieving FileVersion schema:", error);
    }
}

// connect to database and start server
sequelize.sync({ alter: true }) 
    .then(async () => {
        console.log("Database synced successfully!");
        console.log("Database Name:", process.env.DB_NAME);
        console.log("Using Database:", sequelize.getDatabaseName());

        await checkFileVersionSchema();  
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error("Database connection error:", err));
