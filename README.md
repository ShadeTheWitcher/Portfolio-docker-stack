# 📘 Portfolio Full Stack con Docker

Este proyecto contiene un **portfolio completo** con **frontend en React**, **backend en Node.js/Express** y **base de datos PostgreSQL**, todo orquestado con **Docker Compose** y **Traefik** como reverse proxy.

> [!NOTE]
> **Supabase Storage es opcional.** El proyecto puede funcionar completamente en modo local usando el sistema de archivos del contenedor. Supabase solo es necesario si deseas almacenamiento en la nube para producción.

---

## 🚀 Requisitos

Asegúrate de tener instalado:

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)
- **Cuenta de Supabase** (opcional, solo para almacenamiento en la nube)

---

## 📦 Estructura del Proyecto

```
Portfolio-docker-stack/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── scripts/
│   │   └── exportData.js
│   └── uploads/              # Volumen persistente para archivos locales
│
├── frontend/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── utils/
│   │   │   └── urlUtils.js   # Utilidades para normalizar URLs
│   │   └── App.jsx
│   └── public/
│
├── db/
│   ├── init.sql              # Schema de la base de datos
│   ├── seed_data.sql         # Datos iniciales
│   └── fix_malformed_urls.sql # Scripts de mantenimiento
│
├── .github/
│   └── workflows/
│       └── keepalive.yml     # GitHub Actions para mantener activo el servicio
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔐 ¿Qué es Traefik y para qué sirve?

**Traefik** es un **reverse proxy** moderno que se usa en el modo de servidor propio (`docker-compose.yml`).

### ¿Qué hace Traefik?

1. **🔒 SSL/HTTPS Automático**
   - Genera certificados SSL gratuitos con **Let's Encrypt**
   - Renueva los certificados automáticamente antes de que expiren
   - Tu sitio tendrá el candado verde 🔒 sin configuración manual

2. **🔀 Reverse Proxy (Enrutamiento)**
   - Dirige el tráfico al servicio correcto según el dominio
   - Ejemplo: `tudominio.com` → frontend, `api.tudominio.com` → backend
   - Todo en el mismo servidor, puertos 80 y 443

3. **🚀 Sin Configuración Manual de Nginx/Apache**
   - No necesitas configurar manualmente servidores web
   - Traefik detecta automáticamente los contenedores Docker
   - Se configura con etiquetas en `docker-compose.yml`

### ¿Cuándo necesitas Traefik?

| Escenario | ¿Necesitas Traefik? |
|-----------|---------------------|
| Desarrollo local | ❌ No (usa `docker-compose.local.yml`) |
| Plataformas cloud (Render, Railway) | ❌ No (la plataforma lo maneja) |
| Servidor propio (VPS) | ✅ **Sí** (usa `docker-compose.yml`) |

### Ejemplo Visual

**Sin Traefik (desarrollo local):**
```
Usuario → http://localhost:3000 → Frontend
Usuario → http://localhost:4000 → Backend
```

**Con Traefik (servidor propio):**
```
Usuario → https://tudominio.com → Traefik → Frontend
Usuario → https://api.tudominio.com → Traefik → Backend
         ↑ SSL automático
```

> [!TIP]
> Si despliegas en **Render, Railway, Fly.io, etc.**, ellos ya tienen su propio sistema similar a Traefik integrado, por eso no lo necesitas.

---

## 🎯 Modos de Uso

Este proyecto puede funcionar en **tres modalidades** según dónde lo despliegues:

### 🏠 Modo 1: Desarrollo Local

**Ideal para:** Desarrollo local, pruebas, entornos sin conexión a internet

- ✅ Archivos almacenados en el volumen Docker `./backend/uploads`
- ✅ No requiere configuración de Supabase
- ✅ Funciona completamente offline
- ✅ Sin Traefik, sin SSL, más simple y rápido
- ⚠️ Los archivos se pierden si eliminas el volumen con `docker compose down -v`

**Archivo de configuración:** `docker-compose.local.yml`

**Configuración mínima requerida:**
```env
# Solo necesitas estas variables en .env
POSTGRES_DB=portfolio
POSTGRES_USER=postgres
POSTGRES_PASSWORD=example
JWT_SECRET=tu_clave_secreta
```

**Inicio rápido:**
```sh
# 1. Copia el archivo de ejemplo
cp .env.local.example .env

# 2. Levanta los contenedores
docker compose -f docker-compose.local.yml up --build -d

# 3. Accede a la aplicación
# Frontend: http://localhost:3000
# Backend: http://localhost:4000/api
```

---

### ☁️ Modo 2: Plataformas Cloud Gratuitas (Render, Railway, Heroku, etc.)

**Ideal para:** Despliegue rápido sin servidor propio, proyectos personales, demos

> [!TIP]
> **En plataformas cloud NO necesitas docker-compose ni Traefik.** Estas plataformas usan solo los `Dockerfile` de cada servicio y se encargan del routing, SSL y networking automáticamente.

**Características:**
- ✅ **Solo necesitas los Dockerfiles** (ya incluidos en `/frontend` y `/backend`)
- ✅ SSL/HTTPS automático (la plataforma lo maneja)
- ✅ Base de datos PostgreSQL incluida (o usa Supabase)
- ✅ Variables de entorno configurables desde el panel
- ✅ Despliegue con Git (push automático)
- ✅ **Gratis** (con limitaciones según la plataforma)

**Plataformas recomendadas:**
- [Render](https://render.com) - Gratis con 750h/mes
- [Railway](https://railway.app) - $5 gratis/mes
- [Fly.io](https://fly.io) - Gratis hasta 3 VMs
- [Heroku](https://heroku.com) - Eco Dynos desde $5/mes

**Variables de entorno necesarias:**
```env
# Base de datos (proporcionada por la plataforma o Supabase)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Backend
PORT=4000
NODE_ENV=production
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d

# Supabase (opcional, recomendado para archivos)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-key
SUPABASE_IMAGES_BUCKET=imagenes
SUPABASE_DOCUMENTS_BUCKET=documentos
```

**Ejemplo de despliegue en Render:**
1. Conecta tu repositorio de GitHub
2. Crea 3 servicios:
   - **Frontend**: Web Service → Dockerfile en `./frontend`
   - **Backend**: Web Service → Dockerfile en `./backend`
   - **Database**: PostgreSQL (o usa Supabase)
3. Configura las variables de entorno en cada servicio
4. ¡Deploy automático! 🚀

---

### 🖥️ Modo 3: Servidor Propio (VPS, Dedicado)

**Ideal para:** Producción profesional, control total, múltiples proyectos

> [!NOTE]
> **Solo en esta modalidad necesitas docker-compose y Traefik.** Si tienes tu propio servidor (VPS, dedicado, etc.), esta configuración te da control total con SSL automático.

**Características:**
- ✅ Archivos almacenados en Supabase Storage (persistentes)
- ✅ CDN global para mejor rendimiento
- ✅ Backups automáticos
- ✅ Escalable y confiable
- ✅ **Traefik con SSL automático** (Let's Encrypt)
- ✅ Control total del servidor
- ⚠️ Requiere servidor propio (DigitalOcean, Linode, AWS EC2, etc.)

**Archivo de configuración:** `docker-compose.yml`

**Configuración completa requerida:**
```env
# Además de las variables básicas, necesitas:
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-key
SUPABASE_IMAGES_BUCKET=imagenes
SUPABASE_DOCUMENTS_BUCKET=documentos
FRONTEND_DOMAIN=tu-dominio.com
BACKEND_DOMAIN=api.tu-dominio.com
ACME_EMAIL=tu-email@example.com
```

**Inicio:**
```sh
# 1. Copia y configura el archivo .env
cp .env.example .env
# Edita .env con tus credenciales

# 2. Levanta los contenedores
docker compose up --build -d

# 3. Accede a la aplicación
# Frontend: https://tu-dominio.com
# Backend: https://api.tu-dominio.com/api
```

---

### 📊 Comparación de Modalidades

| Aspecto | Desarrollo Local | Cloud Gratuito | Servidor Propio |
|---------|------------------|----------------|-----------------|
| **Archivos necesarios** | docker-compose.local.yml | Solo Dockerfiles | docker-compose.yml |
| **Traefik** | ❌ No | ❌ No (la plataforma lo maneja) | ✅ Sí |
| **SSL/HTTPS** | ❌ No | ✅ Automático | ✅ Let's Encrypt |
| **Costo** | 💰 Gratis | 💰 Gratis (con límites) | 💰💰 $5-20/mes |
| **Complejidad** | 🟢 Baja | 🟢 Baja | 🟡 Media |
| **Control** | ⭐⭐⭐ Total local | ⭐ Limitado | ⭐⭐⭐ Total |
| **Escalabilidad** | ❌ No | ⚠️ Limitada | ✅ Total |
| **Mejor para** | Desarrollo | Proyectos personales | Producción profesional |


---

## 🔧 Configuración de Variables de Entorno

### **1️⃣ Crear archivo `.env`**

Copia el archivo de ejemplo y configúralo según tu entorno:

```sh
cp .env.example .env
```

### **2️⃣ Variables Principales**

#### **🌐 Configuración de Dominios**

```env
# Para desarrollo local (por defecto):
FRONTEND_DOMAIN=localhost
BACKEND_DOMAIN=localhost

# Para producción:
FRONTEND_DOMAIN=shade125.ddns.net
BACKEND_DOMAIN=api.shade125.ddns.net
```

#### **🗄️ Configuración de Base de Datos**

```env
# PostgreSQL Local (Docker)
POSTGRES_DB=portfolio
POSTGRES_USER=postgres
POSTGRES_PASSWORD=example

# O usar Supabase PostgreSQL (descomentar si usas Supabase DB):
# DATABASE_URL=postgresql://postgres.xxxxx:PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### **☁️ Configuración de Supabase Storage** (Opcional)

> [!TIP]
> **Esta sección es opcional.** Solo configura Supabase si quieres usar almacenamiento en la nube. Para desarrollo local, puedes omitir estas variables.

```env
SUPABASE_URL=https://btnilyrlviaptbsyfwmh.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_KEY=tu-service-role-key-aqui
SUPABASE_IMAGES_BUCKET=imagenes
SUPABASE_DOCUMENTS_BUCKET=documentos
```

> [!IMPORTANT]
> **Para obtener tus credenciales de Supabase:**
> 1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
> 2. Settings → API
> 3. Copia `Project URL` y `anon/public key`
> 4. Copia `service_role key` (¡mantenlo seguro!)
>
> **Si no configuras Supabase:** El backend usará automáticamente el almacenamiento local en `./backend/uploads`

#### **🔐 Configuración de JWT**

```env
JWT_SECRET=tu_clave_secreta_super_segura_cambiame_en_produccion_2024
JWT_EXPIRES_IN=7d
```

#### **⚙️ Configuración del Backend**

```env
PORT=4000
NODE_ENV=development  # Cambiar a 'production' en producción
```

#### **📧 Configuración de Traefik (SSL)**

```env
ACME_EMAIL=tu-email@example.com  # Para certificados SSL de Let's Encrypt
```

---

## ▶️ Cómo Ejecutar el Proyecto

Hay **dos formas** de ejecutar el proyecto según tus necesidades:

### 🏠 **Opción 1: Desarrollo Local** (Recomendado para empezar)

Usa `docker-compose.local.yml` para un setup simple sin Traefik ni Supabase.

```sh
# 1. Clonar el repositorio
git clone https://github.com/ShadeTheWitcher/Portfolio-docker-stack.git
cd Portfolio-docker-stack

# 2. Configurar variables de entorno
cp .env.local.example .env
# Opcional: edita .env si quieres cambiar las credenciales por defecto

# 3. Construir y levantar los contenedores
docker compose -f docker-compose.local.yml up --build -d

# 4. Ver logs (opcional)
docker compose -f docker-compose.local.yml logs -f

# 5. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend: http://localhost:4000/api
```

### ☁️ **Opción 2: Producción con Traefik y SSL**

Usa `docker-compose.yml` para producción con Traefik, SSL automático y opcionalmente Supabase.

```sh
# 1. Clonar el repositorio
git clone https://github.com/ShadeTheWitcher/Portfolio-docker-stack.git
cd Portfolio-docker-stack

# 2. Configurar variables de entorno
cp .env.example .env
# IMPORTANTE: Edita .env con tus dominios, credenciales de Supabase, etc.

# 3. Construir y levantar los contenedores
docker compose up --build -d

# 4. Ver logs (opcional)
docker compose logs -f

# 5. Acceder a la aplicación
# Frontend: https://tu-dominio.com
# Backend: https://api.tu-dominio.com/api
```

### 📊 Comparación de Opciones

| Característica | Desarrollo Local | Producción |
|----------------|------------------|------------|
| Archivo | `docker-compose.local.yml` | `docker-compose.yml` |
| Traefik/SSL | ❌ No | ✅ Sí (Let's Encrypt) |
| Supabase | ⚠️ Opcional | ⚠️ Opcional |
| Puertos | 3000 (frontend), 4000 (backend) | 80, 443 |
| Complejidad | 🟢 Baja | 🟡 Media |
| Uso | Desarrollo, pruebas | Producción, staging |

---

## 📋 Servicios Levantados

Independientemente de la opción que elijas, se levantan estos servicios:


---

## 🔄 Actualizar Configuración sin Rebuild

### Cambiar URL del API (Frontend)

```sh
# 1. Edita REACT_APP_API_URL en docker-compose.yml o .env
# 2. Recrea solo el contenedor del frontend:
docker compose up -d --force-recreate frontend
```

### Cambiar variables del Backend

```sh
# 1. Edita las variables en .env
# 2. Recrea el contenedor del backend:
docker compose up -d --force-recreate backend
```

---

## 🗄️ Gestión de Base de Datos

### Acceder a PostgreSQL

```sh
docker exec -it portfolio-docker-stack-db-1 psql -U postgres -d portfolio
```

### Ejecutar scripts SQL

```sh
# Desde el host
docker exec -i portfolio-docker-stack-db-1 psql -U postgres -d portfolio < db/fix_malformed_urls.sql

# Desde dentro del contenedor
docker exec -it portfolio-docker-stack-db-1 sh
psql -U postgres -d portfolio -f /docker-entrypoint-initdb.d/01-init.sql
```

### Exportar datos

```sh
# Usar el script de exportación
docker exec -it portfolio-docker-stack-backend-1 node scripts/exportData.js

# Backup manual de PostgreSQL
docker exec portfolio-docker-stack-db-1 pg_dump -U postgres portfolio > backup.sql
```

---

## ☁️ Supabase Storage (Opcional)

> [!NOTE]
> **Esta sección es completamente opcional.** Solo necesitas configurar Supabase Storage si vas a desplegar en producción y quieres almacenamiento en la nube. Para desarrollo local, el proyecto usa automáticamente `./backend/uploads`.

Este proyecto **puede usar** **Supabase Storage** para almacenar:
- **Imágenes** de proyectos (bucket: `imagenes`)
- **Documentos** como CVs y certificados (bucket: `documentos`)

### Configurar Buckets en Supabase

**Solo si decidiste usar Supabase Storage:**

1. Ve a **Storage** en tu dashboard de Supabase
2. Crea dos buckets:
   - `imagenes` (público)
   - `documentos` (público)
3. Configura las políticas de acceso público:

```sql
-- Permitir lectura pública
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'imagenes');

CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'documentos');
```

### Utilidad de Normalización de URLs

El proyecto incluye `urlUtils.js` que normaliza automáticamente las URLs de archivos, **funcionando tanto con Supabase como con almacenamiento local**:

```javascript
import { normalizeFileUrl } from './utils/urlUtils';

// Uso en componentes - funciona con ambos modos
const imageUrl = normalizeFileUrl(project.image_url);
const cvUrl = normalizeFileUrl(userData.cv_url);
```


---

## 🧹 Comandos Útiles

> [!TIP]
> Si usas `docker-compose.local.yml`, agrega `-f docker-compose.local.yml` a todos los comandos.
> Ejemplo: `docker compose -f docker-compose.local.yml down`

### Detener contenedores

```sh
# Desarrollo local
docker compose -f docker-compose.local.yml down

# Producción
docker compose down
```

### Detener y eliminar volúmenes (⚠️ borra datos)

```sh
# Desarrollo local
docker compose -f docker-compose.local.yml down -v

# Producción
docker compose down -v
```

### Reconstruir desde cero

```sh
# Desarrollo local
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml build --no-cache
docker compose -f docker-compose.local.yml up -d

# Producción
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

### Entrar a contenedores

```sh
# Frontend
docker exec -it portfolio-docker-stack-frontend-1 sh

# Backend
docker exec -it portfolio-docker-stack-backend-1 sh

# Base de datos
docker exec -it portfolio-docker-stack-db-1 sh
```

### Ver uso de recursos

```sh
docker stats
```

### Reiniciar un servicio específico

```sh
# Desarrollo local
docker compose -f docker-compose.local.yml restart frontend
docker compose -f docker-compose.local.yml restart backend

# Producción
docker compose restart frontend
docker compose restart backend
```

---

## 🔒 Seguridad en Producción

> [!WARNING]
> **Antes de desplegar en producción:**

1. **Cambia todas las contraseñas y secrets:**
   - `POSTGRES_PASSWORD`
   - `JWT_SECRET`
   - Credenciales de Supabase

2. **Configura HTTPS:**
   - Traefik genera certificados SSL automáticamente
   - Asegúrate de que `ACME_EMAIL` esté configurado

3. **Variables de entorno:**
   - Cambia `NODE_ENV=production`
   - Usa `REACT_APP_API_URL` con HTTPS

4. **Firewall:**
   - Cierra puertos innecesarios
   - Solo expón 80 y 443

---

## 🐛 Troubleshooting

### Frontend no se conecta al backend

```sh
# Verifica la configuración de REACT_APP_API_URL
docker compose logs frontend | grep "API URL"

# Recrea el frontend
docker compose up -d --force-recreate frontend
```

### Errores de CORS

Verifica que el backend tenga configurado correctamente el dominio del frontend en `src/index.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost'
}));
```

### Problemas con Supabase Storage

```sh
# Verifica las credenciales
docker compose exec backend node -e "console.log(process.env.SUPABASE_URL)"

# Revisa los logs del backend
docker compose logs backend | grep -i supabase
```

### Base de datos no inicia

```sh
# Verifica el volumen
docker volume inspect portfolio-docker-stack_pgdata

# Elimina y recrea (⚠️ borra datos)
docker compose down -v
docker compose up -d db
```

---

## 📚 Recursos Adicionales

- [Documentación de Docker Compose](https://docs.docker.com/compose/)
- [Documentación de Traefik](https://doc.traefik.io/traefik/)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

---

## 📝 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo y modificarlo según tus necesidades.

---

## 👤 Autor

**ShadeTheWitcher**
- GitHub: [@ShadeTheWitcher](https://github.com/ShadeTheWitcher)
- Email: shadethewitcher@gmail.com
