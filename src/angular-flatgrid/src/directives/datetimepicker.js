flatgridDirectives.directive('dateTimePicker',function($timeout,$filter) {
    return {
        require : '?ngModel'
        ,restrict 	: "A",
		scope : {
			dateTimePickerCb : "&"
		},
        link : function(scope,elem,attrs,ngModel) {

			if(ngModel) {
				ngModel.$render = function () {//
					//ngModel.$setViewValue($filter('formatDate')(ngModel.$modelValue, "datetimepicker"));
					ngModel.$setViewValue(ngModel.$modelValue);
				}
			}
			elem.parent().bind("click",function() {
				elem.datetimepicker({
					format : 'd/m/Y-H:i',
					step : 5,
					todayButton : false,
					onChangeDateTime:function(dp,$input) {
						ngModel.$setViewValue(dp);
					},
					onClose : function() {
						$timeout(function(){
							scope.dateTimePickerCb();
						},300);
					}
				});
				elem.datetimepicker("show");
			});
        }
    }
});

