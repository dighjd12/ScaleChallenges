var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Job = require('./models/job');
postHelper = require('./myrequest.js');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/scale');

var db = mongoose.connection;

/* gets all jobs from the database */
app.get('/getJobs', function(req, res){
	
	console.log('getting annotations');
	Job.getJobs(function (err, jobs){

		res.json(jobs);
	}, '');
});

app.get('/annotate', function(req, res){
	res.sendFile(__dirname + "/public/annotate.html");
});

/* completes the task by posting to the client and 
	deletes the job 
	I think better design might have been to do the
	callback posting in the annotate_controller 
	and let this block of code do deletion only. 
	was short of time :( */
app.delete('/deleteJobs/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	Job.getJobById(id, function(err, job){
		if(err){
			throw err;
		}	
		console.log(job);

		job_toClient = Job.formatResponse(job[0]);
		job_toClient.status = "completed";

		postHelper.postToCallback(job_toClient);

		res.json(job);
		Job.removeJob(id, function(err){
			if (err){
				throw err;
			}
		});
	});

});

//TODO authentication API KEY
/* api end for incoming task requests */
app.post('/v1/task/annotation', function(req, res){
	
	console.log("received..");
	var job = req.body;
	
	//TODO check fields of the job, such as attachment_type, 
	//see if they are valid. if not, send an error response
	Job.addJobs(job, function(err, job_created){
		if(err){
			throw err;
		}

		job_toClient = Job.formatResponse(job_created);
		res.json(job_toClient);
	});

});

/* sends a request, just for test purpose */
app.get('/doPost', function(req, res){
	postHelper.doPost();
	res.send("Sent!");
});

app.listen(port);
console.log('Running on port... ' + port);