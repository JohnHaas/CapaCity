
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.search = function(req, res){
	res.render('search_results', {
		title: 'CapaCity | Search Results',
		query: req.query['q'] || "No query provided.",
	});
};

exports.pageNotFound = function(req, res){
	
}