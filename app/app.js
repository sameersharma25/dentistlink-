var app = angular.module("dentistApp", ['ngRoute']);
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
	.when("/", {
		//templateUrl : () => "app/views/User/create.html"
		templateUrl : () => "app/views/Login/welcome.html"
		//templateUrl : () => "app/views/Appointment/appointment-edit-form.html"
		//templateUrl : () => "app/views/Login/login.html"
		//templateUrl : () => "app/views/Login/welcome.html"
		//templateUrl : () => "app/views/Login/reset-password.html"
	})
	.when("/login", {
		templateUrl : () => "app/views/Login/login.html",
		controller: "LoginController"
	})
	.otherwise({
		//redirectTo : "/"
		template:'<div class="text-center"><h2>Page not found::</h2></div>'
	});
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
	console.log($locationProvider)
}]);