/**
 * Created by Alexandr on 11.03.2017.
 */
'use strict';

(function() {
    populationApp.controller('populationCtrl', function ($scope, populationFactory) {
        $scope.population = populationFactory;

        $scope.calculate = function () {
            $scope.population.checkFieldsValidation();
            if ($scope.population.calculatePopulation) $scope.population.calculateByTarget();
            if ($scope.population.calculateRange) $scope.population.calculateByRange();
        };
    });
})();