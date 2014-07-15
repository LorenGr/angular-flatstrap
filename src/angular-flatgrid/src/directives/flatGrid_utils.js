flatgridDirectives.directive('fgAutoFocus',function($timeout){
	return {
		restrict : "A",
		link : function(scope,elem,attrs) {
			if(attrs.fgAutoFocus==true || attrs.fgAutoFocus=="true") {
				$timeout( function () { elem[0].focus(); },200,false);
			}
		}
	}
});

flatgridDirectives.directive('fgFocusMe',function($timeout) {
	return {
		restrict 	: "A",				
		link : function(scope,elem,attrs) {
			
			var attr = scope.$eval(attrs.fgFocusMe),
			    model = attr.watch;

	      	scope.$watch(model, function(value) {
	        	if( value === attr.match) { 
	          		$timeout(function() {
	            		elem[0].focus();
					},0,false);
	        	} 			        	 
	      	});
		}
	}
});

flatgridDirectives.directive('fgFocus',function() {
	return function (scope, elem, attrs) {
        elem.bind('focus', function (event) {		            
            scope.$apply(attrs.fgFocus);
        });
    };
});

flatgridDirectives.directive('fgEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keyup", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.fgEnter);
                });
                event.preventDefault();
            }
        });
    };
});

flatgridDirectives.directive('fgAlphabeticPressed', function () {
	return function (scope, element, attrs) {
		element.bind("keyup", function (event) {
			if( event.which >= 48 && event.which <= 90 ) {
				scope.$apply(function (){
					scope.$eval(attrs.fgAlphabeticPressed);
				});
				event.preventDefault();
			}
		});
	};
});

flatgridDirectives.directive('fgBlur',function($timeout) {
    return function (scope, elem, attrs) {
        elem.bind('blur', function (event) {
            $timeout(function() {
                scope.$apply(attrs.fgBlur);
			},0,false);
        });
    };
});
flatgridDirectives.directive('extractDate',function(){
   return  {
       require : 'ngModel',
       link : function(scope, element, attrs, modelCtrl) {
           var transformedInput = new Date(scope.$eval(attrs.extractDate));
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
           return transformedInput;
       }
   };
});
flatgridDirectives.directive('fgEscape', function () {
    return function (scope, element, attrs) {
        element.bind("keyup", function (event) {
            if(event.which === 27) {
                scope.$apply(function (){
                    scope.$eval(attrs.fgEscape);
                });
                event.preventDefault();
            }
        });
    };
});

flatgridDirectives.directive('fgBlurOnEscape', function ($timeout) {
    return function (scope, elem, attrs) {
        elem.bind("keydown", function (event) {
			if(event.which === 27) {
				scope.$apply(function (){
					scope.$eval(attrs.fgBlurOnEscape);
				});
				event.preventDefault();
				$timeout(function(){
					elem[0].blur();
				},0,false);
            }
        });
    };
});


flatgridDirectives.directive('fgForcedFocus', function ($timeout) {
	return {
		scope : {
			fgForcedFocus : "&",
			fgForcedFocusCb : "&",
			fgForceFocus : "="
		},
		link: function (scope, elem, attrs) {
			var conf = scope.fgForcedFocus();
			if(conf.firstRow) {
				scope.$parent.$on("rowReady",function(){
					if(scope.fgForceFocus) {
						var colIndex = scope.fgForceFocus.col;
						if(colIndex == 'auto') {
							var focusable = elem.closest("div.tr").find("input:tabbable").first();
							colIndex = focusable.parent("div.td").index();
						}
						if (conf.currentPage == scope.fgForceFocus.page) {
							$timeout(function(){
								elem.find("div.td:eq("+colIndex+")").find("input").focus();
							});
							scope.fgForcedFocusCb();
						}
					}
				});
			}
		}
	};
});
flatgridDirectives.directive('fgFirstRowReady', function ($timeout) {
	return function (scope, elem, attrs) {
		if(attrs.fgFirstRowReady.toLowerCase() === "true") {
			elem.ready(function(){
				scope.$emit("rowReady");
			});
		}
	};
});
flatgridDirectives.directive('fgTabulation', function ($timeout) {
	return function (scope, elem, attrs) {
		elem.bind("keydown", function (event) {
			if(event.which === 9 && attrs.fgPosition.toLowerCase() === "true") {
				$timeout(function(){
					scope.$apply(attrs.fgTabulation);
					event.preventDefault();
				},0,false);
			}
		});
	};
});
flatgridDirectives.directive('fgGotoNextRow', function ($timeout) {
	return function (scope, elem, attrs) {
		elem.bind("keyup", function (event) {
			if(event.which === 13) { //ENTER
				$timeout(function(){

					var ref = elem.parent("div.td"),
						startRowIndex = ref.parent("div.tr").index(),
						rows = ref.parent("div.tr").parent("div.tbody").children().length,
						colindex = ref.index();

					for(var x=startRowIndex ; x<=rows-1 ; x++) {

						var cell = elem.closest("div.tbody").find("div.tr:eq("+x+")").find('div.td'),
							field = cell.parent("div.tr").next("div.tr").children().eq(colindex).find("input");

						if( x!=rows-1 ) {
							if( !field.prop("disabled") ) {
								field.focus().select();
								break;
							}
						} else {
							scope.$apply(attrs.fgEnterTabulation);
							break;
						}
					}

				},0,false);
			}
		});
	};
});

flatgridDirectives.directive('fgToggler', function ($timeout) {
    return  {
        require : 'ngModel',
        link : function(scope, element, attrs, modelCtrl) {
			$timeout(function(){
				scope.$watch(attrs.ngModel,function(e) { setter(); });
				setter();
			},0,false);
			function setter() {
				element.parent("td").next().find("input").prop("disabled",modelCtrl.$modelValue==false);
			}
        }
    };
});

flatgridDirectives.directive('fitRows', function ($window) {
	return  {
		link : function($scope,iElement,iAttrs) {
			var el = jQuery("#gridScrollHeight");
			angular.element($window).unbind("resize");

			iElement.ready(function() {
				var watcher = $scope.$watch("activeListSize", function () {
					if ($scope.activeListSize > 0) {
						setter();
						angular.element($window).bind("resize", function () {
							$scope.$apply(function () {
								setter();
							});
						});
					}
				});
			});

			function setter() {
				$scope.FG.Config.Pager.PagerTotal = $scope.activeListSize;
				$scope.FG.Config.Pager.ListSize = Math.round( el[0].clientHeight / el.find(".tr:first-child")[0].clientHeight );
				$scope.NumPages = Math.ceil($scope.FG.Config.Pager.PagerTotal / $scope.FG.Config.Pager.ListSize);
			}
		}
	};
});



