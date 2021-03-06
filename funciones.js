i=0;
function calcDistance(p1, p2) {//p1 and p2 in the form of google.maps.LatLng object
	return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(3);//distance in KiloMeters
}

function getLocation() {
	if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showPosition, showError);} 
	else {alert("Geolocation is not supported by this browser.");}
}
function showPosition(position) {
	alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude); 
}
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("Usuario negó la solicitud de Geolocalización.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("La información de ubicación no está disponible.");
			break;
		case error.TIMEOUT:
			alert("La solicitud para obtener la ubicación del usuario ha caducado.");
			break;
		case error.UNKNOWN_ERROR:
			alert("Un error desconocido ocurrió.");
			break;
	}
}

function initMap() {
	
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: { lat: 18.9965041, lng: 72.8194209 }
	});
	
	var waypts = [];//origin to destination via waypoints
	//waypts.push({location: 'indore', stopover: true});
	
	function continuouslyUpdatePosition(location){//Take current location from location.php and set marker to that location
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var pos = JSON.parse(this.responseText);
				location.setPosition(new google.maps.LatLng(pos.lat,pos.lng));
				setTimeout(function(){
					continuouslyUpdatePosition(location);
				},5000);
			}
		};
		xhttp.open("GET", "location.php", true);
		xhttp.send();
	}
	
	//Distance between p1 & p2
	//var p1 = new google.maps.LatLng(45.463688, 9.18814);
	//var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002);
	//alert(calcDistance(p1,p2)+" Kilimeters");
	
	
	//Make marker at any position in form of {lat,lng}
	function makeMarker(position /*, icon*/) {
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			/*animation: google.maps.Animation.DROP,*/
			/*icon: icon,*/
		});

		return marker;
	}

	
	//var icons = {
	//	end: new google.maps.MarkerImage('http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Push-Pin-1-Left-Pink-icon.png'),
	//	start: new google.maps.MarkerImage('http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Push-Pin-1-Left-Chartreuse-icon.png')
	//};
	
	//Show suggestions for places, requires libraries=places in the google maps api script link
	var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById('start1'));
	var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('end1'));
	
	var directionsService1 = new google.maps.DirectionsService;
	var directionsDisplay1 = new google.maps.DirectionsRenderer({
		polylineOptions: {strokeColor: "blue"}, //path color
		          //geodesic: true,
		draggable: true,// change start, waypoints and destination by dragging
		/* Start and end marker with same image
		markerOptions : {icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Push-Pin-1-Left-Pink-icon.png'},
		*/
		//suppressMarkers: true
	});
	directionsDisplay1.setMap(map);
    var onChangeHandler1 = function() {calculateAndDisplayRoute(directionsService1, directionsDisplay1, $('#start1'),$('#end1'));};
	$('#start1,#end1').change(onChangeHandler1);

	function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) { 
		i=1;
		directionsService.route({
			origin: start.val(),
			destination: end.val(),
			waypoints: waypts,
			optimizeWaypoints: true,
			//draggable:true,
			travelMode: 'WALKING',
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
				var leg = response.routes[ 0 ].legs[ 0 ];
				// Move marker along path from A to B
				var markers = [];
				for(var i=0; i<leg.steps.length; i++){
					var marker = makeMarker(leg.steps[i].start_location);
					markers.push(marker);
					marker.setMap(null);
					//alert(leg.steps[i].distance.text);
					//alert(leg.steps[i].start_location);
				}
				tracePath(markers, 0);
				
				var location = makeMarker(leg.steps[0].start_location);
				continuouslyUpdatePosition(location);
			} else {window.alert('Solicitud de indicaciones fallida debido a ' + status);}
		});

	}
	
	function tracePath(markers, index){// move marker along path from A to B
		if(index==markers.length)	return;
		markers[index].setMap(map);
		setTimeout(function(){
			markers[index].setMap(null);
			tracePath(markers, index+1);
		},500);
		//alert(markers.length);
	}


   function obtener_ubicacion(long,lat,campo) {
       var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              "location": new google.maps.LatLng(long, lat)

            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK){
              	 campo.val(results[0].formatted_address);

              	 //campo.change();
              }
               // $("#" + addressId).val(results[0].formatted_address);
              else
                alert("Error al buscar datos");
                //$("#error").append("Unable to retrieve your address<br />");
            });
   }


 directionsDisplay1.addListener('directions_changed', function() {
      if(i==0){
         var response=directionsDisplay1.getDirections();
		 var leg1 = response.routes[ 0 ].legs[ 0 ];
		 var inicio=leg1.steps[0].start_location;
		 var final=leg1.steps[leg1.steps.length-1].end_location;
		 obtener_ubicacion(inicio.lat(), inicio.lng(),$('#start1'));
		 obtener_ubicacion(final.lat(), final.lng(),$('#end1'));
        }
     i=0;    
 });
	calculateAndDisplayRoute(directionsService1, directionsDisplay1, $('#start1'),$('#end1'));
}

function actualizar(){
	$('#start1').change();

}


