var fs = require("fs");
var http = require("https");
var path = require("path");
var httpGet = http.get;
const csv = require("csvtojson");

function serializeObjectToSetValues(obj, keys) {
    const jsonValue = JSON.stringify(obj, keys, 1);
    const value = jsonValue.replace(/\"(\w+)\"\:/g, "$1:").replace(/\n/g, "");
    return value;
}

function airports() {
    const dataPath = path.join(__dirname, "airports.dat");
    const headers =
        "openFlightAirportId,name,city,country,iata,icao,latitude,longitude,altitude,timezone,dst,tz,type,source";
    const keys = headers.split(",").splice(0, 8);
    const dataWriteStream = fs.createWriteStream(dataPath);
    dataWriteStream.write(headers);
    return httpGet(
        "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat",
        function (response) {
            response.pipe(dataWriteStream);
            response.on("end", () => {
                var readStream = fs.createReadStream(dataPath);
                const writeStream = fs.createWriteStream(
                    path.join(__dirname, "7-1-airports.cypher"),
                );

                csv()
                    .fromStream(readStream)
                    .subscribe((row) => {
                        row.latitude = row.latitude
                            ? parseFloat(row.latitude)
                            : null;
                        row.longitude = row.longitude
                            ? parseFloat(row.longitude)
                            : null;
                        const value = serializeObjectToSetValues(row, keys);
                        var query = `MERGE (n:Airport { openFlightAirportId: '${row.openFlightAirportId}' }) SET n=${value}\n`;
                        writeStream.write(Buffer.from(query, "utf8"));
                    })
                    .then(() => console.log("Done airports!"));
            });
        },
    );
}

function routes() {
    const dataPath = path.join(__dirname, "airline-routes.dat");
    const headers =
        "airline,openflightAirlineId,sourceAirportIata,sourceAirportOpenflightId,destinationAirportIata,destinationAirportOpenflightId,codeshare,stops,equipment";
    const keys = [
        "sourceAirportOpenflightId",
        "destinationAirportOpenflightId",
        "stops",
    ];
    //const dataWriteStream = fs.createWriteStream(dataPath);
    //dataWriteStream.write(headers);
    // return httpGet(
    //     "https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat",
    //     function (response) {
    //         response.pipe(dataWriteStream);
    //         response.on("end", () => {
    var readStream = fs.createReadStream(dataPath);
    const writeStream = fs.createWriteStream(
        path.join(__dirname, "7-2-routes.cypher"),
    );
    csv()
        .fromStream(readStream)
        .subscribe((row) => {
            row.stops = parseInt(row.stops);
            const value = serializeObjectToSetValues(row, keys);
            var query = `MATCH (src:Airport { openFlightAirportId: '${
                row.sourceAirportOpenflightId
            }' }) \nMATCH (dst:Airport { openFlightAirportId: '${
                row.destinationAirportOpenflightId
            }' }) \nMERGE (src)-[:AIRLINE { boardings: ${row.stops + 1} }]->(dst)\n\n`;
            writeStream.write(Buffer.from(query, "utf8"));
        })
        .then(() => console.log("Done routes!"));

    //         });
    //     },
    // );
}

Promise.all([
    //airports(),
    routes(),
]).then(() => console.log("All done!"));
