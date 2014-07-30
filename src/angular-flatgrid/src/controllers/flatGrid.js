flatgridControllers.controller('flatGrid_Controller',[
	'$scope'
	,'$timeout'
	,'$filter'
	,function($scope,$timeout,$filter) {
		
		//keep track of what to UNEDIT on BLUR of fields (while editing)
		var previousIndex=false;

		$scope.forcedFocus = { page : 0 , col : 0 };
		$scope.search = "";
		$scope.activeListSize = 0;
		$scope.nodata = false;
		$scope.activeRowId = null;

		//Planner
		$scope._activePlanner = false;
		$scope.Repeaters = ["Daily","Weekly","Monthly","Unique"];

		$scope.togglePlanner = function(open,planner){
			$scope._activePlanner = open ? planner : false;
		}
		$scope.sortBy = function(sorter) {
			$scope.FG.Config.predicate = sorter;
			$scope.FG.Config.reverse = !$scope.FG.Config.reverse;
			$scope.sorter = function(i) { return i.data[$scope.FG.Config.predicate]; }
		}
		$scope.sorter = null;
		
		$scope.closeThis = function() {
			if(previousIndex!=false) $scope.closeEditMode($scope.findById(previousIndex));
		}
		$scope.editThis = function(item,val) {					
			if(!item.Config.running) {
				$timeout(function () {
					previousIndex = item.Id;
					item.Config.editing = val;
					item.Config.model = 'Cache';
				});
			}
		}
		$scope.selectRow = function(row) {
			if($scope.FG.Config.onrowfocus) {
				$scope[$scope.FG.Config.onrowfocus](row);
				$scope.activeRowId = row.Id;
			}
		}

        $scope.formButtonHandler = function(item) {
            if($scope.FG.Config.onformbuttonclick) $scope[$scope.FG.Config.onformbuttonclick](item);
        }

		//Used in dropdownaction type rows
		$scope.fix = function(item,action){
			if($scope.FG.Config.onaction) {
				$scope[$scope.FG.Config.onaction](item,action).then(function(){
					$scope.FG.rows.splice($scope.findById(item.Id,true),1);
				});
			}
		}

		$scope.nextPage = function(colindex) {
			if(colindex != 'reset' && $scope.currentPage < $scope.NumPages) {
				$scope.currentPage++;
				$scope.forcedFocus = { page : $scope.currentPage,col : colindex };
			}
			if(colindex == 'reset') $scope.forcedFocus = { page : 0 , col : 0 };
		}
		function getCleanRows() {
			var o = [],rowsL=$scope.FG.rows.length-1;
			for(var x=0;x<=rowsL;x++) { o.push($scope.FG.rows[x].data); }
			return o;
		}
		$scope.$on("saveall",function(){ setRows("onsaveall",true); });
		$scope.$on("undoall",function(){ setRows("onundoall"); });

		function setRows(action,emitRows) {
			var rowsL=$scope.FG.rows.length- 1,cleanRows=emitRows?getCleanRows():'';
			$scope[$scope.FG.Config[action]](cleanRows).then(function(r){
				for(var x=0;x<=rowsL;x++) {
					$scope.FG.rows[x].data = angular.copy(r[x]);
					$scope.FG.rows[x].Cache = angular.copy(r[x]);
				}
			});
		}

		$scope.remove = function(pkg) {
			pkg.Config.loading = true;
			if($scope.FG.Config.ondelete) {
				$scope[$scope.FG.Config.ondelete](pkg).then(function(r){
					if(r) {
						pkg.Cache = r;
						pkg.data = r; //display server return
					} else {
						$scope.FG.rows.splice($scope.findById(pkg.Id,true),1);
					}
					pkg.Config.loading = false;
				},function(){
					pkg.Config.loading = false;
				});;
			}
		}
		var addRows = function(arr) {
			for(var x=0;x<=arr.length-1;x++) {
				if(!arr[x].Id) arr[x].Id = x+1;
				$scope.FG.rows.unshift(arr[x]);
			}
		}
		var process = function(row,grid) { return new FlatGrid.Row(row, grid); };

		$scope.add = function(pkg) {
			pkg.Config.loading = true;

			if($scope.FG.Config.onadd) {
				$scope[$scope.FG.Config.onadd](pkg).then(function(r) {
					var p = angular.copy(r);
					if(Array.isArray(r)) {						
						for(var x=0;x<=r.length-1;x++) {							
							$scope.FG.rows.unshift(process(p[x]));
							$scope.nodata = false;
						}
					} else {						
						$scope.FG.rows.unshift(process(p));
						$scope.nodata = false;
					}					
					pkg.Config.loading = false;
					$scope.FG.pkg.data.Name = "";
				});
			} else {
				$scope.FG.rows.unshift(pkg);	
			}

		};
		$scope.cancelThis = function(item) { item.Cache = item.data; };

		$scope.closeEditMode = function(item) {
			item.Config.editing = false;
			item.Config.model = 'data';
			item.Cache = angular.copy(item.data);
		}

		$scope.confirmPlanner = function(pkg,ignoreCache,repeaterType) {
			$scope.confirm(pkg,ignoreCache);
			if(repeaterType!="Weekly") $timeout(function(){$scope.togglePlanner(false)},200);
		}
		$scope.confirm = function(pkg,ignoreCache,index,col) {

			function validatePkg() {
				if (col) {
					return ( pkg.data[col] != pkg.Cache[col] && pkg.Cache[col] != '');
				} else {
					return true;
				}
			}
			if(!pkg.Config.running) {
				pkg.Config.loading = true;
				var p = angular.copy(pkg);
				if(validatePkg() ) {
					if(!ignoreCache) p.data = p.Cache;//send saved data to callback
					$scope[$scope.FG.Config.onsave](p).then(function(r) {
						pkg.Config.loading = false;
						pkg.Cache = r;
						pkg.data = r; //display server return
						$scope.closeEditMode(pkg);
					},function(r){
						//error
					});
				} else {
					pkg.Config.loading = false;
					$scope.closeEditMode(pkg);
				}
			}
		};

		$scope.findById = function(id,index) {
			var i;
			angular.forEach($scope.FG.rows,function(val,x){
				if(val.Id == id) {
					i = x;
					return false;
				}
			});
			if(index) {
				return i;
			} else {
				return $scope.FG.rows[i];	
			}				
		}
		$scope.$watch("search",function(){
			//Immidiately send pager to Page 1 as soon as a new search keyword is typed
			$scope.currentPage = 1;
		});

		$scope.rowsArray = function() {
			var myArray;
			if($scope.search.length) {
				myArray = $filter('matchName')($scope.FG.rows,$scope.search);
			} else {
				myArray = $scope.FG.rows;
			}
			$scope.activeListSize = myArray.length;
			return $scope.FG.Config.pagination ? myArray.slice((($scope.currentPage-1)*$scope.FG.Config.Pager.ListSize), (($scope.currentPage)*$scope.FG.Config.Pager.ListSize)) : myArray;
		}
	}
]);

