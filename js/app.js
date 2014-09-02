angular.module("cricketaddict", [
	"ngRoute",
	"ngAnimate",
	"controllers",
	"myApp.config"
])
.config(["$routeProvider", '$httpProvider', function($routeProvider,$httpProvider) {
	$routeProvider
	.when("/home", {
		templateUrl: "template/home.html"
	})
	.when("/liveScores", {
		templateUrl: "template/live.html"
	})
	.otherwise({
      redirectTo:'/home'
    });

	//handle cross domain call
	 $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

angular.module('myApp.config', []).constant('HOST','http://localhost:3000');
