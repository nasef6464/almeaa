#!/usr/bin/env pwsh
# Auto Deploy Script
# Usage: .\deploy.ps1 "commit message"

param(
    [string]$Message = "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan

# Add all changes
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .

# Check if there are changes
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "✅ No changes to commit." -ForegroundColor Green
    exit 0
}

# Commit
Write-Host "💾 Committing: $Message" -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed!" -ForegroundColor Red
    exit 1
}

# Push
Write-Host "☁️ Pushing to GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployed successfully!" -ForegroundColor Green
    Write-Host "🌐 Vercel will auto-deploy in 1-2 minutes" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed!" -ForegroundColor Red
    exit 1
}
