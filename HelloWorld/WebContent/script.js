var map;
var markers = [];
var infoWindow;
var service;
var currentCoords = { };
var geocoder;

function displayLocation(position) {

/*var latitude = 40.730610;/*position.coords.latitude;*/
/*var longitude = -73.935242;/*position.coords.longitude;*/


var pLocation = document.getElementById("location");
/*pLocation.innerHTML += latitude + ", " + longitude + "<br>";*/
	//showMaps(position.coords);

}

function makePlacesRequest(lat, lng) {
	
	console.log(lat);
	console.log(lng);
	var query = "food";
	if(query) {
		console.log("got an entry");
		var placesRequest = {
			location: new google.maps.LatLng(33.4483771, -112.07403729999999),
			radius: 1000,
			keyword: query
		};
		service.nearbySearch(placesRequest, function(results, status) {
			if( status == google.maps.places.PlacesServiceStatus.OK) {
				results.forEach(function(place) {
					console.log(place);
					createMarker(place);
				});
			}
		});
	} else {
		console.log("No entyr");
	}


}

function showForm(latitude, longitude) {

	
		makePlacesRequest(latitude, longitude);

}

function showMaps() {
	var mapOptions = {
		zoom: 11,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
/*	currentCoords.latitude = coords.latitude;
	currentCoords.longitude = coords.longitude;*/
	
	/*coords.latitude = 40.730610;
	coords.longitude = -73.935242;*/
	geocoder = new google.maps.Geocoder();
	var address = "Phoenix";
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
	currentCoords.latitude = map.getCenter().lat();
	currentCoords.longitude = map.getCenter().lng();

			console.log(map.getCenter().lat());
			console.log(map.getCenter().lng());
		}
	});


	var googleLatLong = new google.maps.LatLng(currentCoords.latitude, currentCoords.longitude);

	service = new google.maps.places.PlacesService(map);
	infoWindow = new google.maps.InfoWindow();
	
showForm(currentCoords.latitude, currentCoords.longitude);


	google.maps.event.addListener(map, "click", function(event) {
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();
		currentCoords.latitude = latitude;
		currentCoords.longitude = longitude;
		var pLocation = document.getElementById("location");
		pLocation.innerHTML = latitude + ", " + longitude;
		map.panTo(event.latLng);
		var image = "http://www.uidownload.com/files/648/285/119/american-express-logo-icon.png";
		/*var markerOptions = {
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
		});*/
	});
	/*showForm();*/

}

function createMarker(place) {
	var markerOptions = {
		position: place.geometry.location,	
		map: map,
		icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);
	markers.push(marker);
	google.maps.event.addListener(marker, "click", function(place, marker) {
		return function() {
			if(place.vicinity) {
				infoWindow.setContent(place.name + "<br>" + place.vicinity);
			} else {
				infoWindow.setContent(place.name);
			}
			infoWindow.open(map, marker);
		};
		}(place, marker));

}




window.onload = function() {

/*if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(displayLocation);
} else {
alert("Ok .. some error");
}*/
	showMaps();
}
