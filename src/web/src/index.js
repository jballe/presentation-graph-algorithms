import './page/page.css';
import osm from './page/osm';

console.log("sdsd");

// initialize Leaflet
var map = L.map("map").setView({ lon: 0, lat: 0 }, 2);
osm(map);

