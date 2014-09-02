angular.module("cricketaddict", [])
.config(['$httpProvider', function($httpProvider) {
	
	 //cross domain call handle
	 $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller("matchesSummaryController", ["$scope", "$http",
	function($scope, $http) {

		$scope.matchesSummary 			= new Object();
		$scope.matchesSummary.status 	= "loading";

		$http.get('http://localhost:3000/cricket/upcomingMatches')
		.success(function(response) {
			console.log(response);
			
			try{
				$scope.matchesSummary.allMatches = response.query.results.Match ;
				$scope.matchesSummary.status = "success";
				$scope.matchesSummary.convertDate = function(date){
					var d = new Date(date);
					return this.toUTCDate(d);
				}
				$scope.matchesSummary.toUTCDate = function(date){
	    			var _utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(), date.getMinutes(), date.getSeconds());
	    			return _utc;
	  			};
			}catch(e){
				console.log("Error while parsing");
				$scope.matchesSummary.status = "error";
				return;
			}		
			
		})
		.error(function(response) {
			
			console.log(response);
			$scope.matchesSummary.status = "error";
		});
	}
])
.controller("newsSummaryController", ["$scope", "$http",
	function($scope, $http) {
		
		$scope.newsSummary 			= new Object();
		$scope.newsSummary.status 	= "loading";

		$http.get('http://localhost:3000/cricket/news')
		.success(function(response) {
			console.log(response);
			try{
				$scope.newsSummary.allNews = response.query.results.item ;
				$scope.newsSummary.status = "success";			
			}catch(e){
				console.log("Error while parsing");
				$scope.newsSummary.status = "error";
				return;
			}		
		})
		.error(function(response) {
			console.log(response);
			$scope.newsSummary.status = "error";
		});

	}
]);

