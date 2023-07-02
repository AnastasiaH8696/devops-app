# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY frontend/ .

# Set the command to run when the container starts
CMD ["npm", "start"]

# Expose the port used by the frontend (e.g., 3000)
EXPOSE 3000
