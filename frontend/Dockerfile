# Dockerfile (frontend)
# Etapa 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias dentro del contenedor
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir la app
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

