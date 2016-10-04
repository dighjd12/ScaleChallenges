var annotationApp = angular.module('annotation', []);
annotationApp.controller('AppCtrl', ['$scope', '$http', '$window', '$log', function($scope, $http, $window, $log) {
var log = console.log.bind(this);    
console.log("Hello World from controller");

/* refreshes the list of available tasks */
var refresh = function() {
  $http.get('/getJobs').success(function(response) {
    console.log("I got the data I requested");
    $scope.joblist = response;
    $scope.job = "";
	$scope.annotator = null;
  });
};

refresh();

/* initiates the bbox to work on the task */
$scope.doAnnotation = function(job) {
	log("Annotator Obj: ", $scope.annotator);

	$scope.job = job;
	$(".image_frame").remove();

	$scope.annotator = new BBoxAnnotator({
		url: job.attachment,
		input_method: 'select',
		show_label: job.with_labels,
		labels: job.objects_to_annotate,
		onchange: function(annotation) {
		  $("#annotation_data").val(JSON.stringify(annotation));
		}
	});
};

/* completes the task */
$scope.finishAnnotation = function() {
	if ($scope.annotator == null){
		log("annotator null!");
		return;
	}
	log("finishing annotation");
	var curr_job = $scope.job;

	//simply remove from the database for now
	$http.delete("/deleteJobs/" + curr_job._id).success(function(response) {
	    console.log("successfully deleted");
	    
		$scope.job = "";
		$scope.annotator = null;
		$(".image_frame").remove();
		refresh();
  	});

};

}]);﻿
