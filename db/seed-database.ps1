# Script para insertar datos de ejemplo en PostgreSQL (VM)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  INSERTANDO DATOS DE EJEMPLO" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Configuración de conexión
$DB_HOST = "192.168.1.13"
$DB_PORT = "5432"
$DB_NAME = "portfolio"
$DB_USER = "postgres"
$DB_PASSWORD = "example"

Write-Host "Conectando a PostgreSQL en $DB_HOST..." -ForegroundColor Yellow

# Leer el archivo SQL
$sqlContent = Get-Content "db/seed_data.sql" -Raw

# Ejecutar usando psql (requiere tener psql instalado o usar docker)
# Opción 1: Si tienes psql instalado localmente
# $env:PGPASSWORD = $DB_PASSWORD
# psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f db/seed_data.sql

# Opción 2: Usar PowerShell para ejecutar las queries
Write-Host "Insertando datos..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Por favor ejecuta manualmente:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Conéctate a tu VM donde corre Docker" -ForegroundColor Cyan
Write-Host "2. Ejecuta:" -ForegroundColor Cyan
Write-Host "   docker exec -i portfolio-docker-stack-db-1 psql -U postgres -d portfolio < db/seed_data.sql" -ForegroundColor Green
Write-Host ""
Write-Host "O desde PowerShell con psql instalado:" -ForegroundColor Cyan
Write-Host "   `$env:PGPASSWORD='example'; psql -h 192.168.1.13 -p 5432 -U postgres -d portfolio -f db/seed_data.sql" -ForegroundColor Green
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
