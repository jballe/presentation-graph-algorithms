export default function (map) {
    // show the scale bar on the lower left corner
    L.control.scale().addTo(map);

    // // show a marker on the map
    // L.marker({ lon: 0, lat: 0 })
    //   .bindPopup("The center of the world")
    //   .addTo(map);

    //L.marker({ lon: 48.882748299999996, lat: 2.2996939999999997 }).addTo(map);

    // http://korttjenester.aws.dk./wms
    const dawaWfs = "https://kort.aws.dk/geoserver/aws4_wms_secure/wms?"; //REQUEST=GetCapabilities";

    var osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        },
    );

    var baseMaps = {
        OpenStreetMaps: osmLayer,

        "OSM Heigit": L.tileLayer.wms(
            "http://maps.heigit.org/osm-wms/service?",
            {
                layers: "osm_auto:all",
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.osm-wms.de/">https://www.osm-wms.de/</a>',
            },
        ),

        "OSM Terrastris": L.tileLayer.wms(
            "https://ows.terrestris.de/osm/service?",
            {
                layers: "OSM-WMS", // OSM-Overlay-WMS,TOPO-OSM-WMS,SRTM30-Colored
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.terrestris.de/en/openstreetmap-wms/">terrestris</a>',
            },
        ),

        "Mundialis Topography": L.tileLayer.wms(
            "http://ows.mundialis.de/services/service?",
            {
                layers: "TOPO-WMS",
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.mundialis.de/en/ows-mundialis/">Mundialis</a>',
            },
        ),

        "Mundialis Places": L.tileLayer.wms(
            "http://ows.mundialis.de/services/service?",
            {
                layers: "OSM-Overlay-WMS",
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.mundialis.de/en/ows-mundialis/">Mundialis</a>',
            },
        ),

        "Mundialis Topography, then places": L.tileLayer.wms(
            "http://ows.mundialis.de/services/service?",
            {
                layers: "TOPO-WMS,OSM-Overlay-WMS",
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.mundialis.de/en/ows-mundialis/">Mundialis</a>',
            },
        ),

        "Mundialis Places, then topography": L.tileLayer.wms(
            "http://ows.mundialis.de/services/service?",
            {
                layers: "OSM-Overlay-WMS,TOPO-WMS",
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> rendered by <a href="https://www.mundialis.de/en/ows-mundialis/">Mundialis</a>',
            },
        ),
    };

    L.control.layers(baseMaps).addTo(map);
    osmLayer.addTo(map);
}
