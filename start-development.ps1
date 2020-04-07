param(
    $HugoCommand=$Null,
    $DockerDesktop = @("${env:ProgramFiles}\Docker\Docker\DockerCli.exe")
)

$cli = $DockerDesktop | Where-Object { Test-Path $_ } | Select-Object -First 1
if("${cli}" -ne "") {
    Write-Host "Ensure linux engine"
    & $cli -SwitchLinuxEngine
    # Write-Host "Ensure windows engine"
    # & $cli -SwitchWindowsEngine
}

$folders = @("data/neo4j/data", "data/neo4j/logs", "output/presentation", "output/web")
$folders | ForEach-Object {
    $path = Join-Path $PSScriptRoot $_
    If (-not (Test-Path $path)) {
        New-Item $path -ItemType Directory | Out-Null
    }
}

Write-Host "Starting stack..."
& docker-compose up --build --force-recreate