# 🐳 Guía de Despliegue Docker

Este proyecto puede desplegarse de **tres formas diferentes** según tus necesidades y recursos:

---

## 🎯 Tres Opciones de Despliegue

### 1. 🏠 Desarrollo Local
**Usa:** `docker-compose.local.yml`  
**Ideal para:** Desarrollo, pruebas, aprendizaje

### 2. ☁️ Plataformas Cloud Gratuitas
**Usa:** Solo los `Dockerfile` (sin docker-compose)  
**Ideal para:** Proyectos personales, demos, portafolios

### 3. 🖥️ Servidor Propio
**Usa:** `docker-compose.yml` con Traefik  
**Ideal para:** Producción profesional, control total

---

## � ¿Qué es Traefik?

**Traefik** es un **reverse proxy moderno** que solo se usa en la **Opción 3** (Servidor Propio).

### ¿Para qué sirve?

**1. SSL/HTTPS Automático 🔒**
- Genera certificados SSL **gratis** con Let's Encrypt
- Los renueva automáticamente (cada 90 días)
- Tu sitio tendrá `https://` con el candado verde sin configuración manual

**2. Enrutamiento Inteligente 🔀**
- Dirige el tráfico según el dominio:
  - `tudominio.com` → Frontend
  - `api.tudominio.com` → Backend
- Todo en un solo servidor, puertos 80 y 443

**3. Configuración Automática 🚀**
- Detecta automáticamente los contenedores Docker
- No necesitas configurar Nginx o Apache manualmente
- Se configura con etiquetas en `docker-compose.yml`

### ¿Cuándo NO necesitas Traefik?

- ❌ **Desarrollo Local** → Usa puertos directos (3000, 4000)
- ❌ **Plataformas Cloud** (Render, Railway, etc.) → Ellas tienen su propio sistema

### ¿Cuándo SÍ necesitas Traefik?

- ✅ **Servidor Propio** (VPS, Dedicado) → Para SSL automático y routing

---

## �📁 Opción 1: Desarrollo Local

### `docker-compose.local.yml`

**Cuándo usarlo:**
- ✅ Desarrollo local en tu máquina
- ✅ Pruebas rápidas
- ✅ No tienes un dominio configurado
- ✅ No necesitas SSL/HTTPS
- ✅ Quieres algo simple y rápido

**Características:**
- Sin Traefik (reverse proxy)
- Sin SSL automático
- Puertos directos: 3000 (frontend), 4000 (backend)
- Almacenamiento local por defecto
- Configuración mínima requerida

**Comando:**
```bash
docker compose -f docker-compose.local.yml up -d
```

**URLs de acceso:**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api

---

## ☁️ Opción 2: Plataformas Cloud Gratuitas

### Solo Dockerfiles (SIN docker-compose)

> [!IMPORTANT]
> **En plataformas cloud NO necesitas docker-compose ni Traefik.** Las plataformas como Render, Railway, Fly.io, etc., usan directamente los `Dockerfile` de cada servicio y manejan automáticamente el routing, SSL, y networking.

**Cuándo usarlo:**
- ✅ Quieres desplegar gratis o muy barato
- ✅ No tienes servidor propio
- ✅ Quieres deploy automático con Git
- ✅ Necesitas SSL pero sin configurarlo manualmente
- ✅ Proyecto personal o demo

**Plataformas recomendadas:**
- **[Render](https://render.com)** - 750h gratis/mes, muy fácil de usar
- **[Railway](https://railway.app)** - $5 gratis/mes, excelente DX
- **[Fly.io](https://fly.io)** - Gratis hasta 3 VMs pequeñas
- **[Heroku](https://heroku.com)** - Eco Dynos desde $5/mes

**Archivos que usa la plataforma:**
- `frontend/Dockerfile` → Para el servicio de frontend
- `backend/Dockerfile` → Para el servicio de backend
- Variables de entorno → Configuradas en el panel de la plataforma

**Ejemplo: Desplegar en Render**

1. **Conecta tu repositorio de GitHub a Render**

2. **Crea el servicio de Backend:**
   - New → Web Service
   - Conecta tu repo
   - Root Directory: `backend`
   - Build Command: (automático con Dockerfile)
   - Start Command: (automático con Dockerfile)
   - Variables de entorno:
     ```
     DATABASE_URL=<URL de PostgreSQL de Render o Supabase>
     PORT=4000
     NODE_ENV=production
     JWT_SECRET=tu_secreto_aqui
     SUPABASE_URL=https://tu-proyecto.supabase.co
     SUPABASE_ANON_KEY=tu_anon_key
     SUPABASE_SERVICE_KEY=tu_service_key
     SUPABASE_IMAGES_BUCKET=imagenes
     SUPABASE_DOCUMENTS_BUCKET=documentos
     ```

3. **Crea el servicio de Frontend:**
   - New → Web Service
   - Conecta tu repo
   - Root Directory: `frontend`
   - Build Command: (automático con Dockerfile)
   - Start Command: (automático con Dockerfile)
   - Variables de entorno:
     ```
     REACT_APP_API_URL=https://tu-backend.onrender.com/api
     ```

4. **Crea la base de datos (opcional):**
   - New → PostgreSQL
   - Copia la URL interna y úsala en `DATABASE_URL` del backend
   - O usa Supabase PostgreSQL directamente

**URLs de acceso:**
- Frontend: https://tu-frontend.onrender.com
- Backend: https://tu-backend.onrender.com/api

**Ventajas:**
- ✅ SSL/HTTPS automático
- ✅ Deploy automático con cada push a Git
- ✅ Gratis o muy barato
- ✅ No necesitas servidor propio
- ✅ Cero configuración de infraestructura

**Desventajas:**
- ⚠️ Servicios gratuitos pueden "dormir" después de inactividad
- ⚠️ Recursos limitados en planes gratuitos
- ⚠️ Menos control sobre la infraestructura

---

## 🖥️ Opción 3: Servidor Propio (VPS)

### `docker-compose.yml` con Traefik

**Cuándo usarlo:**
- ✅ Tienes un VPS (DigitalOcean, Linode, AWS EC2, etc.)
- ✅ Quieres control total
- ✅ Necesitas múltiples proyectos en el mismo servidor
- ✅ Producción profesional
- ✅ Escalabilidad y rendimiento

**Características:**
- Con Traefik (reverse proxy)
- SSL automático con Let's Encrypt
- Puertos estándar: 80, 443
- Soporte para Supabase Storage
- Configuración completa
- Control total del servidor

**Comando:**
```bash
docker compose up -d
```

**URLs de acceso:**
- Frontend: https://tu-dominio.com
- Backend: https://api.tu-dominio.com/api

**Requisitos:**
- Servidor VPS con Docker instalado
- Dominio propio apuntando al servidor
- Configuración de DNS (A records)

**Ventajas:**
- ✅ Control total
- ✅ Sin límites de recursos (según tu VPS)
- ✅ Múltiples proyectos en un servidor
- ✅ SSL automático con Let's Encrypt
- ✅ Mejor rendimiento

**Desventajas:**
- ⚠️ Costo mensual del VPS ($5-20/mes)
- ⚠️ Requiere conocimientos de administración de servidores
- ⚠️ Debes mantener y actualizar el servidor

---

## 📊 Comparación Completa

| Aspecto | Desarrollo Local | Cloud Gratuito | Servidor Propio |
|---------|------------------|----------------|-----------------|
| **Archivo** | `docker-compose.local.yml` | Solo `Dockerfile` | `docker-compose.yml` |
| **Traefik** | ❌ No | ❌ No (plataforma lo maneja) | ✅ Sí |
| **SSL/HTTPS** | ❌ No | ✅ Automático | ✅ Let's Encrypt |
| **Puertos** | 3000, 4000 | Asignados por plataforma | 80, 443 |
| **Dominio** | No necesario | Subdominio gratis | Tu dominio |
| **Costo** | 💰 Gratis | 💰 Gratis (con límites) | 💰💰 $5-20/mes |
| **Complejidad** | 🟢 Baja | 🟢 Baja | 🟡 Media |
| **Control** | ⭐⭐⭐ Total local | ⭐ Limitado | ⭐⭐⭐ Total |
| **Escalabilidad** | ❌ No | ⚠️ Limitada | ✅ Total |
| **Mejor para** | Desarrollo | Proyectos personales | Producción |

---

## 💡 Recomendaciones

### Para Principiantes:
1. **Empieza con Local** → `docker-compose.local.yml`
2. **Luego prueba Cloud** → Render o Railway (gratis)
3. **Finalmente VPS** → Cuando necesites más control

### Para Proyectos Personales:
- 🎯 **Render o Railway** son perfectos
- Gratis o muy barato
- SSL automático
- Deploy con Git

### Para Producción Profesional:
- 🎯 **Servidor Propio** con `docker-compose.yml`
- Control total
- Mejor rendimiento
- Escalable

---

## 🆘 Ayuda Rápida

**¿Cuál debo usar?**
- 👨‍💻 Desarrollando localmente → `docker-compose.local.yml`
- 🎨 Portfolio/Demo personal → **Render/Railway** (solo Dockerfiles)
- 🚀 Producción profesional → `docker-compose.yml` en VPS

**¿Necesito docker-compose?**
- ✅ Sí, para desarrollo local
- ❌ No, para plataformas cloud (Render, Railway, etc.)
- ✅ Sí, para servidor propio (VPS)

**¿Necesito Traefik?**
- ❌ No, para desarrollo local
- ❌ No, para plataformas cloud (ellas manejan el routing)
- ✅ Sí, para servidor propio (maneja SSL y routing)

**¿Comparten datos entre opciones?**
- ⚠️ No, cada opción usa su propia base de datos
- Usa Supabase PostgreSQL si quieres compartir datos entre entornos
