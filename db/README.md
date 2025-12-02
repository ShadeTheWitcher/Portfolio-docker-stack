# 📊 Base de Datos - Portfolio

Este directorio contiene los scripts SQL para inicializar y poblar la base de datos del portfolio.

## 📁 Archivos

### `init.sql`
Script de inicialización que crea todas las tablas y estructuras necesarias:
- Tablas de catálogos (perfiles, categorías, niveles)
- Tabla de usuarios con autenticación
- Información personal y laboral
- Proyectos con soporte para imágenes y videos
- Tecnologías y skills
- Educación

### `seed_data.sql`
Datos de prueba para desarrollo y testing:
- **Información personal** completa (nombre, contacto, redes sociales)
- **4 registros de educación** (secundaria, cursos, certificaciones)
- **18 tecnologías** organizadas por categorías (Frontend, Backend, DevOps)
- **6 proyectos de ejemplo** con:
  - Descripciones detalladas
  - Imágenes de portada
  - Galería de screenshots (2-3 imágenes por proyecto)
  - Tecnologías asociadas
  - Links a GitHub y demos
  - 3 proyectos destacados


## 🚀 Uso

### Primera vez (instalación desde cero)

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd Portfolio-docker-stack
   ```

2. **Iniciar el stack con Docker**
   ```bash
   docker-compose up -d
   ```

   Los archivos `init.sql` y `seed_data.sql` se ejecutarán automáticamente en orden:
   - `01-init.sql` → Crea las tablas
   - `02-seed_data.sql` → Inserta los datos de prueba

3. **Verificar que todo funcione**
   - Frontend: http://localhost (o tu dominio configurado)
   - Backend API: http://localhost:4000
   - Base de datos: localhost:5432

4. **Credenciales de acceso**
   - Usuario: `admin`
   - Contraseña: `admin123`

### Recargar datos de prueba (sin recrear contenedores)

Si ya tienes el stack corriendo y quieres recargar los datos de prueba:

**Opción 1: Usando npm (Más fácil)**
```bash
cd backend
npm run seed
```

**Opción 2: Ejecutando el script directamente**
```bash
cd backend
node scripts/seedDatabase.js
```

**Opción 3: Manualmente con Docker**
```bash
# Encontrar el nombre del contenedor de la base de datos
docker ps

# Ejecutar el seed directamente
docker exec -i <nombre-contenedor-db> psql -U postgres -d portfolio -f /docker-entrypoint-initdb.d/02-seed_data.sql
```

### Resetear completamente la base de datos

Si necesitas empezar desde cero:

```bash
# Detener y eliminar los contenedores
docker-compose down

# Eliminar el volumen de la base de datos
docker volume rm portfolio-docker-stack_pgdata

# Volver a iniciar (se ejecutarán init.sql y seed_data.sql automáticamente)
docker-compose up -d
```

## 📝 Personalización

### Modificar datos de prueba

Edita `seed_data.sql` para cambiar:
- Información personal (nombre, email, teléfono, redes sociales)
- Proyectos de ejemplo
- Tecnologías y skills
- Educación

### Agregar más datos

Puedes agregar más proyectos, tecnologías o educación siguiendo el formato existente en `seed_data.sql`.

**Ejemplo: Agregar un nuevo proyecto**
```sql
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Mi Nuevo Proyecto',
    'Descripción del proyecto...',
    1,  -- ID de categoría
    'https://github.com/usuario/proyecto',
    'https://proyecto-demo.com',
    'https://imagen-url.com/imagen.jpg',
    'NO',
    ''
);

-- Agregar imágenes adicionales
INSERT INTO proyecto_imagenes (id_proyecto, url_imagen) VALUES
(7, 'https://imagen1.com'),  -- Asume que el proyecto tiene ID 7
(7, 'https://imagen2.com');

-- Asociar tecnologías
INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(7, 1),  -- React
(7, 8);  -- Node.js
```

## 🔍 Verificar datos insertados

Conectarse a la base de datos:
```bash
docker exec -it <nombre-contenedor-db> psql -U postgres -d portfolio
```

Consultas útiles:
```sql
-- Ver todos los proyectos
SELECT id_proyect, name_proyect, destacado FROM proyecto;

-- Ver tecnologías por categoría
SELECT t.nombre_tec, c.nombre_cat 
FROM tecnologia t 
JOIN categoria c ON t.categoria_id = c.id_cat;

-- Ver proyectos con sus tecnologías
SELECT p.name_proyect, t.nombre_tec 
FROM proyecto p
JOIN proyecto_tecnologia pt ON p.id_proyect = pt.id_proyecto
JOIN tecnologia t ON pt.id_tecnologia = t.id;

-- Contar registros
SELECT 'Proyectos' as tipo, COUNT(*) as total FROM proyecto
UNION ALL
SELECT 'Tecnologías', COUNT(*) FROM tecnologia
UNION ALL
SELECT 'Educación', COUNT(*) FROM educacion;
```

## 🎨 Imágenes de ejemplo

Los datos de prueba usan imágenes de Unsplash para demostración. En producción, deberías:
1. Subir tus propias imágenes usando el panel de administración
2. O reemplazar las URLs en `seed_data.sql` con tus propias imágenes

## 🔐 Seguridad

**IMPORTANTE**: Los datos de prueba incluyen un usuario admin con contraseña por defecto (`admin123`).

**En producción, SIEMPRE**:
1. Cambia la contraseña del admin inmediatamente
2. Usa contraseñas seguras
3. Configura variables de entorno para credenciales de base de datos
4. No commitees archivos `.env` con credenciales reales

## 📚 Estructura de datos

### Proyectos destacados
Los proyectos con `destacado = 'SI'` aparecen en la página principal del portfolio.

### Tecnologías como skills
Las tecnologías con `es_skill = 'SI'` aparecen en la sección de habilidades.

### Categorías y niveles
- **Categorías**: Frontend, Backend, Base de Datos, DevOps, etc.
- **Niveles**: Básico (1), Intermedio (2), Avanzado (3)

## 🆘 Troubleshooting

### Los datos no se cargan automáticamente
- Verifica que los archivos estén en `./db/`
- Asegúrate de que el volumen `pgdata` esté limpio (elimínalo y recrea)
- Revisa los logs: `docker-compose logs db`

### Error de conexión a la base de datos
- Espera unos segundos después de `docker-compose up` (PostgreSQL tarda en iniciar)
- Verifica que el puerto 5432 no esté en uso

### Datos duplicados
- El script `seed_data.sql` hace `TRUNCATE` de las tablas antes de insertar
- Si tienes datos que quieres conservar, coméntalos antes de ejecutar el seed
