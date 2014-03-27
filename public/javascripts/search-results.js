/*
 * This file controls fetching results
 * and setting up the map using the Google Maps API
 */

// Get query parameters
var food = $('#search-query').text();
var loc = $('#search-location').text();
var wait = $('#search-wait').text();
var locURL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address="+encodeURIComponent(loc);
if (loc !== ""){
	$.getJSON(locURL, function (data) {
		if (data.results.length > 0){
			origin = data.results[0].geometry.location;
			map.setCenter(origin);
			loadResults();
		}
	})
}

// Setup map
var origin = new google.maps.LatLng(40.1097573, -88.2272623);
var map = new google.maps.Map(document.getElementById('search-map'), {
  center: origin,
  zoom: 15
});

// Dictionary of restuarant name to map location
var markers = {};

// adds a marker to the map
// params: name, latlong position
function addMarker(name, latlong) {
	var marker = new google.maps.Marker({
	    position: latlong,
	    map: map,
	    title: name
	});

	return marker;
}

//Given a query, and optional radius,
//returns an array of place data from Google Maps API
function getPlaces(q, callback, rad){
	var request = {
	    location: origin,
	    radius: rad || '700',
		query: q
	};

	var service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callback);
}

var previousInfoWindow = null;
function addMarkerListener(infowindow, marker, contentString) {
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(contentString);
		infowindow.open(map, marker);
	});
}

var priceDictionary = {
	0 : "Free",
	1 : "$",
	2 : "$$",
	3 : "$$$",
	4 : "$$$$"
}

var infowindows = {}
// gets places based on query
function loadResults() {

	getPlaces(food, function(results){
		var html = "";
		var infowindow = new google.maps.InfoWindow();
		// limit to 8 results
		var limit = 8;
		var len = (results.length < limit) ? results.length : limit;
		for (var i=0; i<len; i++){
			var r = results[i];

			// construct html string for each result
			html += "<div class='search-result-box'>"
			+ "<h4>"+r.name+"</h4>"
			+ "<p class='lead search-result-box-description'>"
				+ r.formatted_address + "</p>"
			+ "<h3 class='search-time'><span class='label label-primary'>"+Math.floor(Math.random()*50)+" min</span></h3>"
			+ "<p class='lead search-result-box-description'>"
				+ "<b class='opacity-50'>Rating</b>: " + (r.rating || 'No Rating') + "/5<br>"
				+ "<b class='opacity-50'>Price</b>: " + (priceDictionary[r.price_level] || 'N/A') + "<br>";

			if (r.opening_hours && r.opening_hours.open_now){
				html += "Open Now!";
			} else {
				html += "Currently Closed";
			}

			html += "</p></div>";

			var infoContent = "<div id='content'>" +
			 '<div id="siteNotice">'+
    		'</div>'+
    		'<h1 id="firstHeading" class="firstHeading">' + r.name + '</h1>'+
      		'<div id="bodyContent">'+
    		'<p>'+
    		'<b>Address: </b>'+r.formatted_address+'<br>'+
    		// '<b>Phone Number: </b>'+r.formatted_phone_number+'<br>'+
    		// '<b>Website: </b><a href="'+r.website+'">'+r.website+'</a><br>'+
    		'<b class="opacity-50">Rating</b>: '+(r.rating || 'No Rating') + "/5<br>"+
    		'<b class="opacity-50">Price</b>: '+(priceDictionary[r.price_level] || 'N/A')+'<br>'+
    		'</p>'+
      		'</div>'+
      		'</div>';

			//add marker to map
			var marker = addMarker(r.name, r.geometry.location);
			addMarkerListener(infowindow, marker, infoContent);
			markers[r.name] = r.geometry.location;
			infowindows[r.name] = infowindow;
		}

		$('#search-results').html(html);

		//fade in one-by-one
		$('.search-result-box').hide().each(function(i, el){
			(function (i, el){
				setTimeout(function(){
					$(el).fadeIn();
				}, i*200);
			})(i, el);
		});
	});
}



