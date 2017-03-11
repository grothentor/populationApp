/**
 * Created by Alexandr on 04.03.2017.
 */

/*
 * Third party
 */
//= vendor/angular/angular.min.js
//= vendor/jquery/dist/jquery.min.js
//= vendor/bootstrap/dist/js/bootstrap.min.js
//= vendor/chart.js/dist/Chart.js
//= vendor/angular-chart.js/angular-chart.js
//= vendor/jspdf/dist/jspdf.min.js

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

populationApp = angular.module('populationApp', ['chart.js']);

/*
 * Angular
 */

/* services */
//= services/populationFactory.js

/* controllers */
//= controllers/populationCtrl.js
//= controllers/graphCtrl.js

/* filters */
//= filters/numeric.js

/* directives */
//= directives/numberDirective.js