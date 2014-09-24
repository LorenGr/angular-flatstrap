flatgridFilters.filter("formatDate",function(){
   return function(dt,format) {

	   var o,newDate = dt ? new Date(dt) : new Date(),
		   mth = newDate.getMonth()+ 1,
		   hrs = newDate.getHours() < 10 ? "0"+newDate.getHours() : newDate.getHours(),
		   min = newDate.getMinutes() < 10 ? "0"+newDate.getMinutes() : newDate.getMinutes();

	   switch(format) {
		   case "date" :
			   o = newDate.getDate()
				   + "-" + mth
				   + "-" + newDate.getFullYear();
			   break;
		   case "datetimepicker" :
			   o = newDate.getDate()
				   + "/" + mth
				   + "/" + newDate.getFullYear()
				   + " " + hrs + ":" + min;
			   break;
		   case "time" :
			   o = hrs + ":" + min;
			   break;
	   }
	   return o;
   }
});

flatgridFilters.filter('startFrom', function () {
	return function (input, start) {
		start = +start; //parse to int
		return input.slice(start);
	};
});

flatgridFilters.filter('matchName', function() {
	return function(items, name) {
		var arrayToReturn = [];
		for (var i=0; i<items.length; i++){

			var match = false,
				searchColumns = [
					 "Name"
					,"Message"
				];
			for(var x=0;x<=searchColumns.length-1;x++) {
				if (items[i].data[searchColumns[x]]) {
					if ( items[i].data[searchColumns[x]].toLowerCase().indexOf(name.toLowerCase()) >= 0) {
						match = true;
					}
				}
			}
			if(match) arrayToReturn.push(items[i]);
		}
		return arrayToReturn;
	};
});
