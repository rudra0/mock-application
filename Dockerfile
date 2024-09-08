# Step 1: Use official Node image to build the React app
FROM node:16-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install the npm dependencies
RUN npm install

# Run Prettier to format code (optional step)
RUN npm run prettier

# Copy the entire app code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the build files
FROM nginx:alpine

# Copy the build files from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
 