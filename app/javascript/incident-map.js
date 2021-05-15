// var map = L.map('incident-map').setView([51.505, -0.07], 13);
var map = L.map('incident-map').setView([54.5, -4.5], 5.5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

var incidentIcon = L.icon({
    iconUrl: 'incident.png',

    iconSize:     [52, 52], // size of the icon
    iconAnchor:   [26, 26], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
});

L.marker([51.5, -0.15], {icon: incidentIcon}).addTo(map);
L.marker([52.62, 1.3], {icon: incidentIcon}).addTo(map);
L.marker([52.03, -0.77], {icon: incidentIcon}).addTo(map);
L.marker([51.55, -0.28], {icon: incidentIcon}).addTo(map);

var leafletIDs = [];
map.eachLayer(function (layer) { 
    if (layer.options.icon) {
        leafletIDs.push(layer._leaflet_id)
    } 
});

// loop over markers, flying to each one in turn
var markerIndex = 0;
var intervalID = window.setInterval(function() {
    var currentIndex = markerIndex % leafletIDs.length;

    map.eachLayer(function (layer) { 
        if (layer._leaflet_id == leafletIDs[currentIndex]) {
            leafletIDs.push(layer._leaflet_id)
            map.flyTo([layer._latlng.lat, layer._latlng.lng], 12);
        } 
    });
    markerIndex += 1;
}, 5000);

// store map and incidentIcon to be used later in the channel when broadcast is received
window.incidentMap = map;
window.incidentIcon = incidentIcon;
