contextualTooltipDirectives.directive('contextualTooltip',[
	'$timeout'
	,function(
		$timeout
	) {
		return {
			restrict: "A",
			scope: true,
			link: function (scope, elem, attrs) {

				//Init
				var timer , popper
					, field 			= jQuery(elem[0])
					, tooltipType 		= attrs['contextualTooltip']
					, tooltipPos 		= "top"
					, uid 				= 'id' + (new Date()).getTime()
					, ttInstance 		= "#" + uid
					, ph 				= jQuery("body")
					, ttOpen 			= false
					, tooltipPos 		= attrs.contextualTooltipPos || "top"
					, popperInterval 	= 280
					, autohideInterval 	= 10000;

				//Attach events
				elem.bind("mouseover", function () {
					popper = $timeout(function () {
						ttOpen = true;
						off(); //remove previous tooltips
						ph.append(createLoader());
						styleTooltip(); //style loader

						//Directive attribute needs to be a promise (main data source)
						scope.$apply(attrs.contextualTooltip).then(function (data) {
							if (ttOpen) {
								off(); //remove loader
								ph.append(createTooltip(data));
								styleTooltip();
								timer = $timeout(function () {
									off(); //auto-hide feature
								}, autohideInterval, false);
							}
						},function(why){
							ttOpen = false;
							off();
						});
					}, popperInterval, false);
				});
				elem.bind("mouseout", function () {
					ttOpen = false;
					off();
				});
				function off() {
					$timeout.cancel(timer);
					$timeout.cancel(popper);
					jQuery(".contextual-tooltip").remove();
				}

				function styleTooltip() {
					var fieldPos = field.offset();
					jQuery(ttInstance).css({
						 top: fieldPos.top + "px"
						,left: fieldPos.left + "px"
						,marginLeft: (field.width()/2) - (jQuery(ttInstance).find('.tooltip.in').width()/2) + "px"
					}).fadeIn('fast');
					var inner = jQuery(ttInstance).find(".tooltip-inner")
						, offset = 31
						, marginTop = inner.height() >= offset ? inner.height() - offset : 0;
					inner.css({ marginTop: -marginTop + "px" });
				}

				function createTooltipBody(model) {
					if (jQuery.isArray(model)) {
						var dynamicBody = "<ul>";
						for (var x = 0; x <= model.length - 1; x++) {
							dynamicBody += "<li>" + model[x] + "</li>";
						}
						dynamicBody += "</ul>";
					} else {
						dynamicBody = model;
					}
					return dynamicBody;
				}

				function createLoader() {
					//Tooltip loader template
					var tooltip = '<span id=\"' + uid + '\" class=\"contextual-tooltip tooltip-container\">'
						+ '<div class=\"' + tooltipPos + ' tooltip in\">'
						+ '<div class=\"tooltip-arrow\"></div>'
						+ '<div class=\"tooltip-inner\"><p><span class=\"loading go\"></span></p></div>'
						+ '</div>'
						+ '</span>';
					return tooltip;
				}

				function createTooltip(data) {
					//Tooltip title
					var ttl = attrs.contextualTooltipTitle
						, title = ttl ? "<div class='tooltip-title'>" + ttl + "</div>" : "";
					//Tooltip template
					var tooltip = '<span id=\"' + uid + '\" class=\"contextual-tooltip tooltip-container\">'
						+ '<div class=\"' + tooltipPos + ' tooltip in\">'
						+ '<div class=\"tooltip-arrow\"></div>'
						+ '<div class=\"tooltip-inner\">' + title + '<p>' + createTooltipBody(data) + '</p></div>'
						+ '</div>'
						+ '</span>';
					return tooltip;
				}
			}
		}
	}
]);
