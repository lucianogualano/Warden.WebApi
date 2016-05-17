/// <binding />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        //jshint: {
        //    all: ['client/app/app.module.js']
        //},
        uglify: {
            my_target: {
                options: {
                    beautify: true
                },
                files: { 'client/app.module.concat.js': ['client/app/app.module.js', 'client/app/**/*.js'] }
            }
        },
        watch: {
            scripts: {
                files: ['client/app/**/*.js'],
                tasks: ['uglify']
            }
        },
        copy: {
            packages: {
                files: [
                    //{ cwd: 'wwwroot/lib/bootstrap/fonts', dest: 'wwwroot/fonts', src: '**', expand: true  },
                    { src: "bower_components/angular/angular.min.js", dest: "wwwroot/js/angular.min.js" },
                    { src: "bower_components/angular-route/angular-route.min.js", dest: "wwwroot/js/angular-route.min.js" },
                    { src: "bower_components/angular-resource/angular-resource.min.js", dest: "wwwroot/js/angular-resource.min.js" },
                    { src: "bower_components/angular-ui-grid/ui-grid.min.js", dest: "wwwroot/js/ui-grid.min.js" },
                    { src: "bower_components/ngDialog/js/ngDialog.min.js", dest: "wwwroot/js/ngDialog.min.js" },
                    { src: "bower_components/jquery/dist/jquery.min.js", dest: "wwwroot/js/jquery.min.js" },
                    { src: "bower_components/bootstrap/dist/js/bootstrap.min.js", dest: "wwwroot/js/bootstrap.min.js" },
                    { src: "bower_components/angular-local-storage/dist/angular-local-storage.min.js", dest: "wwwroot/js/angular-local-storage.min.js" },
                    { src: "bower_components/toastr/toastr.min.js", dest: "wwwroot/js/toastr.min.js" },
                    { src: "bower_components/angular-google-places-autocomplete/src/autocomplete.js", dest: "wwwroot/js/autocomplete.js" },
                    { src: "bower_components/ngmap/build/scripts/ng-map.js", dest: "wwwroot/js/ng-map.js" },
                ]
            },
            css: {
                files: [
                    //{ cwd: 'wwwroot/lib/bootstrap/fonts', dest: 'wwwroot/fonts', src: '**', expand: true  },
                    { src: "bower_components/bootstrap/dist/css/bootstrap.min.css", dest: "wwwroot/css/bootstrap.min.css" },
                    { src: "bower_components/angular-ui-grid/ui-grid.css", dest: "wwwroot/css/ui-grid.css" },
                    { src: "bower_components/ngDialog/css/ngDialog.min.css", dest: "wwwroot/css/ngDialog.min.css" },
                    { src: "bower_components/ngDialog/css/ngDialog-theme-default.min.css", dest: "wwwroot/css/ngDialog-theme-default.min.css" },
                    { src: "bower_components/toastr/toastr.min.css", dest: "wwwroot/css/toastr.min.css" },
                    { src: "bower_components/angular-google-places-autocomplete/src/autocomplete.css", dest: "wwwroot/css/autocomplete.css" },                    
                    { cwd: 'client/css/', src: "**/**", dest: "wwwroot/css/", expand: true },
                ]
            },
            client: {
                files: [
                    { src: "client/app.module.concat.js", dest: "wwwroot/app.module.js" },
                    { src: "client/index.html", dest: "wwwroot/index.html" },
                    { src: ['.html'], dest: 'wwwroot/pages/', filter: 'isFile' },
                    { cwd: 'client/app', dest: 'wwwroot/pages', src: ['**/**/*.html'], expand: true, flatten:true },
                    { cwd: 'client/images/', src: "**/**", dest: "wwwroot/images/", expand: true },
                ]
            },
        }
    });

    grunt.registerTask('default', ['uglify', 'watch', 'copy']);

};