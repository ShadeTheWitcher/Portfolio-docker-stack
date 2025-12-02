# ===========================
# Etapa 1: Builder
# ===========================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# ===========================
# Etapa 2: Servir con Nginx
# ===========================
FROM nginx:stable-alpine

# Copiar build de React
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Configuración Nginx
RUN echo "server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files \$uri /index.html; } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
