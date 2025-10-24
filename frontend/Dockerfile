# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build


# Production stage: nginx sirve los archivos estáticos
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Copia de configuración opcional de nginx si querés
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]