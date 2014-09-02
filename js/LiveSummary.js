function LiveSummary(obj) {
	if (obj.error) {
		this.status = "error";
	} else {		
		try{
			this.status 		= "success";
			if(obj.query.results == null){

				this.noLiveMatches 	= true;
			}else{
				
				this.allLive 		= obj.query.results.Scorecard ;
				this.noLiveMatches 	= false;
				
				this.getLiveScoreList 	= function(){
					
					var liveScoreArr = new Array();
					if(this.allLive instanceof Array){
						
						for (var i = this.allLive.length - 1; i >= 0; i--) {
							liveScoreArr.push(this.allLive[i]);
						}
					}else if(this.allLive instanceof Object){
						
						liveScoreArr.push(this.allLive);
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

				this.liveScoreList  = this.getLiveScoreList();
			}

		}catch(e){
			console.log("Error while parsing");
			this.status = "error";
			return;
		}		
	}
} 