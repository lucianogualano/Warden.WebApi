// Karma configuration
// Generated on Mon May 09 2016 11:36:05 GMT+1000 (AUS Eastern Standard Time)

module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/angular-resource/angular-resource.js',
            '../bower_components/angular-local-storage/dist/angular-local-storage.js',
            '../bower_components/angular-google-places-autocomplete/dist/autocomplete.min.js',
            '../bower_components/angular-route/angular-route.js',
            '../bower_components/angular-ui-grid/ui-grid.js',
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/bootstrap/dist/js/bootstrap.js',            
            '../bower_components/ngDialog/js/ngDialog.js',
            '../bower_components/ngmap/build/scripts/ng-map.js',
            '../bower_components/toastr/toastr.js',
            'app/app.module.js',
            'app/**/*.js',
            'tests/unit/test.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
           // 'src/**/*.html': ['ng-html2js'],
            'src/**/!(*.mock|*.spec).js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'], //'htmlDetailed'

        // notify karma of the available plugins
        //plugins: [			   
        //  'karma-jasmine',
        //  'karma-phantomjs-launcher',
        //  'karma-chrome-launcher',
        //  'karma-ie-launcher',
        //  'karma-html-detailed-reporter',
        //  'karma-coverage'
        //],

        // Which plugins to enable
        plugins: [
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine',
          'karma-coverage'
        ],

        // configure the HTML-Detailed-Reporter to put all results in one file    
        htmlDetailed: {
            splitResults: true
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'Chrome', 'IE'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        //concurrency: Infinity
    })
}
