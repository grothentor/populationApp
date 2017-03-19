/**
 * Created by Alexandr on 11.03.2017.
 */
'use strict';

(function () {
    populationApp.filter('numeric', function () {
        var phrase = '',
            words = undefined;
        return function (input, word, one, two, five) {
            if (undefined != word)
                if (undefined != one && undefined != two)
                    if (undefined != five) {
                        words = {1: one, 2: two, 5: five};
                        phrase = word;
                    } else words = {1: word, 2: one, 5: two};
                else phrase = word;
            input = Math.round(parseFloat(input));
            return input + ' ' + getWordWithEnding(phrase, input, words)
        }
    })
})();