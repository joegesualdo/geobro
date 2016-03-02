var Geobro= require(__dirname +'/../index.js');

var address = '1 Infinite Loop. Cupertino, CA 95014'

Geobro.geocode(address)
.then(function(cords) {
  console.log(cords) //=> { lat: 41.005802, lng: -74.271483 }
})

var lat = "37.3316936"
var lng = "-122.0302191"

Geobro.reverseGeocode(lat,lng)
.then(function(address){
  console.log(address) //=> "Infinite Loop 1, 1 Infinite Loop, Cupertino, CA 95014, USA"
})
