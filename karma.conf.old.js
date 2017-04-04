/**
 * Created by Alexandr on 03.04.2017.
 */
//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './app',

        files: [
            'vendor/angular/angular.js',
            'controllers/*.js',
            'directives/*.js',
            'filters/*.js',
            'services/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
    });
};