$ErrorActionPreference = "Stop"

$python = Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"
if (-not (Test-Path $python)) {
    throw "Missing .venv. Create it and install requirements-dev.txt first."
}

node (Join-Path $PSScriptRoot "check_frontend.js")
& $python -m pytest -q
