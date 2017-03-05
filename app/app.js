/**
 * Created by Alexandr on 04.03.2017.
 */
var populationApp = angular.module('populationApp', []);

populationApp.controller('populationCtrl', function($scope) {
    $scope.basicPopulation = 100;
    $scope.populationIncrease = 1;
    $scope.populatiomRange = {
        start: 0,
        end: 100
    };
    $scope.targetPopulation = 1000;
});

populationApp.controller('graphCtrl', function($scope) {
    $scope.test = 'test';
});

populationApp.directive('numberDirective', function() {
    return {
        require: 'ngModel',
        link: function ($scope, element, attr, mCtrl) {
            function numberValidation(value) {
                mCtrl.$setValidity('number', /^\d+$/.test(value));
                return value;
            }

            mCtrl.$parsers.push(numberValidation);
        }
    };
});