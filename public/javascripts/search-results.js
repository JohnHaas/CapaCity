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
var service = new google.maps.places.PlacesService(map);

// Dictionary of restuarant name to map location
var markers = {};

// Dictionary of restaurant references (maps api) to more information
var details = {};

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

	service.textSearch(request, callback);
}

var priceDictionary = {
	0 : "Free",
	1 : "$",
	2 : "$$",
	3 : "$$$",
	4 : "$$$$"
}
// gets places based on query
function loadResults() {

	getPlaces(food, function(results){
		var html = "";

		console.log(results)

		// limit to 5 results
		var limit = 5;
		var len = (results.length < limit) ? results.length : limit;
		for (var i=0; i<len; i++){
			var r = results[i];

			// construct html string for each result
			html += "<div class='search-result-box' reference='"+r.reference+"''>"
			+ "<h4>"+r.name+"</h4>"
			+ "<p class='lead search-result-box-description'>"
				+ r.formatted_address + "</p>"
			+ "<h3 class='search-time'><span class='label label-primary'>"+Math.floor(Math.random()*50)+" min</span></h3>"
			+ "<p class='lead search-result-box-description'>"
				+ "<b class='opacity-50'>Rating</b>: " + (r.rating || 'no rating') + "/5<br>"
				+ "<b class='opacity-50'>Price</b>: " + (priceDictionary[r.price_level] || 'n/a') + "<br>";

			if (r.opening_hours && r.opening_hours.open_now){
				html += "Open Now!";
			} else {
				html += "Currently Closed";
			}

			html += "</p></div>";

			//add marker to map
			addMarker(r.name, r.geometry.location);
			markers[r.name] = r.geometry.location;

			//make request to get restaurant details (e.g. phone number)
			(function(ref) {
				service.getDetails({
					reference: ref,
				}, function(data){
					details[ref] = data;
				});
			})(r.reference);
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



