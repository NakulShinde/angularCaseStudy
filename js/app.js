angular.module("cricketaddict", ["ngRoute"])
.config(["$routeProvider", '$httpProvider', function($routeProvider,$httpProvider) {
	
	$routeProvider
	.when("/home", {
		templateUrl: "template/home.html"
	}).when("/liveScores", {
		templateUrl: "template/live.html"
	})
	.otherwise({
      redirectTo:'/home'
    });	

	 //handle cross domain call 
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
					return $scope.matchesSummary.toUTCDate(d);
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
])
.controller("liveSummaryController", ["$scope", "$http",
	function($scope, $http) {
		
		$scope.liveSummary 			= new Object();
		$scope.liveSummary.status 	= "loading";

		$http.get('http://localhost:3000/cricket/liveScoresSummery')
		.success(function(response) {
			console.log(response);
			
			try{
				$scope.liveSummary.status 		= "success";
				if(response.query.results == null){

					$scope.liveSummary.noLiveMatches 	= true;
				}else{
					
					$scope.liveSummary.allLive 			= response.query.results.Scorecard ;
					$scope.liveSummary.noLiveMatches 	= false;
					
					$scope.liveSummary.getLiveScoreList 	= function(){
						
						var liveScoreArr = new Array();
						if($scope.liveSummary.allLive instanceof Array){
							
							for (var i = $scope.liveSummary.allLive.length - 1; i >= 0; i--) {
								liveScoreArr.push($scope.liveSummary.allLive[i]);
							}
						}else if($scope.liveSummary.allLive instanceof Object){
							
							liveScoreArr.push($scope.liveSummary.allLive);
						}
			
						var scoreList = new Array();
						for (var i = liveScoreArr.length - 1; i >= 0; i--) {
							
							var liveScore 		= new Object();
							liveScore["title"] 	=	liveScoreArr[i].teams[0].fn+ " Vs "+ liveScoreArr[i].teams[1].fn;				
							
							liveScore["homeTeamCode"] 	= liveScoreArr[i].teams[0].logo.std;
							liveScore["awayTeamCode"] 	= liveScoreArr[i].teams[1].logo.std;

							var past_ings
							if(liveScoreArr[i].past_ings instanceof Array){
								past_ings = liveScoreArr[i].past_ings[0];
							}else if(liveScoreArr[i].past_ings instanceof Object){
								past_ings = liveScoreArr[i].past_ings;
							}

							var batTeam 		= (past_ings.s.a.i == liveScoreArr[i].teams[0].i)? liveScoreArr[i].teams[0].sn : liveScoreArr[i].teams[1].sn;
							var score 			= past_ings.s.a.r+"/"+past_ings.s.a.w+" ("+past_ings.s.a.o+" ov)";
							console.log(batTeam+" "+score);
							
							liveScore["score"] 	= batTeam+" "+score;

							liveScore["tagLine"]= (past_ings.s.a.tl == undefined)? "" : past_ings.s.a.tl;

							scoreList.push(liveScore);
						}
						console.log(scoreList);
						return scoreList;
					};

					$scope.liveSummary.liveScoreList  = $scope.liveSummary.getLiveScoreList();
				}

			}catch(e){
				console.log("Error while parsing");
				$scope.liveSummary.status = "error";
				return;
			}
		})
		.error(function(response) {
			console.log(response);
			$scope.liveSummary.status = "error";
		});
	}
]);