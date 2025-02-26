# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy everything to the builder
COPY . .

# Install dependencies and build the project
RUN npm install && npm run build

# Stage 2: Serve the built app using nginx
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copy the built assets from the builder stage
COPY --from=builder /app/dist .

# Copy the nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose the desired port
EXPOSE 8082

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
