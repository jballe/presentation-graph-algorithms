var fs = require("fs");
var path = require("path");
var cypher = require('./cipher.js');

var file = path.resolve(process.argv[2]);

var txt = fs.readFileSync(file, 'utf8').toString();
cypher(txt, json => {
    console.log("\n\nResult:");
    console.log(JSON.stringify(JSON.parse(json), null, 2));
});
