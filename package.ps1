# Package Script
# Used to package builds from dist directory into zip files

Write-Host "[INFO] Starting extension packaging..." -ForegroundColor Cyan
Write-Host ""

# Check if dist directory exists
if (-not (Test-Path "dist")) {
    Write-Host "[ERROR] dist directory not found. Please run build first." -ForegroundColor Red
    Write-Host "   Run: npm run build:all" -ForegroundColor Yellow
    exit 1
}

# Execute packaging script
Write-Host "[PROCESS] Executing package.ts..." -ForegroundColor Green
try {
    npx tsx scripts/package.ts
    Write-Host ""
    Write-Host "[SUCCESS] Packaging completed!" -ForegroundColor Green
    Write-Host "[INFO] Zip files generated in project root." -ForegroundColor Cyan
}
catch {
    Write-Host ""
    Write-Host "[ERROR] Packaging failed: $_" -ForegroundColor Red
    exit 1
}
