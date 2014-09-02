function NewsSummary(obj) {
	if (obj.error) {
		this.status = "error";
	} else {		
		try{
			this.allNews = obj.query.results.item ;
			this.status = "success";			
		}catch(e){
			console.log("Error while parsing");
			this.status = "error";
			return;
		}		
	}
}
