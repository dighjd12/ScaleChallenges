var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Job = require('./models/job');
send = require('./myrequest.js');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/scale');

var db = mongoose.connection;

app.get('/getJobs', function(req, res){
	
	console.log('getting annotations');
	Job.getJobs(function (err, jobs){

		res.json(jobs);
	}, '');
});

app.get('/annotate', function(req, res){
	res.sendFile(__dirname + "/public/annotate.html");
});

app.get('/doAnnotate/:task_id', function(req, res){
	
	console.log("annotating .. ");
	res.render(__dirname + "/public/doAnnotation.html");
});

app.get('/getJob/:task_id', function(req, res){

	console.log("getting that job.. ");
	Job.getJobs(job, function(err, job){
		if(err){
			throw err;
		}

		job_toClient = Job.formatResponse(job);
		res.json(job_toClient);
	}, 'where _id={task_id}');
});

app.get('/doPost', function(req, res){
	send.doPost();
	res.send("Sent!");

});

//TODO authentication API KEY
app.post('/v1/task/annotation', function(req, res){
	
	console.log("received..");
	var job = req.body;
	
	Job.addJobs(job, function(err, job_created){
		if(err){
			throw err;
		}

		job_toClient = Job.formatResponse(job_created);
		res.json(job_toClient);
	});

});

app.listen(port);
console.log('Running on port... ' + port);