# Script de pruebas para la API del Portfolio
# Ejecutar en PowerShell

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  PRUEBAS DE API - PORTFOLIO" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 1. Test de conexión
Write-Host "1. Probando conexión al backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:4000/" -Method GET
    Write-Host "✅ Backend respondiendo correctamente" -ForegroundColor Green
    Write-Host "   Endpoints disponibles:" -ForegroundColor Gray
    $response.endpoints.PSObject.Properties | ForEach-Object {
        Write-Host "   - $($_.Name): $($_.Value)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error al conectar con el backend" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit
}

Write-Host ""

# 2. Login
Write-Host "2. Probando login..." -ForegroundColor Yellow
try {
    $loginBody = @{
        usuario = "admin"
        password = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody

    $token = $loginResponse.token
    Write-Host "✅ Login exitoso" -ForegroundColor Green
    Write-Host "   Usuario: $($loginResponse.user.usuario)" -ForegroundColor Gray
    Write-Host "   Token obtenido (primeros 50 caracteres): $($token.Substring(0, [Math]::Min(50, $token.Length)))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Error en login" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 3. Obtener proyectos
Write-Host "3. Obteniendo proyectos..." -ForegroundColor Yellow
try {
    $projects = Invoke-RestMethod -Uri "http://localhost:4000/api/projects" -Method GET
    if ($projects.Count -eq 0) {
        Write-Host "⚠️  No hay proyectos en la base de datos" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Proyectos obtenidos: $($projects.Count)" -ForegroundColor Green
        $projects | ForEach-Object {
            Write-Host "   - $($_.name_proyect)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "❌ Error al obtener proyectos" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 4. Obtener información personal
Write-Host "4. Obteniendo información personal..." -ForegroundColor Yellow
try {
    $info = Invoke-RestMethod -Uri "http://localhost:4000/api/info" -Method GET
    Write-Host "✅ Información obtenida" -ForegroundColor Green
    Write-Host "   Correo: $($info.correo)" -ForegroundColor Gray
    Write-Host "   LinkedIn: $($info.link_linkedin)" -ForegroundColor Gray
    Write-Host "   Telegram: $($info.link_telegram)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error al obtener información" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 5. Obtener tecnologías
Write-Host "5. Obteniendo tecnologías..." -ForegroundColor Yellow
try {
    $techs = Invoke-RestMethod -Uri "http://localhost:4000/api/technologies" -Method GET
    if ($techs.Count -eq 0) {
        Write-Host "⚠️  No hay tecnologías en la base de datos" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Tecnologías obtenidas: $($techs.Count)" -ForegroundColor Green
        $techs | Select-Object -First 5 | ForEach-Object {
            Write-Host "   - $($_.nombre_tec)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "❌ Error al obtener tecnologías" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 6. Crear un proyecto de prueba (requiere token)
if ($token) {
    Write-Host "6. Creando proyecto de prueba..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        }
        
        $projectBody = @{
            name_proyect = "Proyecto de Prueba API"
            descripcion = "Este es un proyecto creado desde el script de pruebas"
            categoria_id = 1
            link_github = "https://github.com/test"
            destacado = "SI"
        } | ConvertTo-Json

        $newProject = Invoke-RestMethod -Uri "http://localhost:4000/api/projects" `
            -Method POST `
            -Headers $headers `
            -Body $projectBody

        Write-Host "✅ Proyecto creado exitosamente" -ForegroundColor Green
        Write-Host "   ID: $($newProject.project.id_proyect)" -ForegroundColor Gray
        Write-Host "   Nombre: $($newProject.project.name_proyect)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Error al crear proyecto" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
