/**
 * Created by Alexandr on 11.03.2017.
 */
'use strict';

(function () {
    populationApp.controller('graphCtrl', function ($scope, populationFactory) {
        $scope.population = populationFactory;
        $scope.labels = [];
        $scope.series = ['Популяция'];
        $scope.data = [[]];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{yAxisID: 'y-axis-1'}];

        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        scaleLabel: {
                            display: true,
                            labelString: 'Популяция'
                        }
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Время'
                        }
                    }
                ]
            }
        };

        $scope.saveToPdf = function ($event) {
            var $button = $('.btn');
            $button.prop('disabled', true);

            var pdf = new jsPDF('p', 'pt', 'a4');
            $('.result-content').prepend($scope.generatePdfStart());
            $('html').append('<div class="loader">"');

            var $content = $(".result-content > div:not(.ng-hide)");

            var uploaded = 0;
            var save = function () {
                if (uploaded >= $content.length - 1) {
                    pdf.save('report' + '.pdf');
                    $('.loader').remove();
                    $button.prop('disabled', false);
                } else {
                    if (0 == uploaded) {
                        $('.pdf-start').slideUp(2000, function () {
                                $('.pdf-start').remove();
                            });
                    }
                    uploaded++;
                }
            };

            var heights = [10, 190, 500];

            $content.each(function (i) {
                pdf.addHTML($content[i], 10, heights[i], {pagesplit: true}, save);
            });

        };

        $scope.generatePdfStart = function () {
            var $start = $('<div class="text-center pdf-start col-xs-12">'),
                $stats = $('<dl class="dl-horizontal">');

            $stats.append($('<dt>').html('Начальная популяция:'))
                .append($('<dd>').html($scope.population.basicFixed))
                .append($('<dt>').html('Прирост популяции:'))
                .append($('<dd>').html($scope.population.increaseFixed));

            if ($scope.population.calculatePopulation)
                $stats.append($('<dt>').html('Целевое значение популяции:'))
                .append($('<dd>').html($scope.population.targetFixed));

            if ($scope.population.calculateRange)
                $stats.append($('<dt>').html('Промежуток времени:'))
                    .append($('<dd>').html('[' + $scope.population.rangeFixed.start +
                        ';' + $scope.population.rangeFixed.end + ']'));

            $start.append($('<h1>').html('Вычисление популяции'))
                .append($stats)

            return $start;
        }
    });
})();