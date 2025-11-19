# 📘 README -- Portfolio Full Stack con Docker

Este proyecto contiene un **frontend en React**, un **backend en
Node.js/Express** y una **base de datos PostgreSQL**, todo orquestado
con **Docker Compose**.

------------------------------------------------------------------------

## 🚀 Requisitos

Asegurate de tener instalado:

-   **Docker**\
-   **Docker Compose**

------------------------------------------------------------------------

## 📦 Contenido

    project/
    │
    ├── backend/
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── src/...
    │
    ├── frontend/
    │   ├── Dockerfile
    │   ├── entrypoint.sh
    │   ├── package.json
    │   ├── public/index.html
    │
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

## 🛠️ Configurar variables de entorno

El frontend obtiene la URL del backend mediante una variable de entorno
que será escrita dinámicamente en `config.js`.

En la sección del frontend del `docker-compose.yml`, podés cambiar:

``` yaml
environment:
  - REACT_APP_API_URL=http://localhost:4000
```

Ejemplo para producción:

    REACT_APP_API_URL=https://api.midominio.com

------------------------------------------------------------------------

## ▶️ Cómo ejecutar el proyecto

### **1️⃣ Clonar el repositorio**

``` sh
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

------------------------------------------------------------------------

### **2️⃣ Construir y levantar los contenedores**

``` sh
docker compose up --build -d
```

Esto levanta:

  Servicio     Puerto Host   Descripción
  ------------ ------------- -------------------------
  Frontend     80            React servido por Nginx
  Backend      4000          API Express
  PostgreSQL   5432          Base de datos

------------------------------------------------------------------------

### **3️⃣ Ver logs**

Frontend:

``` sh
docker compose logs frontend
```

Backend:

``` sh
docker compose logs backend
```

------------------------------------------------------------------------

### **4️⃣ Acceder a la aplicación**

🌐 **Frontend:**\
http://localhost/

📡 **Backend:**\
http://localhost:4000/api/hello

------------------------------------------------------------------------

## 🧹 Cómo apagar los contenedores

``` sh
docker compose down
```

Si querés borrar los volúmenes también:

``` sh
docker compose down -v
```

------------------------------------------------------------------------

## 🧪 Cómo entrar a cada contenedor

Frontend:

``` sh
docker exec -it portfolio-docker-stack-frontend-1 sh
```

Backend:

``` sh
docker exec -it portfolio-docker-stack-backend-1 sh
```

Base de datos:

``` sh
docker exec -it portfolio-docker-stack-db-1 sh
```

------------------------------------------------------------------------

## 🛠️ Cómo reconstruir todo desde cero

``` sh
docker compose down -v
docker compose up --build -d
```

------------------------------------------------------------------------

## 📁 Estructura de runtime

### Frontend

Servido por Nginx 😎\
El archivo `entrypoint.sh` genera automáticamente:

    /usr/share/nginx/html/config.js

con el valor de `REACT_APP_API_URL`.

### Backend

Corre con Node.js escuchando en `0.0.0.0:4000`.

### Base de datos

Persistencia en el volumen:

    pgdata

------------------------------------------------------------------------


