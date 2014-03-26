/*
 * This file contains view logic for the UI of the search results page
 */


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