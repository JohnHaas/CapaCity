/*
 * This file contains view logic for the UI of the search results page
 */

// Responsive layout
window.mobile = false;
window.addEventListener("resize", responsiveResize, true);

function responsiveResize (){
	if (window.mobile === false && document.body.clientWidth <= 568) {
        console.log('mobile');
        window.mobile = true;

        //test mobile layout
        $('#search-info-pane').hide();
        $('#search-results, #content').addClass('fullsize');
    } else if (window.mobile === true && document.body.clientWidth > 568){
    	console.log('desktop');
    	window.mobile = false;

    	//test desktop layout
    	$('#search-info-pane').show();
        $('#search-results, #content').removeClass('fullsize');
    }
}
responsiveResize();

// search-info-pane match scrolling
$(document).scroll(function(e){
	console.log(e);
});