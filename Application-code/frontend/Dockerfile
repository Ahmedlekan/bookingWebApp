# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy built assets from build stage - CORRECTED PATH
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# BUILD AND RUN

# docker build -t frontend-prod .
# docker run -d -p 3000:80 --name frontend-pro frontend-prod
