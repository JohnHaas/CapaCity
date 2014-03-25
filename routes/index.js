
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'KappaCity' });
};

exports.search = function(req, res){
	// render with mock data
	res.render('search_results', {
		title: 'CapaCity | Search Results',
		query: req.query['q'] || "No query provided.",
		data: [
			{
				"name": "Sakanaya",
				"wait": "5"
			},
			{
				"name": "Benehana",
				"wait": "8"
			},
			{
				"name": "Pizza Hut",
				"wait": "35"
			},
		]
	});
};

exports.pageNotFound = function(req, res){

}