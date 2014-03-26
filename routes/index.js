
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'CapaCity' });
};

exports.search = function(req, res){
	// render with mock data
	res.render('search_results', {
		title: 'CapaCity | Search Results',	
		food: req.query['search-input'],
		location: req.query['location-input'],
		data: []
	});
};

exports.pageNotFound = function(req, res){

}