# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY backend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY backend/ .

# Expose the port that the Express.js server will listen on
EXPOSE 5000

# Start the Express.js server
CMD ["node", "index.js"]
