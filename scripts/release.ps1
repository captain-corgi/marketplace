# release.ps1 - GitHub Release Script for corgi-hub-plugins
# Usage: .\scripts\release.ps1 [-Version "1.0.0"] [-DryRun]

param(
    [string]$Version = "1.0.0",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Success { param($Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "→ $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "✗ $Message" -ForegroundColor Red }

Write-Host ""
Write-Host "🐕 Corgi Hub Plugins - Release Script" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

# Get script directory and project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

Set-Location $ProjectRoot
Write-Info "Project root: $ProjectRoot"

# Version validation
Write-Host ""
Write-Host "📋 Validating Version Consistency" -ForegroundColor Yellow
Write-Host ""

$marketplaceJson = Get-Content ".claude-plugin/marketplace.json" | ConvertFrom-Json
$pluginJson = Get-Content "plugins/greeting-plugin/.claude-plugin/plugin.json" | ConvertFrom-Json

$marketplaceVersion = $marketplaceJson.version
$pluginVersion = $pluginJson.version

Write-Info "Expected version: $Version"
Write-Info "marketplace.json version: $marketplaceVersion"
Write-Info "plugin.json version: $pluginVersion"

$versionMismatch = $false

if ($marketplaceVersion -ne $Version) {
    Write-Warning "marketplace.json version ($marketplaceVersion) does not match expected ($Version)"
    $versionMismatch = $true
}

if ($pluginVersion -ne $Version) {
    Write-Warning "plugin.json version ($pluginVersion) does not match expected ($Version)"
    $versionMismatch = $true
}

if (-not $versionMismatch) {
    Write-Success "All versions match: $Version"
}

# Check for required files
Write-Host ""
Write-Host "📁 Checking Required Files" -ForegroundColor Yellow
Write-Host ""

$requiredFiles = @(
    ".claude-plugin/marketplace.json",
    "plugins/greeting-plugin/.claude-plugin/plugin.json",
    "README.md",
    "CHANGELOG.md",
    "RELEASE_NOTES.md",
    "LICENSE"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Success $file
    } else {
        Write-Error "$file (MISSING)"
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host ""
    Write-Error "Missing required files. Please create them before releasing."
    exit 1
}

# Check if gh CLI is installed
Write-Host ""
Write-Host "🔧 Checking Prerequisites" -ForegroundColor Yellow
Write-Host ""

$ghInstalled = $null -ne (Get-Command "gh" -ErrorAction SilentlyContinue)
if ($ghInstalled) {
    Write-Success "GitHub CLI (gh) is installed"
} else {
    Write-Warning "GitHub CLI (gh) is not installed. Install from: https://cli.github.com/"
}

# Check git status
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Working directory has uncommitted changes"
} else {
    Write-Success "Working directory is clean"
}

# Create release archive
Write-Host ""
Write-Host "📦 Creating Release Archive" -ForegroundColor Yellow
Write-Host ""

$archiveName = "corgi-hub-plugins-v$Version.zip"
$archivePath = Join-Path $ProjectRoot $archiveName

# Files to include in archive
$includeFiles = @(
    ".claude-plugin",
    "plugins",
    "README.md",
    "CHANGELOG.md",
    "LICENSE"
)

if ($DryRun) {
    Write-Info "[DRY RUN] Would create archive: $archiveName"
    Write-Info "[DRY RUN] Including: $($includeFiles -join ', ')"
} else {
    if (Test-Path $archivePath) {
        Remove-Item $archivePath -Force
    }
    
    Compress-Archive -Path $includeFiles -DestinationPath $archivePath -CompressionLevel Optimal
    Write-Success "Created: $archiveName"
    
    $archiveSize = (Get-Item $archivePath).Length / 1KB
    Write-Info "Archive size: $([math]::Round($archiveSize, 2)) KB"
}

# Git tagging
Write-Host ""
Write-Host "🏷️ Git Tagging" -ForegroundColor Yellow
Write-Host ""

$tagName = "v$Version"
$existingTag = git tag -l $tagName

if ($existingTag) {
    Write-Warning "Tag $tagName already exists"
} else {
    if ($DryRun) {
        Write-Info "[DRY RUN] Would create tag: $tagName"
    } else {
        Write-Info "Creating tag: $tagName"
        git tag -a $tagName -m "Release $tagName - Corgi Hub Plugins"
        Write-Success "Tag created: $tagName"
    }
}

# Summary and next steps
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "📋 Release Summary" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""
Write-Host "  Version:  $Version"
Write-Host "  Tag:      $tagName"
Write-Host "  Archive:  $archiveName"
Write-Host ""

if ($DryRun) {
    Write-Host "🔍 DRY RUN COMPLETE - No changes were made" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "📤 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. Push the tag to GitHub:"
Write-Host "     git push origin $tagName" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. Create the GitHub release:"
Write-Host "     gh release create $tagName --title `"$tagName - Corgi Hub Plugins`" --notes-file RELEASE_NOTES.md $archiveName" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Or create manually at:"
Write-Host "     https://github.com/captain-corgi/corgi-hub-plugins/releases/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "🐕 Woof! Ready to release! 🎉" -ForegroundColor Magenta
Write-Host ""
