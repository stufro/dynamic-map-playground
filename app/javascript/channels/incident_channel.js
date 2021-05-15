import consumer from "./consumer"

consumer.subscriptions.create({ channel: "IncidentChannel" }, {
  received(data) {
    var map = window.incidentMap; 
    var marker = L.marker([51.5, -0.15], {icon: window.incidentIcon}).addTo(map);
  },
})