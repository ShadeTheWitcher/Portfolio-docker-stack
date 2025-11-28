# Backend Portfolio API

API REST para gestionar un portfolio personal con autenticación JWT, CRUD de proyectos, tecnologías, educación e información personal.

## 🚀 Tecnologías

- **Node.js** + **Express** - Framework web
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Hash de contraseñas
- **Multer** - Upload de archivos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (crear archivo .env)
cp .env.example .env
```

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
DB_USER=postgres
DB_HOST=db
DB_NAME=portfolio
DB_PASSWORD=example
DB_PORT=5432
JWT_SECRET=tu_clave_secreta_super_segura_cambiame_en_produccion_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## 🗄️ Inicializar Base de Datos

```bash
# 1. Asegurarse de que PostgreSQL esté corriendo
docker-compose up -d db

# 2. Ejecutar script para hashear contraseña del admin
node scripts/updateAdminPassword.js

# 3. (Opcional) Insertar datos de ejemplo
# Conectarse a PostgreSQL y ejecutar db/update.sql
```

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

⚠️ **IMPORTANTE**: Cambiar estas credenciales en producción

## 🏃 Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:4000`

## 📚 Endpoints

### Autenticación (`/api/auth`)

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 9,
    "usuario": "admin",
    "perfil_id": 1
  }
}
```

#### Verificar Token
```http
POST /api/auth/verify
Authorization: Bearer {token}
```

#### Cambiar Contraseña
```http
POST /api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "admin123",
  "newPassword": "nueva_contraseña_segura"
}
```

---

### Proyectos (`/api/projects`)

#### Obtener todos los proyectos
```http
GET /api/projects
```

#### Obtener proyectos destacados
```http
GET /api/projects/destacados
```

#### Obtener proyecto por ID
```http
GET /api/projects/:id
```

#### Crear proyecto 🔒
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name_proyect": "Mi Proyecto",
  "descripcion": "Descripción del proyecto",
  "categoria_id": 1,
  "link_github": "https://github.com/usuario/repo",
  "link_web": "https://proyecto.com",
  "imagen": "proyecto.jpg",
  "destacado": "SI",
  "tecnologias": [1, 2, 3]
}
```

#### Actualizar proyecto 🔒
```http
PUT /api/projects/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name_proyect": "Proyecto Actualizado",
  "descripcion": "Nueva descripción",
  ...
}
```

#### Eliminar proyecto 🔒
```http
DELETE /api/projects/:id
Authorization: Bearer {token}
```

#### Marcar/desmarcar como destacado 🔒
```http
PATCH /api/projects/:id/destacar
Authorization: Bearer {token}
```

---

### Información Personal (`/api/info`)

#### Obtener información
```http
GET /api/info
```

**Respuesta:**
```json
{
  "id": 1,
  "sobre_mi": "Desarrollador Full Stack...",
  "correo": "correo@ejemplo.com",
  "link_telegram": "https://t.me/usuario",
  "link_linkedin": "https://linkedin.com/in/usuario",
  "skills": "React, Node.js, Docker...",
  "imagen_perfil": "perfil.jpg",
  "has_cv": true
}
```

#### Actualizar información 🔒
```http
PUT /api/info
Authorization: Bearer {token}
Content-Type: application/json

{
  "sobre_mi": "Nuevo texto sobre mí",
  "correo": "nuevo@correo.com",
  "link_telegram": "https://t.me/nuevo",
  "link_linkedin": "https://linkedin.com/in/nuevo",
  "skills": "React, Node.js, PostgreSQL",
  "imagen_perfil": "nueva_imagen.jpg"
}
```

#### Subir CV (PDF) 🔒
```http
POST /api/info/cv
Authorization: Bearer {token}
Content-Type: multipart/form-data

cv: [archivo.pdf]
```

#### Descargar CV
```http
GET /api/info/cv
```

#### Eliminar CV 🔒
```http
DELETE /api/info/cv
Authorization: Bearer {token}
```

---

### Tecnologías (`/api/technologies`)

#### Obtener todas las tecnologías
```http
GET /api/technologies
```

#### Obtener solo skills
```http
GET /api/technologies/skills
```

#### Obtener categorías
```http
GET /api/technologies/categories
```

#### Obtener niveles
```http
GET /api/technologies/levels
```

#### Crear tecnología 🔒
```http
POST /api/technologies
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre_tec": "React",
  "categoria_id": 2,
  "nivel_id": 3,
  "imagen": "react.png",
  "es_skill": "SI"
}
```

#### Actualizar tecnología 🔒
```http
PUT /api/technologies/:id
Authorization: Bearer {token}
```

#### Eliminar tecnología 🔒
```http
DELETE /api/technologies/:id
Authorization: Bearer {token}
```

---

### Educación (`/api/education`)

#### Obtener toda la educación
```http
GET /api/education
```

#### Crear educación 🔒
```http
POST /api/education
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Título Universitario",
  "descripcion": "Ingeniería en Sistemas",
  "cant_horas": "5 años"
}
```

#### Actualizar educación 🔒
```http
PUT /api/education/:id
Authorization: Bearer {token}
```

#### Eliminar educación 🔒
```http
DELETE /api/education/:id
Authorization: Bearer {token}
```

---

## 🔒 Autenticación

Las rutas marcadas con 🔒 requieren autenticación. Incluir el token JWT en el header:

```
Authorization: Bearer {tu_token_jwt}
```

## 📁 Estructura del Proyecto

```
backend/
├── config/
│   └── db.js              # Configuración PostgreSQL
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── infoController.js
│   ├── techController.js
│   └── educationController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── infoRoutes.js
│   ├── techRoutes.js
│   └── educationRoutes.js
├── scripts/
│   └── updateAdminPassword.js
├── uploads/               # Archivos subidos
├── server.js             # Punto de entrada
├── package.json
└── .env                  # Variables de entorno
```

## 🧪 Testing con cURL

```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}'

# Obtener proyectos
curl http://localhost:4000/api/projects

# Crear proyecto (con token)
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"name_proyect":"Nuevo Proyecto","descripcion":"Descripción","categoria_id":1}'

# Subir CV
curl -X POST http://localhost:4000/api/info/cv \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -F "cv=@/ruta/a/tu/cv.pdf"
```

## 📝 Notas

- Los archivos PDF se guardan en la base de datos como BYTEA
- Las imágenes de proyectos/tecnologías se guardan en `/uploads`
- Los soft deletes usan el campo `baja = 'SI'`
- El JWT expira en 7 días por defecto

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- JWT con clave secreta configurable
- Validación de tipos de archivo en uploads
- Límite de 5MB para archivos PDF
- CORS habilitado para desarrollo

## 🐛 Troubleshooting

**Error de conexión a PostgreSQL:**
```bash
# Verificar que el contenedor esté corriendo
docker ps

# Ver logs
docker logs portfolio-docker-stack-db-1
```

**Error "Token inválido":**
- Verificar que el token no haya expirado
- Asegurarse de incluir "Bearer " antes del token
- Verificar que JWT_SECRET sea el mismo

## 📄 Licencia

MIT
