var http = require('http');
var Promise = require('bluebird');

function geocodeUrl(address) {
  return {
    fullUrl: "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
    host:"http://maps.googleapis.com",
    path: "/maps/api/geocode/json?address="+address+"&sensor=false"
  }
}

function geocode(address){
  return new Promise(function(resolve) {
    var body = ''
    var cords = {lat: null, lng: null}
    http.get(geocodeUrl(address).fullUrl, function(res){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        body += data; // 
      });
      res.on('end', function(){
        var jsonBody = JSON.parse(body)

        cords.lat = jsonBody['results'][0]['geometry']['location']['lat']
        cords.lng = jsonBody['results'][0]['geometry']['location']['lng']

        resolve(cords);
      })
    })
  })
}

function reverseGeocodeUrl(lat, lng) {
  return {
    fullUrl: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat+ ","+ lng,
    host:"http://maps.googleapis.com",
    path: "/maps/api/geocode/json?latlng="+ lat+ ","+ lng
  }
}

function reverseGeocode(lat, lng){
  return new Promise(function(resolve) {
    var body = ''
    var address = ''
    http.get(reverseGeocodeUrl(lat,lng).fullUrl, function(res){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        body += data; // 
      });
      res.on('end', function(){
        var jsonBody = JSON.parse(body)

        address = jsonBody['results'][0]['formatted_address']

        resolve(address);
      })
    })
  })
}

module.exports = {
  geocode: geocode,
  reverseGeocode: reverseGeocode
}
