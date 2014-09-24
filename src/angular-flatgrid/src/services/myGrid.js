flatgridServices.service('myGrid',function() {	
	var FG,data;
    return {
         getInstance : function () { return FG; }
        ,setData : function(_data) { data = _data; }
        ,convertDate : function(dt) {
		    var dp = dt ? dt : new Date(),
			    convertedDate = dp.getDate() +
		                        "/"+(dp.getMonth()+1) +
		                        "/"+dp.getFullYear() +
		                        " "+(dp.getHours()<10?'0'+dp.getHours():dp.getHours()) +
		                        ":"+(dp.getMinutes()<10?'0'+dp.getMinutes():dp.getMinutes());
		    return convertedDate;
	    }
	    ,create : function(scope,o) {

        	//Create instance
        	FG = new FlatGrid.Grid(scope,o);

        	//Rows
			FG.rows = data.rows;

			//Columns
			FG.columns = data.columns;
			
			//Setters
			FG.setRows();
			FG.setGridOptions();
			FG.setColumns();

			//Add FORM (add row) Model
			var item = {},
				freqObject = {
					"Days" : [{	Text:"Monday",Status : false
					},{	Text:"Tuesday",Status : false
					},{	Text:"Wednesday",Status : false
					},{	Text:"Thursday",Status : false
					},{	Text:"Friday",Status : false
					},{	Text:"Saturday",Status : false
					},{	Text:"Sunday",Status : false	}]
					,"Repeat" : "Daily"
				};
				item.Config = { loading : false };
				item.data = {};

			for(var x=0;x<=FG.columns.length-1;x++) {
				var coltype = FG.columns[x].Form,
					col 	= FG.columns[x].Name;
				if(coltype) {
					if(coltype == 'planner' )  					item.data[col] = freqObject;
					if(coltype == 'datetime' && col !="Next" ) 	item.data[col] = this.convertDate();
					if(coltype == 'checkbox' ) 					item.data[col] = false;
					if(coltype == 'checkbox' && col=='Active' )	item.data[col] = true;
				} else {
					//Set default column type
					FG.columns[x].Form = "input";
				}
			};


			delete item.Id;
			FG.Cache = item;
			FG.setForm();
        }
    };
});