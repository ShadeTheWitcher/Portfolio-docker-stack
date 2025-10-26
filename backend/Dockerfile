FROM node:20-alpine
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json ./

# Instalar dependencias (incluye express, cors, pg)
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 4000
CMD ["node", "server.js"]
