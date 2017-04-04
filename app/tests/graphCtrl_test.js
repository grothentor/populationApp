/**
 * Created by Alexandr on 04.04.2017.
 */
'use strict';

(function () {
    describe('graphCtrl', function () {
        beforeEach(module('populationApp'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        it('controller\'s functions and variables must be declared', function () {
            var $scope = {};
            var controller = $controller('graphCtrl', {$scope: $scope});

            expect($scope.population).toBeDefined();
            expect($scope.generatePdfStart).toBeDefined();
            expect($scope.saveToPdf).toBeDefined();
        });

        it('controller must save file', function () {
            var $scope = {};
            var controller = $controller('graphCtrl', {$scope: $scope});

            expect($scope.options).toBeDefined(true);
        });
    });
})();