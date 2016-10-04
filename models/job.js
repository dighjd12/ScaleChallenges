var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({

	type:{
		type: String,
		default: 'annotation'
	},
	urgency:{
		type: String,
		default: 'not implemented'
	},
	status:{
		type: String,
		default: 'pending'
	},
	instruction:{
		type: String,
		required: true
	},
	attachment:{
		type: String,
		required: true
	},
	attachment_type:{
		type: String,
		default: 'image'
	},
	objects_to_annotate:{
		type: [String],
		required: true
	},
	with_labels:{
		type: Boolean,
		default: false
	},
	callback_url:{
		type: String,
		required: true
	},
	created_at:{
		type: Date,
		default: Date.now
	}

});

var Job = module.exports = mongoose.model('job', jobSchema);

module.exports.formatResponse = function(job){
	var obj = job.toObject();

	obj.task_id = obj._id;
	obj.params = {"attachment_type": obj.attachment_type, 
					"attachment": obj.attachment, 
					"objects_to_annotate": obj.objects_to_annotate,
					"with_labels": obj.with_labels};

	delete obj._id;
	delete obj.__v;
	delete obj.attachment_type;
	delete obj.attachment;
	delete obj.objects_to_annotate;
	delete obj.with_labels;

	return obj;
};

module.exports.getJobs = function(callback, limit){
	Job.find(callback).limit(limit);
};

module.exports.insertJobs = function(job, callback){
	Job.insert(job, callback);
};

module.exports.addJobs = function(job, callback){
	Job.create(job, callback);
};

module.exports.getJobById = function(id, callback){
	Job.find({_id: id}, callback);
};

module.exports.removeJob = function(id, callback){
	Job.remove({_id: id}, callback);
}


