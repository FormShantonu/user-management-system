# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]
