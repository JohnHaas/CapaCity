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

// adds a marker to the map
// params: name, latlong position
function addMarker(name, latlong) {
	var marker = new google.maps.Marker({
	    position: latlong,
	    map: map,
	    title: name
	});
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


// gets places based on query
function loadResults() {

	getPlaces(food, function(results){
		var html = "";

		// limit to 5 results
		var limit = 5;
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
				+ "<b class='gray'>Rating</b>: " + (r.rating || 'no rating') + "<br>"
				+ "<b class='gray'>Price</b>: " + (r.price_level || 'n/a') + "<br>"
				+ r.types.join(', ') + "<br>";

			if (r.opening_hours && r.opening_hours.open_now){
				html += "open now!";
			}

			html += "</p></div>";

			//add marker to map
			addMarker(r.name, r.geometry.location);
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



