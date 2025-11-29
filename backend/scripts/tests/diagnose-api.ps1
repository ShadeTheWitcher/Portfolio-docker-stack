# Script de diagnóstico para verificar la API

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  DIAGNÓSTICO DE API" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Proyectos
Write-Host "1. Probando /api/projects..." -ForegroundColor Yellow
try {
    $projects = Invoke-RestMethod -Uri "http://localhost:4000/api/projects" -Method GET
    Write-Host "✅ Respuesta recibida" -ForegroundColor Green
    Write-Host "   Cantidad de proyectos: $($projects.Count)" -ForegroundColor Gray
    if ($projects.Count -gt 0) {
        Write-Host "   Primer proyecto: $($projects[0].name_proyect)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Proyectos destacados
Write-Host "2. Probando /api/projects/destacados..." -ForegroundColor Yellow
try {
    $featured = Invoke-RestMethod -Uri "http://localhost:4000/api/projects/destacados" -Method GET
    Write-Host "✅ Respuesta recibida" -ForegroundColor Green
    Write-Host "   Cantidad de destacados: $($featured.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Info personal
Write-Host "3. Probando /api/info..." -ForegroundColor Yellow
try {
    $info = Invoke-RestMethod -Uri "http://localhost:4000/api/info" -Method GET
    Write-Host "✅ Respuesta recibida" -ForegroundColor Green
    Write-Host "   Correo: $($info.correo)" -ForegroundColor Gray
    Write-Host "   LinkedIn: $($info.link_linkedin)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Skills
Write-Host "4. Probando /api/technologies/skills..." -ForegroundColor Yellow
try {
    $skills = Invoke-RestMethod -Uri "http://localhost:4000/api/technologies/skills" -Method GET
    Write-Host "✅ Respuesta recibida" -ForegroundColor Green
    Write-Host "   Cantidad de skills: $($skills.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Educación
Write-Host "5. Probando /api/education..." -ForegroundColor Yellow
try {
    $education = Invoke-RestMethod -Uri "http://localhost:4000/api/education" -Method GET
    Write-Host "✅ Respuesta recibida" -ForegroundColor Green
    Write-Host "   Cantidad de items: $($education.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  DIAGNÓSTICO COMPLETADO" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si todos los tests pasaron, el backend funciona correctamente." -ForegroundColor Yellow
Write-Host "Si el frontend no muestra datos, verifica:" -ForegroundColor Yellow
Write-Host "  1. La consola del navegador (F12)" -ForegroundColor Gray
Write-Host "  2. Que el archivo .env tenga: REACT_APP_API_URL=http://localhost:4000/api" -ForegroundColor Gray
Write-Host "  3. Reinicia el frontend (Ctrl+C y npm start)" -ForegroundColor Gray
