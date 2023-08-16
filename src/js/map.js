const locations = [
    {name: 'Coordenadas Cali', center: {lat: 3.454985, lng:-76.533251}},
    {name: 'Coordenadas Bowly Store',center:{lat: 3.4728384, lng: -76.5040146}}
];

var map = L.map('map', { attributionControl: false }).setView([locations[0].center.lat, locations[0].center.lng], 15);
var options = {
  key: '54086238bb194d8fab933a18caf4e3fc', // REPLACE WITH YOUR API-KEY. This key might go away any time!
  limit: 10
};
var geocoder = L.Control.OpenCageGeocoding.geocoder(options);
var control = L.Control.openCageGeocoding(options).addTo(map);
var marker;

// We add attribution here to be able to unset prefix
L.control.attribution({ prefix: false }).addTo(map);

/*L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/

L.tileLayer('https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=38b9c54a49814795bf287867086ec0de', {
  attribution: [
    'Data <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    'Map tiles &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>'
  ].join(', '),
  minZoom: 4,
  maxZoom: 18
}).addTo(map);

control.markGeocode = function (result) {
    var r = result;
    setMarker(r);
};

map.on('click', function (e) {
  var query = e.latlng.lat.toString() + ',' + e.latlng.lng.toString();
  getPointGeocoder(query);
})

/* Geocoder functions */

function getPointGeocoder(query, setView = false){
  geocoder.geocode(query, function (results) {
    var r = results[0];
    if(r){
      setMarker(r);
      if(setView){
        map.setView([r.center.lat, r.center.lng], 15);
      }
      outOrInRangeSettings(isInRange(r.center),r)
      updateCar();
    }
  })
}

function setMarker(r){
    if (marker) {
      marker.setLatLng(r.center).setPopupContent(r.name).openPopup();
    } else {
      marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup();
    }       
}