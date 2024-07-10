# First stage: Node.js image to build the project
FROM node:latest as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Second stage: Use nginx to serve the built app
FROM nginx:alpine as serve-stage

# Copy the build output from the first stage to replace the default nginx contents
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80