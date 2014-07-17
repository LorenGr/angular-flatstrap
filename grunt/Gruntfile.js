'use strict';

var path = require('path');


module.exports = function (grunt) {
    
    grunt.initConfig({        
        
        concat: {
            dist: {
              src: [ 
                    '../src/angular-flatstrap.js'
                    ,'../src/angular-flatgrid/build/angular-flatgrid.js'
                    ,'../src/angular-contextual-tooltip/build/angular-contextual-tooltip.js'
                ],
              dest: '../build/angular-flatstrap.js',
              options : {
                    banner: "(function( window, $ ){ \n 'use strict'; \n",
                    footer: "}( window, window.angular ));"
              }
            }
        },
        stylus: {
            compile: {
                files: {
                  '../build/angular-flatgrid.css': ['../src/angular-flatgrid/src/styles/*.styl']
                }
            }
        }    
    });

    //load dependencies
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.registerTask('default', [
        'concat'
        ,'stylus'
    ]);
};