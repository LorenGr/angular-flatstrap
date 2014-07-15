flatgridDirectives.directive('flatGrid',[
	'$compile'	
	,'$templateCache'
	,'myGrid'
	,function(
			 $compile
			,$templateCache
			,myGrid
		) {
		return {
			restrict 	: "AEC",
			replace : "true",
			controller : "flatGrid_Controller",	
			scope : true,
			compile : function() {
				return {					
					pre : function($scope,iElement,iAttrs) {
						var options = iAttrs.flatGrid;
						var dataWatcher = function(data) {
							if(data) {		
								//Call grid service
								myGrid.setData(data);
								myGrid.create($scope, data.options);
								var grid = myGrid.getInstance();

								//Clean first
								iElement.empty();

								//Apply template
								var gridTemplate = "/src/templates/flatgrid.html";											
								iElement.append($compile($templateCache.get(gridTemplate))($scope));
							}
						}
						$scope.$parent.$watch(options, dataWatcher);															
					}
				}	
			}
		}
	}
]);
