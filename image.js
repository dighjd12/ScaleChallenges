var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({

	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}

});

var MyImage = module.exports = mongoose.model('image', imageSchema);

module.exports.getImages = function(callback, limit){
	MyImage.find(callback).limit(limit);
}



