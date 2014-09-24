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
