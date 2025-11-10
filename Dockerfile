# Stage 1: Build
FROM oven/bun:1.2-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
