var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant'); // The Comment schema for mongoose

/*
This is the insertion script for the post call
*/
exports.newRestaurant = function(req, res) {
	
}

/*
Calculates the average wait time of a restaurant in minutes.
@param p, average service time
@param m, number of seats
@param a, the interarrival time of customers in minutes
*/
function calculateWaitTime(p, m, a) {
	var result = p / m;
	var base = p / (m * a);
	var exponent = Math.sqrt(2 * (m + 1)) - 1;
	result *= Math.pow(base, exponent);
	result /= 1 - (p / (m * a));
	return result;
}