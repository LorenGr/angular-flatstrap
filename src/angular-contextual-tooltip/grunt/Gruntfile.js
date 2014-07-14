'use strict';

var path = require('path');


module.exports = function (grunt) {
    
    grunt.initConfig({

        concat: {
            dist: {
              src: [ 
                    '../src/angular-contextual-tooltip.js'
				  	,'../src/directives/contextualTooltip.js'
                ],
              dest: '../build/angular-contextual-tooltip.js',
              options : {
                    banner: "(function( window, $ ){ \n 'use strict'; \n",
                    footer: "}( window, window.angular ));"
              }
            }
        },
         
    });

    //load dependencies
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', [
        'concat'
    ]);
};