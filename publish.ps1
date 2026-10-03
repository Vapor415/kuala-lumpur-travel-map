param(
    [string]$Repository = 'kuala-lumpur-travel-map',
    [switch]$Login
)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$taskArguments = @('publish.cjs', "--repository=$Repository")
if ($Login) { $taskArguments += '--login' }
& node @taskArguments
if ($LASTEXITCODE -ne 0) { throw 'GitHub Pages publishing failed. See the message above.' }
