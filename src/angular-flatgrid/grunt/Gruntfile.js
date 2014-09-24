'use strict';

var path = require('path');


module.exports = function (grunt) {
    
    grunt.initConfig({        
        
        html2js: {            
            options: {
                base : "../",
                module : "flatgrid.templates",
                rename : function (moduleName) {
                    return '/' + moduleName;
                }
            },
            main: {
                src: [
					'../src/templates/multiselect.html',
					'../src/templates/flatgrid.html',
				],
                dest: '../src/templates/templates.js'
            },
        },
        concat: {
            dist: {
              src: [ 
                    '../src/templates/templates.js'
	                ,'../src/directives/multiselect.js'
                    ,'../src/angular-flatgrid.js'
                    ,'../src/services/myGrid.js'
                    ,'../src/controllers/flatGrid.js'
                    ,'../src/filters/filters.js'
                    ,'../src/directives/datetimepicker.js'
                    ,'../src/directives/planner.js'
                    ,'../src/directives/flatGrid_utils.js'
                    ,'../src/directives/flatGrid.js'
                ],
              dest: '../build/angular-flatgrid.js',
              options : {
                    banner: "(function( window, $ ){ \n 'use strict'; \n",
                    footer: "}( window, window.angular ));"
              }
            }
        },
        stylus: {
            compile: {
                files: {
                  '../build/angular-flatgrid.css': ['../src/styles/*.styl'] 
                }
            }
        }    
    });

    //load dependencies
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('default', [
        'html2js',
        'concat'
        //,'stylus'
    ]);
};