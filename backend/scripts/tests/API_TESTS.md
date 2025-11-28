# Test API Endpoints

## 1. Test de Conexión
```bash
curl http://localhost:4000/
```

## 2. Test Health Check
```bash
curl http://localhost:4000/health
```

## 3. Inicializar Contraseña del Admin
```bash
node scripts/updateAdminPassword.js
```

## 4. Login (obtener token)
```bash
curl -X POST http://localhost:4000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"usuario\":\"admin\",\"password\":\"admin123\"}"
```

**Guarda el token que te devuelve para los siguientes pasos**

## 5. Obtener Proyectos (público)
```bash
curl http://localhost:4000/api/projects
```

## 6. Obtener Información Personal (público)
```bash
curl http://localhost:4000/api/info
```

## 7. Obtener Tecnologías (público)
```bash
curl http://localhost:4000/api/technologies
```

## 8. Obtener Educación (público)
```bash
curl http://localhost:4000/api/education
```

## 9. Crear Proyecto (requiere token)
```bash
curl -X POST http://localhost:4000/api/projects ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer TU_TOKEN_AQUI" ^
  -d "{\"name_proyect\":\"Test Project\",\"descripcion\":\"Proyecto de prueba\",\"categoria_id\":1,\"destacado\":\"SI\"}"
```

## 10. Actualizar Información Personal (requiere token)
```bash
curl -X PUT http://localhost:4000/api/info ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer TU_TOKEN_AQUI" ^
  -d "{\"sobre_mi\":\"Texto actualizado\",\"correo\":\"test@test.com\"}"
```

---

## Pruebas Rápidas con PowerShell

### Login y guardar token
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"usuario":"admin","password":"admin123"}'
$token = $response.token
Write-Host "Token: $token"
```

### Obtener proyectos
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/projects" -Method GET
```

### Crear proyecto con token
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = @{
    name_proyect = "Proyecto Test"
    descripcion = "Descripción de prueba"
    categoria_id = 1
    destacado = "SI"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/projects" -Method POST -Headers $headers -Body $body
```
