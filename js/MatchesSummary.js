function MatchesSummary(obj) {
	if (obj.error) {
		this.status = "error";
	} else {		
		try{
			this.allMatches = obj.query.results.Match ;
			this.status = "success";
			this.convertDate = function(date){
				var d = new Date(date);
				return this.toUTCDate(d);
			}
			this.toUTCDate = function(date){
    			var _utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(), date.getMinutes(), date.getSeconds());
    			return _utc;
  			};
		}catch(e){
			console.log("Error while parsing");
			this.status = "error";
			return;
		}		
	}
}