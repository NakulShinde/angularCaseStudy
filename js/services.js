angular.module("matchesServices", ["myApp.config"])
.factory("allMatchesService", ["$http", "HOST", function($http, HOST) {
	var allMatchesService = {};

	allMatchesService.getMatchesSummary = function(callBack) {
		$http.get(HOST + '/cricket/upcomingMatches')
		.success(function(response) {
			callBack(new MatchesSummary(response));
		})
		.error(function(response) {
			callBack(new MatchesSummary({error: true}));
		});
	};

	return allMatchesService;
}]);

angular.module("newsServices", ["myApp.config"])
.factory("allNewsService", ["$http", "HOST", function($http, HOST) {
	var allNewsService = {};

	allNewsService.getNewsSummary = function(callBack) {
		$http.get(HOST + '/cricket/news')
		.success(function(response) {
			console.log(response);
			callBack(new NewsSummary(response));
		})
		.error(function(response) {
			console.log(response);
			callBack(new NewsSummary({error: true}));
		});
	};

	return allNewsService;
}]);

angular.module("liveServices", ["myApp.config"])
.factory("allLiveService", ["$http", "HOST", function($http, HOST) {
	var allLiveService = {};

	allLiveService.getLiveSummary = function(callBack) {
		$http.get(HOST + '/cricket/liveScoresSummery')
		.success(function(response) {
			console.log(response);
			callBack(new LiveSummary(response));
		})
		.error(function(response) {
			console.log(response);
			callBack(new LiveSummary({error: true}));
		});
	};

	return allLiveService;
}]);