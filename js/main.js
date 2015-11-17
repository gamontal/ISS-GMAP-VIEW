var marker, isslat, isslon, issLatLng;
var issloc = function updateISSpos (marker, map) {
  setInterval(function () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function (data) {
      isslat = data['iss_position']['latitude'];
      isslon = data['iss_position']['longitude'];
      issLatLng = { lat: Number(isslat), lng: Number(isslon) };

      $('#LatLngIndic').html('LAT: ' + isslat + ' LNG: ' + isslon);
      marker.setPosition(issLatLng);
      map.setCenter(marker.getPosition());
    });
  }, 3000);
}

function initialize() {
  var LatLng = {lat: 40.7127, lng: 74.0059};
  var mapOptions = {
    center: LatLng,
    mapTypeId: google.maps.MapTypeId.ROUTES,
    zoom: 6
  };
  var image = {
    url: 'images/ISS.png',
    scaledSize: new google.maps.Size(70, 70), 
    origin: new google.maps.Point(0,0), 
    anchor: new google.maps.Point(0, 0) 
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  marker = new google.maps.Marker({
    position: LatLng,
    map: map,
    icon: image
  });

  marker.setMap(map);
  issloc(marker, map);
};

