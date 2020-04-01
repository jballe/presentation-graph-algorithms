+++
weight = 50
+++

# Pathfinding


--- 
## Import data

```
WITH "https://raw.githubusercontent.com/neo4j-graph-analytics/book/master/data/" AS base
WITH base + "transport-nodes.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (place:Place {name: row.id, id:row.id})
SET place.latitude = toFloat(row.latitude),
    place.longitue = toFloat(row.longitude),
    place.population = toInteger(row.population),
    place.id = row.id
;
WITH "https://raw.githubusercontent.com/neo4j-graph-analytics/book/master/data/" AS base
WITH base + "transport-relationships.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH (origin:Place {id: row.src})
MATCH (destination:Place {id: row.dst})
MERGE (origin)-[:EROAD {distance: toInteger(row.cost)}]->(destination)
```
---

## Shortest path
```
MATCH (source:Place {id: "Amsterdam"}),
      (destination:Place {id: "London"})
CALL algo.shortestPath.stream(source, destination, null)
YIELD nodeId, cost
RETURN algo.getNodeById(nodeId).id AS place, cost
```

## Delete places

```
MATCH (p:Place) 
OPTIONAL MATCH (p)-[r]-() //drops p's relations 
DELETE r,p
```