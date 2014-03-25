var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
	name : String,
	address : String,
	city : String,
	state : String,
	zipcode : Number,
	phone : Number,
	updated : Date,
	serviceTime : Number,
	numServers : Number,
	interarrivalTime : Number,
	wait : Number
});

mongoose.model('Restaurant', Restaurant)

mongoose.connect('mongodb://localhost/restaurants');