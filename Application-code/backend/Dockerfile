# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# RUN npm run build # Uncomment if you have build step

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application and source code
COPY --from=builder /app ./
# COPY --from=builder /app/dist ./dist # If you built the app

# Set ownership and switch to non-root user
RUN chown -R nodejs:nodejs .
USER nodejs

EXPOSE 3000
CMD ["npm", "start"]

# docker build -t backend-optimized .
# docker run -d -p 7000:3000 --name backend-container backend-optimized
