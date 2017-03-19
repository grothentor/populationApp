/**
 * Created by Alexandr on 04.03.2017.
 */
'use strict';

(function() {
    populationApp.directive('numberDirective', function () {
        return {
            require: 'ngModel',
            link: function ($scope, element, attr, mCtrl) {
                function numberValidation(value) {
                    var valueValidation = checkNumberValidation(value, attr.numberDirective);
                    mCtrl.$setValidity('number', valueValidation);
                    return valueValidation ? parseFloat(value) : value;
                }

                mCtrl.$parsers.push(numberValidation);
            }
        };
    });
})();