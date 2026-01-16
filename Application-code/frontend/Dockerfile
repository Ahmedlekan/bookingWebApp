# ---------- Build Stage ----------
FROM node:20 AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build-time args (Vite reads these)
ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUB_KEY

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_STRIPE_PUB_KEY=$VITE_STRIPE_PUB_KEY

RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

