FROM neo4j:3.5.16

# Install algorithms jf. https://neo4j.com/docs/graph-algorithms/3.5/introduction/#_neo4j_server
RUN wget -nv -O ${NEO4J_HOME}/plugins/graph-algorithms.jar https://s3-eu-west-1.amazonaws.com/com.neo4j.graphalgorithms.dist/neo4j-graph-algorithms-3.5.14.0-standalone.jar && \ 
    echo 'dbms.security.procedures.unrestricted=algo.*' >> ${NEO4J_HOME}/conf/neo4j.conf


