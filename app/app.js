/**
 * Created by Alexandr on 04.03.2017.
 */
var populationApp = angular.module('populationApp', ['chart.js']);

populationApp.factory('population', function () {
    this.basic = 100;
    this.increase = 0.01;
    this.range = {
        start: 0,
        end: 100
    };
    this.target = 1000;
    this.calculatePopulation = false;
    this.calculateRange = false;
    this.targetData = [];
    this.rangeData = [];
    this.targetTime = 0;
    this.rangeFixed = {
        start: 0,
        end: 100
    };
    this.targetFixed = 1000;

    var labelsCount = 20;
    this.calculateByTarget = function () {
        this.targetData = {
            labels: [0],
            data: [[this.basic]]
        };
        this.targetFixed = this.target;
        this.targetTime =  Math.log(this.target / this.basic) / this.increase;
        this.targetData[this.targetTime] = this.target;

        var step = Math.round(this.targetTime / labelsCount);
        if (1 > step) step = 1;

        for (var i = step; i < this.targetTime; i += step) {
            if (i + step > this.targetTime) {
                this.targetData.labels.push(Math.round(this.targetTime));
                this.targetData.data[0].push(this.target);
            } else {
                this.targetData.labels.push(i);
                this.targetData.data[0].push(this.getPopulation(i));
            }
        }
    };

    this.calculateByRange = function() {
        this.rangeFixed = {
            start: this.range.start,
            end: this.range.end
        };
        this.rangeData = {
            labels: [],
            data: [[]]
        };

        var step = Math.round((this.range.end - this.range.start) / labelsCount);
        if (1 > step) step = 1;

        for (var i = this.range.start; i < this.range.end; i += step) {
            this.rangeData.labels.push(i);
            this.rangeData.data[0].push(this.getPopulation(i));
        }
        this.rangeData.labels.push(this.range.end);
        this.rangeData.data[0].push(this.getPopulation(this.range.end));
    };

    this.checkFieldsValidation = function () {
        if (checkNumberValidation(this.basic) &&
            checkNumberValidation(this.increase)) {
            this.calculatePopulation = checkNumberValidation(this.target);
            this.calculateRange = checkNumberValidation(this.range.end) &&
                checkNumberValidation(this.range.start) &&
                this.range.start < this.range.end;
        }
    };

    this.getPopulation = function(time) {
        return Math.round(this.basic * Math.exp(time * this.increase));
    };

    return this;
});

populationApp.controller('populationCtrl', function($scope, population) {
    $scope.population = population;

    $scope.calculate = function() {
        population.checkFieldsValidation();
        if (population.calculatePopulation) population.calculateByTarget();
        if (population.calculateRange) population.calculateByRange();
    };
});

populationApp.controller('graphCtrl', function($scope, population) {
        $scope.population = population;
        $scope.labels = [];
        $scope.series = ['Популяция'];
        $scope.data = [[]];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };
        $scope.saveToPdf = function ($event) {
            var $button = $($event.currentTarget);
            $button.prop('disabled', true);

            var pdf = new jsPDF('p', 'pt', 'a4');
            var $content = $(".result-content > div");
            var first = false;

            var save = function () {
                if (first) {
                    pdf.save('report' + '.pdf');
                    $button.prop('disabled', false);
                }
                else first = true;
            };

            pdf.addHTML(($content[0]), 10, 10, { pagesplit: true }, save);

            pdf.addHTML(($content[1]), 10, 350, { pagesplit: true }, save);

        };
    });

populationApp.directive('numberDirective', function() {
    return {
        require: 'ngModel',
        link: function ($scope, element, attr, mCtrl) {
            function numberValidation(value) {
                var valueValidation = checkNumberValidation(value);
                mCtrl.$setValidity('number', valueValidation);
                return valueValidation ? parseFloat(value) : value;
            }

            mCtrl.$parsers.push(numberValidation);
        }
    };
});

populationApp.filter('numeric', function() {
    var phrase = '',
        words = undefined;
    return function(input, word, one, two, five) {
       if (undefined != word)
           if (undefined != one && undefined != two)
               if (undefined != five) {
                   words = {1: one, 2: two, 5: five};
                   phrase = word;
               } else words = {1: word, 2: one, 5: two};
           else phrase = word;
       input = Math.round(parseFloat(input) * 100) / 100;
       return input + ' ' + getWordWithEnding(phrase, input, words)
    }
});

function checkNumberValidation(value) {
    return /^\d+(\.\d+)?$/.test(value);
}

function getWordEndingVariant(count) {
    if ('string' == typeof(count)) count = parseFloat(count);
    if (count % 1) return 2;
    count = count % 100;
    var decade = ~~(count / 10);
    if (1 == decade) return 5;
    var unit = count % 10;
    if (1 == unit) return 1;
    if (4 < unit || 0 === unit) return 5;
    else return 2;
}

function getWordWithEnding(wordRoot, count, endings) {
    if (undefined === endings) endings = {1: '', 2: 'а', 5: 'ов'};
    var endVariant = getWordEndingVariant(count);
    return wordRoot + endings[endVariant];
}