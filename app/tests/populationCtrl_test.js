'use strict';

(function () {
    describe('populationCtrl', function () {
        beforeEach(module('populationApp'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        it('controller\'s functions and variables must be declared', function () {
            var $scope = {};
            var controller = $controller('populationCtrl', {$scope: $scope});

            expect($scope.population).toBeDefined();
            expect($scope.calculate).toBeDefined();
        });

        it('calculate must change population data', function () {
            var $scope = {};
            var controller = $controller('populationCtrl', {$scope: $scope});

            $scope.calculate();
            expect($scope.population.calculatePopulation).toEqual(true);
            expect($scope.population.calculateRange).toEqual(true);
        });
    });
})();