var annotationApp = angular.module('annotation', []);
annotationApp.controller('AppCtrl', ['$scope', '$http', '$window', '$log', function($scope, $http, $window, $log) {
var log = console.log.bind(this);    
console.log("Hello World from controller");

var annotator;

var refresh = function() {
  $http.get('/getJobs').success(function(response) {
    console.log("I got the data I requested");
    $scope.joblist = response;
    $scope.job = "";
  });


  /*var annotator = new BBoxAnnotator({
	    url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQAARqKEq0X7eMZ1WaBI9EDPUeelpl2FDdl3XpEXwnPq5HFynVVa9zNLes",
	    input_method: 'fixed', 
	    labels: "object",
	    onchange: function(annotation) {
	      $("#annotation_data").val(JSON.stringify(annotation));
	    }
	  });*/

};

refresh();
generateAnnotator();

function generateAnnotator () {
	console.log("here");
	$scope.annotator = new BBoxAnnotator({
	    url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQAARqKEq0X7eMZ1WaBI9EDPUeelpl2FDdl3XpEXwnPq5HFynVVa9zNLes",
	    input_method: 'fixed', 
	    labels: "object",
	    onchange: function(annotation) {
	      $("#annotation_data").val(JSON.stringify(annotation));
	    }
	  });
	log("Annotator Obj After Create: ", $scope.annotator);
};

$scope.doAnnotation = function(job) {
	log("Annotator Obj: ", $scope.annotator);

	$scope.job = job;
	$(".image_frame").remove();

	$scope.annotator = new BBoxAnnotator({
		url: job.attachment,
		onchange: function(annotation) {
		  $("#annotation_data").val(JSON.stringify(annotation));
		}
	});


};

}]);﻿
