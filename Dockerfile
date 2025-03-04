# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Build TypeScript files (ensure it compiles into `dist/`)
RUN npm run build

# Start the server using the compiled JavaScript file
CMD ["node", "dist/index.js"]
