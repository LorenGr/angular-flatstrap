(function( window, $ ){ 
 'use strict'; 
angular.module("flatstrap",[
    "flatstrap.flatgrid"
    ,"flatstrap.contextualTooltip"
]);
(function( window, $ ){ 
 'use strict'; 
angular.module('flatgrid.templates', ['/src/templates/multiselect.html', '/src/templates/flatgrid.html']);

angular.module("/src/templates/multiselect.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/src/templates/multiselect.html",
    "<div class=\"dropdown\">\n" +
    "	<ul class=\"dropdown-menu\">\n" +
    "		<li ng-show=\"multiple\">\n" +
    "			<button class=\"btn-link btn-small\" ng-click=\"checkAll()\"><i class=\"icon-ok\"></i> Check all</button>\n" +
    "			<button class=\"btn-link btn-small\" ng-click=\"uncheckAll()\"><i class=\"icon-wrong\"></i> Uncheck all</button>\n" +
    "		</li>\n" +
    "		<li ng-repeat=\"i in items | filter:searchText\">\n" +
    "			<a ng-click=\"select(i); focus()\">\n" +
    "				<i ng-class=\"{'icon-ok': i.checked, 'icon-empty': !i.checked}\"></i>{{i.label}}</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "	<button type=button class=\"btn\" ng-click=\"toggleSelect()\" ng-disabled=\"disabled\" ng-class=\"{'error': !valid()}\">\n" +
    "		<span class=\"pull-left\">{{header}}</span>\n" +
    "		<span class=\"icon icon-sort\"></span>\n" +
    "	</button>\n" +
    "</div>");
}]);

angular.module("/src/templates/flatgrid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/src/templates/flatgrid.html",
    "<div class=\"dataGridContainer\">\n" +
    "    <form name=\"gridPostForm\" ng-submit=\"add(FG.pkg,gridPostForm)\">\n" +
    "        <div class=\"dataGrid\" ng-class=\"{'noControls':FG.Config.controls==false}\">\n" +
    "            <header>\n" +
    "                <h1 ng-if=\"::FG.Config.title\" ng-bind=\":: FG.Config.title\"></h1>\n" +
    "                <div class=\"tr\">\n" +
    "                    <div class=\"th {{::column.Name}} coltype-{{::column.Form}}\" ng-repeat=\"column in ::FG.columns\">\n" +
    "                        <a ng-if=\"::column.Sortable\" class=\"sorter\" ng-click=\"sortBy(column.Name)\">\n" +
    "                            <span\n" +
    "                                class=\"icon\"\n" +
    "                                ng-class=\"{'icon-arrow-down':!FG.Config.reverse,'icon-arrow-up':FG.Config.reverse}\"\n" +
    "                                ng-show=\"FG.Config.predicate==column.Name\"\n" +
    "                            ></span>\n" +
    "                            {{::column.Label}}\n" +
    "                        </a>\n" +
    "                        <span ng-if=\"!column.Sortable\">{{::column.Label}}</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"th controls\">\n" +
    "	                    <button ng-click=\"postButton()\" type=\"button\" ng-if=\"FG.Config.postButton\" class=\"icon icon-plus\"></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- Post Form -->\n" +
    "                <div class=\"tr post\" ng-if=\"FG.Config.postForm\">\n" +
    "                    <!-- Name -->\n" +
    "                    <div class=\"td {{::column.Name}} coltype-{{::column.Form}}\"\n" +
    "                        ng-repeat=\"column in ::FG.columns\"\n" +
    "		                ng-class=\"{empty:column.Form=='button'}\">\n" +
    "\n" +
    "	                    <div class=\"innerForm\">\n" +
    "		                    <!-- Post Form = input -->\n" +
    "	                        <input ng-if=\"column.Form=='input' && column.Editable!=false\" required\n" +
    "	                            name=\"inputfld\"\n" +
    "	                            ng-class=\"{'error-fld':error}\"\n" +
    "	                            custom-tooltip=\"error\"\n" +
    "	                            type=text\n" +
    "	                            ng-model=\"FG.pkg.data[column.Name]\"\n" +
    "	                            placeholder=\"{{::column.FormPlaceholder}}\"\n" +
    "	                            fg-auto-focus=\"{{::column.AutoFocus}}\"\n" +
    "	                            tabindex=1\n" +
    "	                        />\n" +
    "	                    </div>\n" +
    "                        <!-- Post Form = textarea -->\n" +
    "                        <textarea ng-if=\"column.Form=='textarea' && column.Editable!=false\" required\n" +
    "                                ng-class=\"{'error-fld':error}\"\n" +
    "                                custom-tooltip=\"error\"\n" +
    "                                ng-model=\"FG.pkg.data[column.Name]\"\n" +
    "								placeholder=\"{{::column.FormPlaceholder}}\"\n" +
    "                                fg-auto-focus=\"{{::column.AutoFocus}}\"\n" +
    "                                tabindex=1\n" +
    "                        ></textarea>\n" +
    "	                    <!-- Post Form : datetime-->\n" +
    "	                    <div ng-if=\"column.Form=='datetime' && column.Editable!=false\"\n" +
    "	                         class=\"postElement datetimepickerHolder\"\n" +
    "	                         ng-class=\"{'editable':column.Editable!=false}\">\n" +
    "\n" +
    "		                    <span ng-model=\"FG.pkg.data[column.Name]\" class=\"icon icon-calendar\" date-time-picker />\n" +
    "\n" +
    "		                    <ng-form class=\"innerForm\" name=\"gridPostFormInner\">\n" +
    "			                    <ng-messages for=\"gridPostFormInner.datetimefld.$error\">\n" +
    "				                    <ng-message class=\"fielderror\" when=\"pattern\">Invalid date! DD/MM/YYYY hh:mm</ng-message>\n" +
    "			                    </ng-messages>\n" +
    "\n" +
    "			                    <input name=\"datetimefld\"\n" +
    "					                   placeholder=\"DD/MM/YYYY hh:mm\"\n" +
    "					                   ng-pattern=\"datetimePattern\" required\n" +
    "					                   class=\"datetimepicker\"\n" +
    "			                           ng-model=\"FG.pkg.data[column.Name]\"\n" +
    "			                           type=\"text\" tabindex=\"1\" />\n" +
    "		                    </ng-form>\n" +
    "	                    </div>\n" +
    "                        <!-- Post Form : checkbox -->\n" +
    "                        <button   ng-if=\"column.Form=='checkbox' && column.Editable!=false\"\n" +
    "                                  ng-model=\"FG.pkg.data[column.Name]\"\n" +
    "                                  type=\"button\"\n" +
    "                                  ng-class=\"{'icon-ok':FG.pkg.data[column.Name]}\"\n" +
    "                                  class=\"checkbox\"\n" +
    "                                  btn-checkbox\n" +
    "                                  btn-checkbox-true=\"FG.pkg.data[column.Name]\"\n" +
    "                                  btn-checkbox-false=\"!FG.pkg.data[column.Name]\"\n" +
    "                                  tabindex=\"1\" td-focus\n" +
    "                                />\n" +
    "                        <!--Post Form : planner-->\n" +
    "                        <div ng-if=\"column.Form=='planner' && column.Editable!=false\" class=\"postElement plannerHolder\">\n" +
    "                            <input class=\"plannerpicker\" planner ng-model=\"FG.pkg.data[column.Name]\" />\n" +
    "                            <span class=\"icon noclick icon-repeat\"></span>\n" +
    "                            <label>{{FG.pkg.data[column.Name].Repeat || 'Choose Frequency' }}</label>\n" +
    "                        </div>\n" +
    "	                    <!--Form : multidropdown-->\n" +
    "	                    <multiselect ng-if=\"column.Form=='multidropdown'\"\n" +
    "	                                 class=\"multiselectHolder\" multiple=\"true\"\n" +
    "	                                 ng-model=\"FG.pkg.data[column.Name]\"\n" +
    "	                                 options=\"c for c in column.Options\"></multiselect>\n" +
    "	                    <!--Form : dropdown-->\n" +
    "						<span ng-if=\"column.Form=='dropdown'\" class=\"actiondropdownHolder\">\n" +
    "							<!--An object array found-->\n" +
    "							<select ng-if=\"isDeep(column.Options)\"\n" +
    "							        ng-model=\"FG.pkg.data[column.Name]\" ng-options=\"item.Name for item in column.Options\"></select>\n" +
    "\n" +
    "							<!--A string array found-->\n" +
    "							<select ng-if=\"!isDeep(column.Options)\"\n" +
    "							        ng-model=\"FG.pkg.data[column.Name]\" ng-options=\"item for item in column.Options\"></select>\n" +
    "\n" +
    "							<span class=\"icon icon-sort\"></span>\n" +
    "						</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"td controls\">\n" +
    "	                    <!--ERROR-->\n" +
    "						<span class=\"error\" ng-show=\"FG.pkg.Config.error\">\n" +
    "							<span class=\"icon icon-warning\"></span>\n" +
    "							<label>{{FG.pkg.Config.error}}</label>\n" +
    "							<span class=\"error-closer icon icon-close\" ng-click=\"FG.pkg.Config.error=null\"></span>\n" +
    "\n" +
    "						</span>\n" +
    "	                    <!--Submit-->\n" +
    "	                    <button type=\"submit\" ng-show=\"!FG.pkg.Config.loading\" class=\"icon icon-plus\"></button>\n" +
    "\n" +
    "	                    <!--Loading-->\n" +
    "	                    <span class=\"loading go\" ng-show=\"FG.pkg.Config.loading\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- / Post Form -->\n" +
    "            </header>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "	<div id=\"gridScrollHeight\" class=\"scrollItems\" ng-class=\"{'scrollbar':!FG.Config.pagination}\">\n" +
    "		<span class=\"settingsNoContent noControls\" ng-show=\"nodata\" ng-if=\"FG.Config.postForm == false\"><label><em>No data found!</em></span>\n" +
    "		<span class=\"settingsNoContent\" ng-show=\"nodata\" ng-if=\"FG.Config.postForm != false\"><label><em>No items found!</em>You can add new items from the above form.</label></span>\n" +
    "\n" +
    "		<div class=\"dataGrid\" ng-class=\"{\n" +
    "				'loading' : loading\n" +
    "				 ,'selectableRows' : FG.Config.onrowfocus\n" +
    "				 ,'noControls':FG.Config.controls==false\n" +
    "			}\">\n" +
    "			<div class=\"tbody\">\n" +
    "				<div ng-init=\"rowIndex=$index\" ng-repeat=\"item in rowsArray() | orderBy:sorter:FG.Config.reverse track by item.Id \"\n" +
    "					ng-class=\"{\n" +
    "						 'editing':item.Config.editing\n" +
    "						,'running':item.Config.running\n" +
    "						,'active' :item.Id==activeRowId\n" +
    "					}\"\n" +
    "					class=\"tr status-{{item.data.Status}}\"\n" +
    "					ng-click=\"selectRow(item.data)\"\n" +
    "					fg-force-focus=\"forcedFocus\"\n" +
    "					fg-forced-focus-cb=\"nextPage('reset')\"\n" +
    "					fg-forced-focus=\"{ currentPage : currentPage\n" +
    "									  ,firstRow    : $first }\">\n" +
    "					<div ng-class=\"{'editable':column.Editable!=false}\"\n" +
    "                        class=\"td {{column.Name}} coltype-{{column.Form}}\"\n" +
    "                        ng-init=\"colIndex=$index\"\n" +
    "                        ng-repeat=\"column in FG.columns\">\n" +
    "                        <!--Form : input -->\n" +
    "						<input 	ng-if=\"column.Editable!=false && (column.Form=='input' || column.Form=='textarea')\"\n" +
    "                                fg-first-row-ready=\"{{$parent.$last && $parent.$parent.$first}}\"\n" +
    "                                ng-click=\"editThis(item,$index+1)\"\n" +
    "                                fg-focus=\"editThis(item,$index+1)\"\n" +
    "                                fg-position=\"{{$parent.$last && $parent.$parent.$last}}\"\n" +
    "                                fg-tabulation=\"nextPage('auto')\"\n" +
    "                                fg-goto-next-row\n" +
    "                               	ng-click=\"editThis(item,$index+1)\"\n" +
    "                               	ng-model=\"item[item.Config.model][column.Name]\"\n" +
    "                               	type=\"text\"\n" +
    "                                ng-disabled=\"!item.data[column.Name] && item.data[column.Name]!=''\"\n" +
    "                                fg-enter-tabulation=\"nextPage($parent.$index)\"\n" +
    "                                fg-blur-on-escape=\"cancelThis(item)\"\n" +
    "                                fg-blur=\"confirm(item,false,$index+1,column.Name)\"\n" +
    "                                tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "                                placeholder=\"{{column.CellPlaceholder}}\"\n" +
    "                        />\n" +
    "						<!--Form : title  -->\n" +
    "                        <label ng-if=\"column.Editable==false && column.Form=='input' && column.Name != 'Message' \"\n" +
    "							   ng-bind=\":: item.data[column.Name]\"></label>\n" +
    "						<!--Form : title : message  -->\n" +
    "						<label tooltip=\"{{:: item.data[column.Name]}}\"\n" +
    "							   tooltip-append-to-body = true\n" +
    "							   tooltip-popup-delay='600'\n" +
    "							   ng-if=\"column.Editable==false && column.Form=='input' && column.Name == 'Message'\"\n" +
    "							   ng-bind=\":: item.data[column.Name]\"></label>\n" +
    "						<!--Change Status-->\n" +
    "                        <div ng-if=\"column.Form=='status'\" class=\"changeStatus status-{{item.data.ChangeStatus}}\">\n" +
    "							<span class=\"status-icon\"></span>\n" +
    "						</div>\n" +
    "						<!--Form : checkbox-->\n" +
    "                        <button   fg-blur-on-escape=\"cancelThis(item)\"\n" +
    "		                          td-focus\n" +
    "		                          ng-change=\"confirm(item,true)\"\n" +
    "                                  ng-if=\"column.Editable!=false && column.Form=='checkbox'\"\n" +
    "                                  ng-model=\"item.data[column.Name]\"\n" +
    "                                  type=\"button\"\n" +
    "                                  ng-class=\"{'icon-ok':item.data[column.Name]}\"\n" +
    "                                  class=\"checkbox\"\n" +
    "                                  btn-checkbox\n" +
    "                                  btn-checkbox-true=\"item.data[column.Name]\"\n" +
    "                                  btn-checkbox-false=\"!item.data[column.Name]\"\n" +
    "                                  tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "                                />\n" +
    "                        <!--Toggler-->\n" +
    "                        <button fg-toggler ng-change=\"confirm(item,true)\"\n" +
    "                                  ng-if=\"column.Editable!=false && column.Form=='toggler'\"\n" +
    "                                  ng-model=\"item.data[column.Name]\"\n" +
    "                                  type=\"button\"\n" +
    "                                  ng-class=\"{'icon-ok':item.data[column.Name]}\"\n" +
    "                                  class=\"checkbox\"\n" +
    "                                  btn-checkbox\n" +
    "                                  btn-checkbox-true=\"item.data[column.Name]\"\n" +
    "                                  btn-checkbox-false=\"!item.data[column.Name]\"\n" +
    "                                  tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "                                />\n" +
    "                        <!--Form : datetime-->\n" +
    "						<div ng-if=\"column.Form=='datetime'\"\n" +
    "						     class=\"datetimepickerHolder\"\n" +
    "                             ng-class=\"{'editable':column.Editable!=false}\">\n" +
    "							<span class=\"icon icon-calendar\"\n" +
    "							      date-time-picker\n" +
    "							      ng-model=\"item[item.Config.model][column.Name]\"\n" +
    "							      ng-click=\"editThis(item,$index+1)\" />\n" +
    "							<input fg-focus=\"editThis(item,$index+1)\"\n" +
    "							       ng-disabled=\"column.Editable==false\"\n" +
    "                                   class=\"datetimepicker\"\n" +
    "								   ng-click=\"editThis(item,$index+1)\"\n" +
    "								   ng-model=\"item[item.Config.model][column.Name]\"\n" +
    "								   type=\"text\" tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "								   fg-blur-on-escape=\"cancelThis(item)\"   />\n" +
    "                        </div>\n" +
    "                        <!-- Form : planner-->\n" +
    "                        <div ng-if=\"column.Form=='planner'\"\n" +
    "							 planner check-active=\"item==_activePlanner\"\n" +
    "							 class=\"plannerHolder\"\n" +
    "							 ng-class=\"{\n" +
    "							 	 'editable'		 : column.Editable != false\n" +
    "							 	,'activePlanner' : item == _activePlanner\n" +
    "							 }\"\n" +
    "							 ng-click=\"togglePlanner(true,item);$event.stopPropagation()\">\n" +
    "                            <input tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "		                           class=\"plannerpicker\"  />\n" +
    "                            <span class=\"icon noclick icon-repeat\"></span>\n" +
    "                            <label>{{item.data[column.Name].Repeat}}</label>\n" +
    "                        </div>\n" +
    "						<!--Form : multidropdown-->\n" +
    "						<multiselect ng-if=\"column.Form=='multidropdown' && item.data[column.Name] != null\"\n" +
    "									 class=\"multiselectHolder\" multiple=\"true\"\n" +
    "						             ng-model=\"item.data[column.Name]\"\n" +
    "						             options=\"c for c in column.Options\"\n" +
    "						             change=\"confirm(item,true)\"\n" +
    "						             tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "								     ></multiselect>\n" +
    "                        <!--Form : button-->\n" +
    "                        <button ng-click=\"formButtonHandler(item);\"\n" +
    "                                ng-if=\"column.Form=='button'\">{{column.FormLabel}}\n" +
    "                                <span class=\"icon icon-right\"></span>\n" +
    "                        </button>\n" +
    "                        <!--Form : actiondropdown-->\n" +
    "						<span ng-if=\"column.Form=='actiondropdown'\" class=\"actiondropdownHolder\">\n" +
    "							<select ng-model=\"chosenAction\" ng-init=\"chosenAction = item.data[column.Name][0]\"\n" +
    "									ng-options=\"action.Name for action in item.data[column.Name]\">\n" +
    "							</select>\n" +
    "							<span class=\"icon icon-sort\"></span>\n" +
    "\n" +
    "							<button ng-click=\"fix(item,chosenAction)\"\n" +
    "									class=\"themeButton orange\">\n" +
    "									<span class=\"icon icon-fix\"></span>FIX\n" +
    "							</button>\n" +
    "						</span>\n" +
    "						<!--Form : dropdown-->\n" +
    "						<span ng-if=\"column.Form=='dropdown'\"\n" +
    "						      class=\"actiondropdownHolder\">\n" +
    "							<!--An object array found-->\n" +
    "							<select tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "									ng-change=\"confirm(item,true)\"\n" +
    "									ng-if=\"isDeep(column.Options)\"\n" +
    "							        ng-init=\"optionSelected=getDefaultOption(item.data,column.Name,column.Options)\"\n" +
    "									ng-model=\"optionSelected\" ng-options=\"item.Name for item in column.Options\"></select>\n" +
    "\n" +
    "							<!--A string array found-->\n" +
    "							<select tabindex=\"{{getTabIndex(rowIndex,colIndex,column)}}\"\n" +
    "									ng-change=\"confirm(item,true)\"\n" +
    "									ng-if=\"!isDeep(column.Options)\"\n" +
    "							        ng-model=\"item.data[column.Name]\" ng-options=\"item for item in column.Options\"></select>\n" +
    "\n" +
    "							<span class=\"icon icon-sort\"></span>\n" +
    "						</span>\n" +
    "					</div>\n" +
    "\n" +
    "                    <!-- Controls -->\n" +
    "					<div ng-class-odd=\"'odd'\" class=\"td controls\">\n" +
    "\n" +
    "						<!--LOADING-->\n" +
    "						<span class=\"loading go\" ng-show=\"item.Config.loading\"></span>\n" +
    "\n" +
    "						<!--ERROR-->\n" +
    "						<span class=\"error\" ng-show=\"item.Config.error\">\n" +
    "							<span class=\"icon icon-warning\"></span>\n" +
    "							<label>{{item.Config.error}}</label>\n" +
    "							<span class=\"error-closer icon icon-close\" ng-click=\"item.Config.error=null\"></span>\n" +
    "\n" +
    "						</span>\n" +
    "\n" +
    "						<!-- DELETE -->\n" +
    "						<button type=\"button\" ng-if=\"FG.Config.controls\" ng-click=\"remove(item)\"\n" +
    "							ng-show=\"!item.Config.error && !item.Config.editing && !item.Config.loading && !item.Config.running\" class=\"icon icon-close\"\n" +
    "						></button>\n" +
    "						<!-- SAVE -->\n" +
    "						<button type=\"button\" ng-if=\"FG.Config.controls\" ng-click=\"confirm(item)\"\n" +
    "							ng-show=\"item.Config.editing && !item.Config.loading\" \n" +
    "							class=\"icon icon-ok\"\n" +
    "						></button>\n" +
    "						<!-- CANCEL -->\n" +
    "						<button type=\"button\" ng-if=\"FG.Config.controls\"\n" +
    "						        ng-mousedown=\"blockSave()\"\n" +
    "						        ng-mouseup=\"closeEditMode(item)\"\n" +
    "								ng-show=\"item.Config.editing && !item.Config.loading\"\n" +
    "							class=\"icon icon-wrong\"\n" +
    "						></button>\n" +
    "						<!--PUBLISHING-->\n" +
    "						<span class=\"running\" ng-show=\"item.Config.running\">publishing...</span>\n" +
    "					</div><!-- / Controls -->\n" +
    "\n" +
    "					<span ng-if=\"$last\" fit-rows></span>\n" +
    "\n" +
    "				</div> <!--/ repeat : tr -->\n" +
    "			</div> <!--/ tbody -->\n" +
    "		</div> <!--/ DataGrid -->\n" +
    "	</div>\n" +
    "\n" +
    "	<!--Planner-->\n" +
    "	<div class=\"planner_plugin planner_container\"\n" +
    "		 is-open=\"{{_activePlanner!=false}}\"\n" +
    "		 click-outside-identifier=\"planner\"\n" +
    "		 click-outside=\"togglePlanner(false)\"\n" +
    "		 onclick=\"event.stopPropagation();\">\n" +
    "\n" +
    "		<!--Frequencies-->\n" +
    "		<div class=\"col freq\">\n" +
    "			<div ng-repeat=\"item in Repeaters\">\n" +
    "				<input  id=\"{{item}}{{_activePlanner.Id}}\"\n" +
    "						type=\"radio\"\n" +
    "						ng-change=\"confirmPlanner(_activePlanner,true,item)\"\n" +
    "						name=\"every\"\n" +
    "						ng-model=\"_activePlanner.data.Frequency.Repeat\"\n" +
    "						value=\"{{item}}\"></input>\n" +
    "				<label for=\"{{item}}{{_activePlanner.Id}}\">{{item}}</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!--Days of the week-->\n" +
    "		<div class=\"col days\" ng-class=\"{ 'disabled': _activePlanner.data.Frequency.Repeat != 'Weekly' }\">\n" +
    "			<div ng-repeat=\"(key,day) in _activePlanner.data.Frequency.Days\">\n" +
    "				<input ng-disabled=\"_activePlanner.data.Frequency.Repeat != 'Weekly'\"\n" +
    "					   id=\"{{key}}{{_activePlanner.Id}}\"\n" +
    "					   type=\"checkbox\"\n" +
    "					   ng-model=\"day.Status\" />\n" +
    "				<label for=\"{{key}}{{_activePlanner.Id}}\">{{day.Text}}</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<!--Grid Tools-->\n" +
    "	<div class=\"gridTools\">\n" +
    "		<div id=\"search\" id=\"search\" ng-show=\"!nodata && FG.Config.search\">\n" +
    "			<span class=\"icon-search\"></span>\n" +
    "			<input placeholder=\"search\" type=\"text\" ng-model=\"search\" />\n" +
    "		</div>\n" +
    "		<pagination ng-show=\"activeListSize > FG.Config.Pager.ListSize && FG.Config.pagination\"\n" +
    "					ng-init=\"currentPage=1\"\n" +
    "					rotate=\"true\"\n" +
    "					items-per-page=\"FG.Config.Pager.ListSize\"\n" +
    "					total-items=\"FG.Config.Pager.PagerTotal\"\n" +
    "					page=\"currentPage\"\n" +
    "					max-size=\"FG.Config.Pager.PagerSize\"\n" +
    "					boundary-links=\"true\"\n" +
    "					first-text=\"\" last-text=\"\"\n" +
    "					next-text=\"\" previous-text=\"\">\n" +
    "		</pagination>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module('ui.multiselect', [])

	//from bootstrap-ui typeahead parser
	.factory('optionParser', ['$parse', function ($parse) {

		//                      00000111000000000000022200000000000000003333333333333330000000000044000
		var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

		return {
			parse: function (input) {

				var match = input.match(TYPEAHEAD_REGEXP);

				if (!match) {
					throw new Error(
							"Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
							" but got '" + input + "'.");
				}
				return {
					itemName: match[3],
					source: $parse(match[4]),
					viewMapper: $parse(match[2] || match[1]),
					modelMapper: $parse(match[1])
				};
			}
		};
	}])

	.directive('multiselect', ['$parse', '$document', '$compile', 'optionParser','$timeout',

		function ($parse, $document, $compile, optionParser, $timeout) {
			return {
				restrict: 'E',
				require: 'ngModel',
				link: function (originalScope, element, attrs, modelCtrl) {

					var exp = attrs.options,
						parsedResult = optionParser.parse(exp),
						isMultiple = attrs.multiple ? true : false,
						required = false,
						scope = originalScope.$new(),
						changeHandler = attrs.change || angular.noop;

					scope.items = [];
					scope.header = 'Select';
					scope.multiple = isMultiple;
					scope.disabled = false;

					originalScope.$on('$destroy', function () {
						scope.$destroy();
					});

					var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

					//required validator
					if (attrs.required || attrs.ngRequired) {
						required = true;
					}
					attrs.$observe('required', function(newVal) {
						required = newVal;
					});

					//watch disabled state
					scope.$watch(function () {
						return $parse(attrs.disabled)(originalScope);
					}, function (newVal) {
						scope.disabled = newVal;
					});

					//watch single/multiple state for dynamically change single to multiple
					scope.$watch(function () {
						return $parse(attrs.multiple)(originalScope);
					}, function (newVal) {
						isMultiple = newVal || false;
					});

					//watch option changes for options that are populated dynamically
					scope.$watch(function () {
						return parsedResult.source(originalScope);
					}, function (newVal) {
						if (angular.isDefined(newVal))
							parseModel();
					}, true);

					//watch model change
					scope.$watch(function () {
						return modelCtrl.$modelValue;
					}, function (newVal, oldVal) {
						//when directive initialize, newVal usually undefined. Also, if model value already set in the controller
						//for preselected list then we need to mark checked in our scope item. But we don't want to do this every time
						//model changes. We need to do this only if it is done outside directive scope, from controller, for example.
						if (angular.isDefined(newVal)) markChecked(newVal);
						getHeaderText();
						modelCtrl.$setValidity('required', scope.valid());
					}, true);

					function parseModel() {
						scope.items.length = 0;
						var model = parsedResult.source(originalScope);
						if(!angular.isDefined(model)) return;
						for (var i = 0; i < model.length; i++) {
							var local = {};
							local[parsedResult.itemName] = model[i];
							scope.items.push({
								label: parsedResult.viewMapper(local),
								model: model[i],
								checked: false
							});
						}
					}
					parseModel();
					element.append($compile(popUpEl)(scope));

					function getHeaderText() {
						if (is_empty(modelCtrl.$modelValue)) return scope.header = ' ';
						if (isMultiple) {
							//scope.header = modelCtrl.$modelValue.length + ' ' + 'selected';
							scope.header = modelCtrl.$modelValue.join(",");
						} else {
							var local = {};
							local[parsedResult.itemName] = modelCtrl.$modelValue;

							scope.header = parsedResult.viewMapper(local);
						}
					}

					function is_empty(obj) {
						if (!obj) return true;
						if (obj.length && obj.length > 0) return false;
						for (var prop in obj) if (obj[prop]) return false;
						return true;
					};

					scope.valid = function validModel() {
						if(!required) return true;
						var value = modelCtrl.$modelValue;
						return (angular.isArray(value) && value.length > 0) || (!angular.isArray(value) && value != null);
					};

					function selectSingle(item) {
						if (item.checked) {
							scope.uncheckAll();
						} else {
							scope.uncheckAll();
							item.checked = !item.checked;
						}
						setModelValue(false);
					}

					function selectMultiple(item) {
						item.checked = !item.checked;
						setModelValue(true);
					}

					function setModelValue(isMultiple) {
						var value;

						if (isMultiple) {
							value = [];
							angular.forEach(scope.items, function (item) {
								if (item.checked) value.push(item.model);
							});

							$timeout(function(){
								scope.$eval(changeHandler);
							});

						} else {
							angular.forEach(scope.items, function (item) {
								if (item.checked) {
									value = item.model;
									return false;
								}
							})
						}
						modelCtrl.$setViewValue(value);
					}

					function markChecked(newVal) {
						if (!angular.isArray(newVal)) {
							angular.forEach(scope.items, function (item) {
								if (angular.equals(item.model, newVal)) {
									item.checked = true;
									return false;
								}
							});
						} else {
							angular.forEach(newVal, function (i) {
								angular.forEach(scope.items, function (item) {
									if (angular.equals(item.model, i)) {
										item.checked = true;
									}
								});
							});
						}
					}

					scope.checkAll = function () {
						if (!isMultiple) return;
						angular.forEach(scope.items, function (item) {
							item.checked = true;
						});
						setModelValue(true);
					};

					scope.uncheckAll = function () {
						angular.forEach(scope.items, function (item) {
							item.checked = false;
						});
						setModelValue(true);
					};

					scope.select = function (item) {
						if (isMultiple === false) {
							selectSingle(item);
							scope.toggleSelect();
						} else {
							selectMultiple(item);
						}
					}
				}
			};
		}])

	.directive('multiselectPopup', ['$document', function ($document) {
		return {
			restrict: 'E',
			scope: false,
			replace: true,
			templateUrl: '/src/templates/multiselect.html',
			link: function (scope, element, attrs) {

				var ch = attrs.change || angular.noop;

				scope.isVisible = false;

				scope.toggleSelect = function () {
					if (element.hasClass('open')) {
						element.removeClass('open');
						$document.unbind('click', clickHandler);
					} else {
						element.addClass('open');
						$document.bind('click', clickHandler);
					}
				};

				function clickHandler(event) {
					if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
						return;
					element.removeClass('open');
					$document.unbind('click', clickHandler);
					scope.$apply();
				}

				var elementMatchesAnyInArray = function (element, elementArray) {
					for (var i = 0; i < elementArray.length; i++)
						if (element == elementArray[i])
							return true;
					return false;
				}
			}
		}
	}]);
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
flatgridControllers.controller('flatGrid_Controller',[
	'$scope'
	,'$timeout'
	,'$filter'
	,function($scope,$timeout,$filter) {
		
		//keep track of what to UNEDIT on BLUR of fields (while editing)
		var previousIndex=false
			,blockSave = false;

		$scope.forcedFocus = { page : 0 , col : 0 };
		$scope.search = "";
		$scope.activeListSize = 0;
		$scope.nodata = false;
		$scope.activeRowId = null;

		// re1 = DDMMYYYY , re2 = White Space 1 , re3 = HourMinuteSec
		var re1='((?:(?:[0-2]?\\d{1})|(?:[3][01]{1}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])'
			,re2='(\\s+)'
			,re3='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';

		$scope.datetimePattern = new RegExp(re1+re2+re3,["i"]);

		//Planner
		$scope._activePlanner = false;
		$scope._activeMultiDropdown = false;

		$scope.Repeaters = ["Daily","Weekly","Monthly","Unique"];

		$scope.togglePlanner = function(open,planner){
			$scope._activePlanner = open ? planner : false;
		}
		$scope.toggleMultiDropdown = function(open,mdd){
			$scope._activeMultiDropdown = open ? mdd : false;
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

		$scope.getTabIndex = function(row,col,params) { return params.Editable != false ? (col+1)+($scope.FG.columns.length*row) : -1; }

		$scope.nextPage = function(colindex) {
			var pagesCount = Math.ceil($scope.activeListSize / $scope.FG.Config.Pager.ListSize);
			if(colindex != 'reset' && $scope.currentPage < pagesCount ) {
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

		//Used to add new items through custom methods
		$scope.postButton = function() {
			if($scope.FG.Config.onpostbutton) {
				$scope[$scope.FG.Config.onpostbutton]().then(function(pkg){
					$scope.add(pkg);
				});
			}
		}

		//Used by dropdown
		$scope.isDeep = function(arr) { return !angular.isString(arr[0]); }

		$scope.getDefaultOption = function(value,key,comparator) {
			if(comparator) {
					var o;
					for(var x=0;x<=comparator.length-1;x++) {
						if(comparator[x]["Id"]==value[key]) {
							o = comparator[x];
							break;
						}
					}
					return o;

			} else {
				return value;
			}
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
					pkg.Config.error = null;
				},function(err){
					pkg.Config.error = err;
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
		function resetPostForm() {
			angular.forEach($scope.FG.pkg.data,function(key,value){
				if(typeof value === 'string') $scope.FG.pkg.data[key] = "";
			});
		}
		$scope.add = function(pkg,gridPostForm) {

			if(gridPostForm.$valid) {
				if(pkg.Config) pkg.Config.loading = true;

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
						if(pkg.Config) {
							pkg.Config.error = null;
							pkg.Config.loading = false;
						}
						resetPostForm();
					},function(err){
						if(pkg.Config) {
							pkg.Config.error = err;
							pkg.Config.loading = false;
						}

					});
				} else {
					$scope.FG.rows.unshift(pkg);
				}
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
		$scope.blockSave = function() { blockSave=true; };
		$scope.confirm = function(pkg,ignoreCache,index,col) {
			function validatePkg() {
				if (col) {
					return ( pkg.data[col] != pkg.Cache[col] && pkg.Cache[col] != '');
				} else {
					return true;
				}
			}
			if(!pkg.Config.running && !blockSave) {
				pkg.Config.loading = true;
				var p = angular.copy(pkg);
				if(validatePkg() ) {
					if(!ignoreCache) p.data = p.Cache;//send saved data to callback
					$scope[$scope.FG.Config.onsave](p).then(function(r) {
						pkg.Config.loading = false;
						pkg.Cache = r;
						pkg.data = r; //display server return
						pkg.Config.error = null;
						$scope.closeEditMode(pkg);
					},function(err){
						//error
						pkg.Config.loading = false;
						pkg.Cache = pkg.data;
						pkg.Config.error = err;
						$scope.closeEditMode(pkg);
						console.log("error detected:"+err);
					});
				} else {
					pkg.Config.loading = false;
					$scope.closeEditMode(pkg);
				}
			}
			blockSave = false;

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


flatgridDirectives.directive('planner',function ($parse,$timeout){
	return {
		 restrict 	: "A"
		,link : function(scope,elem,attrs) {
			var model = $parse(attrs.checkActive);
			scope.$watch(model,function(value) {
				if(value) {
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
							elem.blur();
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

flatgridDirectives.directive('tdFocus', function () {
	return  {
		require : 'ngModel',
		link : function(scope, element, attrs) {
			element.bind("focus",function(){
				element.closest(".td").addClass("activeElement");
			});
			element.bind("blur",function(){
				element.closest(".td").removeClass("activeElement");
			});
		}
	};
});





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
}( window, window.angular ));
(function( window, $ ){ 
 'use strict'; 
var contextualTooltipServices 	 = angular.module('contextualTooltip.services', []);
var contextualTooltipDirectives  = angular.module('contextualTooltip.directives', []);
var contextualTooltipFilters 	 = angular.module('contextualTooltip.filters', []);
var contextualTooltipControllers = angular.module('contextualTooltip.controllers', []);
angular.module('flatstrap.contextualTooltip',[
	'contextualTooltip.services'
	,'contextualTooltip.directives'
	,'contextualTooltip.filters'
	,'contextualTooltip.controllers'
]);


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
}( window, window.angular ));}( window, window.angular ));