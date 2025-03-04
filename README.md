# File Management Application

This is the backend service for the File Management Application. It provides authentication, file uploads, access control, and file management using Node.js (Express.js), Local Storage, and PostgreSQL.

# Setup and Installation

1. Clone the repository

git clone git@github.com:florianadoko/TogalAI-backend.git
cd backend

2. Install dependencies
   npm install

\*\*Note
Make sure you have installed docker on you computer

3. Configure environment varibales
   Create .env file and add:

PORT=5001
DB_HOST=db
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key

4. Run migrations (sequelize)
   npx sequelize-cli db:migrate

5. Start the server
   Locally: npm run dev
   Docker: docker compose up --build

# API Endpoints

_Authentication_
POST /api/auth/register – Register a user
POST /api/auth/login – Login user
\*File Management
POST /api/documents – Create a document
GET /api/documents?folderId=:id – Get documents in a folder
POST /api/documents/upload – Upload a file version
GET /api/documents/:id/versions – Get all file versions
GET /api/documents/:id/download – Download latest file version
GET /api/documents/:id/download/:version – Download specific version
