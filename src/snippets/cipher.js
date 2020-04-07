var http = require("http");
var request = http.request;

const username = "neo4j";
const password = "admin";
const hostname = "neo4j"
const port = 7474;

module.exports = function cypher(query, cb) {
    //console.log(query);
    console.log("Sending request...");
    var req = request(
        {
            method: "POST",
            hostname: hostname,
            port: port,
            path: "/db/data/transaction/commit",
            auth: username + ":" + password,
        },
        res => {
            var result = '';
            res.on("data", d => {
                result += d;
            });
            res.on("end", () => {
                if (cb) {
                    cb(result);
                }
            });
        },
    );

    statements = query.split("\n' --\n").map(x => {
        return {
            statement: x,
        };
    });
    var obj = {
        statements: statements,
    };
    var json = JSON.stringify(obj);
    req.write(json);
    req.end();
}