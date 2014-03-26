/*
 * This file contains view logic for the UI of the search results page
 */


// make results info appear on right when results box is clicked
$('#search-results').on('click', 'div', function(){
	var name = $("h4", this).text();
	var desc = $("p", this).html();

	$('#search-selected-title').text(name);
	$('#search-selected-description').html(desc);
	$('.search-info-box').hide().fadeIn();

	//map zoom onto marker
	var loc = markers[name];
	if (typeof map._zoom === 'undefined'){
		map._zoom = map.zoom - 1;
		map.setZoom(map._zoom);
	}
	map.panTo(loc);

	//move window back to top
	var resultTop = $('#search-results').offset().top;
	if ($(document).scrollTop() > resultTop){
		window.scrollTo(0, resultTop);
	}

	// load details (e.g. phone number)
	var ref = $(this).attr('reference');
	if (typeof details[ref] === 'undefined'){
		$('#search-selected-description').text("Loading details...");
	} else {
		var d = details[ref];

		// update phone and url
		var html = "";
		html += "<b>Phone: </b>"+d.formatted_phone_number+"<br>"
		+ "<b>Website: </b><a href='"+d.website+"'>"+d.website+"</a><br>";

		$('#search-selected-description').html(html);

		// update reviews
		html = "";
		for (i in d.reviews){
			var r = d.reviews[i];
			window.r = r;

			html += "<li class='row-fluid'>"
				+ "<div class='col-md-3'>"
					+ "<div><a href='#'><img class='search-user-icon alt='user photo' src='/images/UserPhoto.png' /></a></div><br>"
					+ "<div><a href='"+r.author_url+"'>"+r.author_name+"</a></div>"
				+ "</div>"
				+ "<div class='col-md-9 no-padding'>"
					+ "<p class='home-rating-p'>Rating: "+r.rating+"/5<br>"
					+ "<p>"+r.text+"</p><br>"
					+ "<p>Was this review helpful?</p>"
					+ "<button class='home-button-custom'>Yes</button>"
					+ "<button class='home-button-custom'>No</button>"
				+ "</div>"
			+ "</li>"
			+ "<hr class='home-horizontal-separator />";
		}
		console.log(html)
		$($('.search-ul-custom')[0]).html(unescape(html));
	}
});


// show/hide filter options
$('#filterToggle').click(function(e){
	$('#search-filter-options').slideToggle();
	return false;
});

// buttons within options
$('#wait-group .btn').button()
	.click(function(){
		refreshResults();
	});

$('#price-group .btn').button()
	.click(function(){
		refreshResults();
	});

$('#dist-group .btn').button()
	.click(function(){
		refreshResults();
	});

$('#pref-group .btn').button()
	.click(function(){
		refreshResults();
	});

function refreshResults () {
	//fade in one-by-one
	$('.search-result-box').hide().each(function(i, el){
		(function (i, el){
			setTimeout(function(){
				$(el).fadeIn();
			}, i*200);
		})(i, el);
	});
}



// Responsive layout
window.mobile = false;
window.addEventListener("resize", responsiveResize, true);

function responsiveResize (){
	if (window.mobile === false && document.body.clientWidth <= 568) {
        window.mobile = true;

        //test mobile layout
        $('#search-info-pane').hide();
        $('#search-results, #content').addClass('fullsize');
    } else if (window.mobile === true && document.body.clientWidth > 568){
    	window.mobile = false;

    	//test desktop layout
    	$('#search-info-pane').show();
        $('#search-results, #content').removeClass('fullsize');
    }
}
responsiveResize();

// search-info-pane match scrolling
// $(document).scroll(function(e){
// 	var scroll = document.body.scrollTop;
// 	if (scroll > $('#search-results').offset().top){
// 		$('#search-info-pane')
// 			.addClass('search-rightpane-scroll');
// 	} else {
// 		$('#search-info-pane')
// 			.css('position', 'relative')
// 			.removeClass('search-rightpane-scroll');
// 	}
// });