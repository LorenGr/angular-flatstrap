var flatgridServices 	= angular.module('flatgrid.services', []);
var flatgridDirectives 	= angular.module('flatgrid.directives', []);
var flatgridFilters 	= angular.module('flatgrid.filters', []);
var flatgridControllers = angular.module('flatgrid.controllers', []);
angular.module('flatstrap.flatgrid',[
	 'flatgrid.services'
	,'flatgrid.directives'
	,'flatgrid.controllers'
	,'flatgrid.filters'
	,'flatgrid.templates'
	,'ui.multiselect'
	,'ngMessages'
]);
var FlatGrid = {
	defaults : {
		config : {
			defaultSortOrder : "asc",
			controls : true,
			postForm : true,
			columnTitles : true,
			pagination : true,
			search : true
		}
	},
	Grid  : function($scope, o) {		
		var self = this,
			ord = o.defaultSortOrder ||  FlatGrid.defaults.config.defaultSortOrder,
			order = ord == 'asc' ? true : false;

		self.rowManager = new FlatGrid.RowManager(self);

		//Main FLATGRID Scope object
		$scope.FG = {};

		self.setGridOptions = function() {
			$scope.FG.Config = o;
			angular.forEach(FlatGrid.defaults.config,function(value1,key1){
				var found = false;
				angular.forEach($scope.FG.Config,function(value2,key2){
					if(!found) found = key2 == key1;
				});
				if(!found) $scope.FG.Config[key1] = value1;
			});
			$scope.FG.Config.reverse 	= order;
			$scope.FG.Config.predicate 	= o.defaultSort != undefined  ? o.defaultSort : self.getFirstColumnName();
			$scope.FG.Config.Pager 		= {
				PagerSize : 12,
				ListSize  : 8,
				currentPage : 1
			}
		}
		self.getFirstColumnName = function() {
			return self.columns[0].Name;
		}
		self.setForm = function(o) {
			$scope.FG.pkg = self.Cache;
		};
		self.setColumns = function() {
			$scope.FG.columns = self.columns;
		};
		self.setRows = function() {			
			self.rowManager.fixRows(); //set cache/config values
			$scope.FG.rows = self.rows.length ? self.rows: [];
			$scope.nodata = !self.rows.length;
			$scope.$emit("gridRowsAdded");//
		};
	},
	Row : function(data) {
		this.Id = data.Id || FlatGrid.Tools().newId();
		//this.Id = grid ? grid.rowManager.setId(data) : FlatGrid.Tools().newId();
		this.data = angular.copy(data);
		this.Cache = angular.copy(data);
		this.Config = {
			editing : false, //edit row flag
			loading : false, //loading indicator/status			
			model : 'data' //holds a model reference
		};
		if(data.Running) this.Config.running = data.Running; //for row items that have a cycle (eg:scheduled actions)
	},
	RowManager : function(grid) {
		var self = this;
		self.fixRows = function() {
			angular.forEach(grid.rows,function(val,x){
				grid.rows[x] = new FlatGrid.Row(grid.rows[x]);
			});
		};
		self.setId = function(item,index) {
			//Use item id if available, else use index provided, else get new id based on current rows amount 
			return item ? ( item.Id ? item.Id : ( index ? index : grid.rowManager.newId() ) ) 
				        : ( index ? index : grid.rowManager.newId() ); 
		};		
    	self.newId = function() { 
		    return FlatGrid.Tools().newId();
		}
	},
	Tools : function() {
		return {
			newId : function() {
				function _p8(s) {
					var p = (Math.random().toString(16)+"000000000").substr(2,8);
					return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
				}
				return _p8() + _p8(true) + _p8(true) + _p8();
			}
		}
	}
}		
