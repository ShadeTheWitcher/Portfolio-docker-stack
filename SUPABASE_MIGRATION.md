# Guía de Migración a Supabase

Esta guía te ayudará a migrar tu base de datos PostgreSQL y Storage a Supabase.

## Fase 1: Configurar Base de Datos en Supabase

### Paso 1: Ejecutar el Schema SQL

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. En el menú lateral, haz clic en **SQL Editor**
3. Haz clic en **New Query**
4. Copia todo el contenido del archivo [`db/supabase-schema.sql`](file:///e:/bibliotecas/Documents/GitHub/Docker/Portfolio-docker-stack/db/supabase-schema.sql)
5. Pégalo en el editor SQL
6. Haz clic en **Run** (o presiona Ctrl+Enter)

> [!NOTE]
> El script creará todas las tablas, insertará datos iniciales y configurará las políticas de seguridad RLS.

### Paso 2: Verificar las Tablas

1. En el menú lateral, haz clic en **Table Editor**
2. Deberías ver todas estas tablas:
   - `categoriatec`
   - `nivel_tecnologia`
   - `tipo_proyecto`
   - `tipo_usuario`
   - `usuario`
   - `info_laboral`
   - `educacion`
   - `tecnologia`
   - `proyecto`
   - `proyecto_imagenes`
   - `proyecto_tecnologia`
   - `screenshot`
   - `proyecto_screenshot`

### Paso 3: Obtener la URL de Conexión

1. En el menú lateral, haz clic en **Project Settings** (⚙️)
2. Haz clic en **Database**
3. En la sección **Connection string**, selecciona **URI**
4. Copia la URI de conexión (debería verse así):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Reemplaza `[YOUR-PASSWORD]` con tu contraseña de base de datos

> [!IMPORTANT]
> Usa la **Connection pooling** URI (puerto 6543) en lugar de la directa (puerto 5432) para mejor rendimiento.

### Paso 4: Configurar Variables de Entorno

Edita tu archivo `.env` en la raíz del proyecto:

```bash
# Comenta las variables de Docker local:
# POSTGRES_DB=portfolio
# POSTGRES_USER=postgres
# POSTGRES_PASSWORD=example

# Agrega la URL de Supabase:
DATABASE_URL=postgresql://postgres.xxxxx:YOUR-PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Paso 5: Probar la Conexión

1. Reinicia tu backend:
   ```bash
   docker-compose restart backend
   ```

2. Revisa los logs:
   ```bash
   docker-compose logs backend
   ```

3. Deberías ver:
   ```
   ✅ Conectado a PostgreSQL (Supabase)
   ```

## Fase 2: Configurar Supabase Storage (Próximo paso)

Una vez que la base de datos esté funcionando, procederemos con la migración del storage.

### Preparación

1. En Supabase Dashboard, ve a **Storage**
2. Crea dos buckets:
   - **Nombre**: `imagenes` → **Public**: ✅ Sí
   - **Nombre**: `documentos` → **Public**: ✅ Sí

> [!NOTE]
> Los buckets públicos permiten acceso directo a las URLs de los archivos sin autenticación.

## Migración de Datos Existentes (Opcional)

Si tienes datos en tu base de datos local que quieres migrar:

### Exportar desde PostgreSQL Local

```bash
# Conectarse al contenedor de PostgreSQL
docker exec -it portfolio-docker-stack-db-1 bash

# Exportar datos (dentro del contenedor)
pg_dump -U postgres -d portfolio --data-only --inserts > /tmp/data.sql

# Salir del contenedor
exit

# Copiar el archivo al host
docker cp portfolio-docker-stack-db-1:/tmp/data.sql ./db/exported-data.sql
```

### Importar a Supabase

1. Abre el archivo `db/exported-data.sql`
2. Copia el contenido
3. En Supabase SQL Editor, pega y ejecuta

## Rollback (Volver a PostgreSQL Local)

Si necesitas volver a la base de datos local:

1. Edita `.env`:
   ```bash
   # Comenta la URL de Supabase:
   # DATABASE_URL=postgresql://postgres.xxxxx:...
   
   # Descomenta las variables locales:
   POSTGRES_DB=portfolio
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=example
   ```

2. Reinicia el backend:
   ```bash
   docker-compose restart backend
   ```

## Troubleshooting

### Error: "password authentication failed"
- Verifica que la contraseña en `DATABASE_URL` sea correcta
- Resetea la contraseña en: Project Settings → Database → Reset Database Password

### Error: "SSL connection required"
- El código ya incluye la configuración SSL necesaria en `backend/config/db.js`

### Error: "relation does not exist"
- Verifica que ejecutaste el schema SQL completo en Supabase
- Revisa en Table Editor que las tablas existen

### No se conecta a Supabase
- Verifica que `DATABASE_URL` esté configurada en `.env`
- Verifica que no haya espacios extra en la URL
- Usa la URI de **Connection pooling** (puerto 6543)
