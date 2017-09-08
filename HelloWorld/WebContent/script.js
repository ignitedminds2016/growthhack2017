var map;
var markers = [];
var infoWindow;

function displayLocation(position) {

var latitude = position.coords.latitude;
var longitude = position.coords.longitude;

var pLocation = document.getElementById("location");
pLocation.innerHTML += latitude + ", " + longitude + "<br>";
	showMaps(position.coords);

}

function showMaps(coords) {

	var googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 11,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	var mapDiv = document.getElementById("map");
	var map = new google.maps.Map(mapDiv, mapOptions);
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(map, "click", function(event) {
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();
		var pLocation = document.getElementById("location");
		pLocation.innerHTML = latitude + ", " + longitude;
		map.panTo(event.latLng);
		var image = "http://www.uidownload.com/files/648/285/119/american-express-logo-icon.png";
		var markerOptions = {
			position: event.latLng,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: image,
			clickable: true
		};
		var marker = new google.maps.Marker(markerOptions);
		markers.push(marker);
		google.maps.event.addListener(marker, "click", function(event) {
			infoWindow.setContent("AMEX Discount of 5% for EveryPurchase");
			infoWindow.open(map, marker);
		});
	});

}


window.onload = function() {

if(navigator.geolocation) {

	navigator.geolocation.getCurrentPosition(displayLocation);
} else {

alert("Ok .. some error");
}
}

