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

L.marker([51.51, -0.15], {icon: incidentIcon, start: "15/05/21 15:32", reference: "542272", location: "Pilgrimage Street", circuits: 7, customers: 52}).addTo(map);
L.marker([52.62, 1.301], {icon: incidentIcon, start: "15/05/21 15:32", reference: "834514", location: "Carrow Road", circuits: 11, customers: 70}).addTo(map);
L.marker([52.03, -0.77], {icon: incidentIcon, start: "15/05/21 15:32", reference: "153484", location: "Milton Keynes", circuits: 25, customers: 93}).addTo(map);
L.marker([51.55, -0.28], {icon: incidentIcon, start: "15/05/21 15:32", reference: "743266", location: "Wembley Stadium", circuits: 2, customers: 7}).addTo(map);

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

            map.once("moveend zoomend", function() {
            L.popup({closeButton: false})
                .setLatLng([layer._latlng.lat - 0.02, layer._latlng.lng + 0.06])
                .setContent(
                    `<h4>${layer.options.reference}</h4>
                    <p><b>Location: </b>${layer.options.location}</p>
                    <p><b>Start Time: </b>${layer.options.start}</p>
                    <p><b>Description: </b>Loss of service to ${layer.options.circuits} circuits</p>
                    <p><b>Impacted Customers: </b>${layer.options.customers}</p>`
                )
            .openOn(map);
    })
        } 
    });
    markerIndex += 1;
}, 10000);

// store map and incidentIcon to be used later in the channel when broadcast is received
window.incidentMap = map;
window.incidentIcon = incidentIcon;
