flatgridDirectives.directive('dateTimePicker',function(myGrid) {
    return {
        require : '?ngModel'
        ,restrict 	: "A",
        link : function(scope,elem,attrs,ngModel) {

			function openPicker() {
				elem.datetimepicker({
					value : ngModel.$modelValue,
					format : 'd/m/Y H:i',
					step : 5,
					todayButton : false,
					closeOnDateSelect : false,
					onChangeDateTime:function(dt,$input) {
						var dp = angular.copy(dt);
						scope.$apply(function(){
							ngModel.$setViewValue(myGrid.convertDate(dp));
						});
					},
					onClose : function() {
						elem.next().find(".datetimepicker").removeClass("activeElement");
					}
				});
				elem.datetimepicker("show");
			}
	        elem.bind("click",function(evt) {
		        openPicker();
		        elem.next().find(".datetimepicker").addClass("activeElement");
		    });
        }
    }
});

