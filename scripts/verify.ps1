$ErrorActionPreference = "Stop"

$python = Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"
if (-not (Test-Path $python)) {
    throw "Missing .venv. Create it and install requirements-dev.txt first."
}

node (Join-Path $PSScriptRoot "check_frontend.js")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node (Join-Path $PSScriptRoot "test_saved_timeline.js")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
& $python -m pytest -q
exit $LASTEXITCODE
