# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY . /app

# Install the application dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
