var doAnnotationApp = angular.module('doAnnotation', []);

/*doAnnotationApp.config(function ($routeProvider) {

  $routeProvider
      .when('/:task_id',{
        templateUrl: ""
      })

});*/

doAnnotationApp.controller('AnnotationCtrl', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams) {
    
var refresh = function() {

  $scope.task_id = $routeParams.task_id;
  $http.get('/getJob/{task_id}').success(function(response) {
    $scope.job = response;
  });

};

var getParam = function(){

  
  $http.get('/{task_id}').success(function(response) {
    console.log("I got the data I requested");
    $scope.joblist = response;
    $scope.job = "";
  });

};

refresh();

$scope.doAnnotation = function(task_id) {

	console.log("called");
  $window.location.href = '/doAnnotation.html';
	$http.get('/doAnnotate/{task_id}').success(function(response) {
		console.log(":3");
	});

	//var id = job._id;
	//console.log("annotating job " + id);

};

/*
$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}*/

}]);﻿
