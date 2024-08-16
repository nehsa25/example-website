# Use a Node.js based image
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for faster installs
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --omit=dev

# Use a minimal Nginx image as a base for production
FROM nginx:alpine

# Remove default Nginx configuration and create a new one
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d

# Create a basic Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application to Nginx default directory
COPY --from=build /app/dist/scheduling-app/browser /usr/share/nginx/html

# Set correct permissions for the webroot
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
EXPOSE 80