var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({

	name:{
		type: String,
		required: true
	},
	instruction:{
		type: String,
		required: true
	},
	attachment:{
		
	},
	create_date:{
		type: Date,
		default: Date.now
	}

});

var Image = module.exports = mongoose.model('image', imageSchema);

module.exports.getImages = function(callback, limit){
	Image.find(callback).limit(limit);
}



