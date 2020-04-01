param(
    $HugoCommand=$Null
)

$folders = @("data/neo4j/data", "data/neo4j/logs", "data/neo4j/import", "data/neo4j/plugins", "output/presentation", "output/web")
$folders | ForEach-Object {
    $path = Join-Path $PSScriptRoot $_
    If (-not (Test-Path $path)) {
        New-Item $path -ItemType Directory | Out-Null
    }
}

& docker-compose up --build --force-recreate