flatgridDirectives.directive('planner',function ($parse,$timeout){
	return {
		 restrict 	: "A"
		,link : function(scope,elem,attrs) {
			var model = $parse(attrs.checkActive);
			scope.$watch(model,function(value) {
				if(value) {
					console.log("watcher triggered");
					$timeout(function() {
						jQuery(".planner_plugin").css({
							 "top" 	: elem[0].offsetTop + "px"
							,"left" : elem[0].offsetLeft + "px"
						}).fadeIn("fast");
					});
				} else {
					jQuery(".planner_plugin").hide();
				}
			});
		}
	}
});