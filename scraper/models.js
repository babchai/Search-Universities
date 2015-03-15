var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var universitiesSchema = new mongoose.Schema({
	name : String, 
	fees : {inState:Number,outState:Number},
	source : String,
	updated :  {type: Date, default: Date.now }

});

module.exports = mongoose.model('universities', universitiesSchema);
