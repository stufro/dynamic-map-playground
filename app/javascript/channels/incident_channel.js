import consumer from "./consumer"

consumer.subscriptions.create({ channel: "IncidentChannel" }, {
  received(data) {
    var map = window.incidentMap; 
    var marker = L.marker([data.lat, data.lon], {icon: window.incidentIcon}).addTo(map);

    map.flyTo([data.lat, data.lon + 0.04], 12)

    map.once("moveend zoomend", function() {
      L.popup({closeButton: false})
        .setLatLng([data.lat - 0.02, data.lon + 0.06])
        .setContent(
            `<h4>${data.reference}</h4>
            <p><b>Location: </b>${data.location}</p>
            <p><b>Start Time: </b>${data.start}</p>
            <p><b>Description: </b>Loss of service to ${data.circuits} circuits</p>
            <p><b>Impacted Customers: </b>${data.customers}</p>`
        )
      .openOn(map);
    })

  },
})