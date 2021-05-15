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

// var marker = L.marker([51.5, -0.15], {icon: incidentIcon}).addTo(map);

window.incidentMap = map;
window.incidentIcon = incidentIcon;
