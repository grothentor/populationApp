/**
 * Created by Alexandr on 11.03.2017.
 */
'use strict';

(function () {
    populationApp.controller('graphCtrl', function ($scope, populationFactory) {
        $scope.population = populationFactory;
        $scope.labels = [];
        $scope.series = ['Поуляция'];
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

            pdf.addHTML(($content[0]), 10, 10, {pagesplit: true}, save);

            pdf.addHTML(($content[1]), 10, 350, {pagesplit: true}, save);

        };
    });
})();