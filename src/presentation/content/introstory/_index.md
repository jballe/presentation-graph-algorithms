+++
weight = 20
plugins = ["https://cdn.jsdelivr.net/npm/reveal-plantuml"]

+++

## The Königsberg Bridge Problem

<!-- ![Briges](https://www.maa.org/sites/default/files/images/upload_library/46/1/old_convergence/Paoletti/Figure-2-perchance.png) -->
![Bridges](https://www.maa.org/sites/default/files/images/cms_upload/Konigsberg_colour37936.jpg)

> August 26, 1735, Leonard Euler

---
## Made a graph

```plantuml
@startuml
digraph foo {
    C -> A
    C -> A
    C -> D
    A -> D
    A -> B
    A -> B
    D -> B
}
@enduml
```
---

## The solvable bridge problem

![](https://www.maa.org/sites/default/files/images/upload_library/46/1/old_convergence/Paoletti/Figure-3-perchance.png)

> Solutio problematis ad geometriam situs pertinentis

---

## In neo4j

```
CREATE (a:Land { name: "A" })
CREATE (b:Land { name: "B" })
CREATE (c:Land { name: "C" })
CREATE (d:Land { name: "D" })
CREATE (e:Land { name: "E" })
CREATE (f:Land { name: "F" })

CREATE (e)-[:BRIDGE {id: "a" }]->(f)
CREATE (f)-[:BRIDGE {id: "b" }]->(b)
CREATE (b)-[:BRIDGE {id: "c" }]->(f)
CREATE (f)-[:BRIDGE {id: "d" }]->(a)
CREATE (a)-[:BRIDGE {id: "e" }]->(f)
CREATE (f)-[:BRIDGE {id: "f" }]->(c)
CREATE (c)-[:BRIDGE {id: "g" }]->(a)
CREATE (a)-[:BRIDGE {id: "h" }]->(c)
CREATE (c)-[:BRIDGE {id: "i" }]->(d)
CREATE (d)-[:BRIDGE {id: "k" }]->(a)
CREATE (a)-[:BRIDGE {id: "m" }]->(e)
CREATE (e)-[:BRIDGE {id: "n" }]->(a)
CREATE (a)-[:BRIDGE {id: "p" }]->(b)
CREATE (b)-[:BRIDGE {id: "o" }]->(e)
CREATE (e)-[:BRIDGE {id: "l" }]->(d)

```

## Common graph problems

* Pathfinding
* Centrality
* Community detection
