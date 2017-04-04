'use strict';
(function() {
    describe('app functions', function () {
        describe('checkNumberValidation', function () {
            it('function must be defined', function () {
                expect(checkNumberValidation).toBeDefined();
            });

            it('int validation must work correctly', function () {
                var variant = 'int';

                expect(checkNumberValidation(10, variant)).toEqual(true);
                expect(checkNumberValidation(-10, variant)).toEqual(true);
                expect(checkNumberValidation(10.1, variant)).toEqual(false);
                expect(checkNumberValidation(10.1, variant)).toEqual(false);
                expect(checkNumberValidation('qwe', variant)).toEqual(false);
            });

            it('positive validation must work correctly', function () {
                var variant = 'positive';

                expect(checkNumberValidation(10, variant)).toEqual(true);
                expect(checkNumberValidation(-10, variant)).toEqual(false);
                expect(checkNumberValidation(10.1, variant)).toEqual(true);
                expect(checkNumberValidation(-10.1, variant)).toEqual(false);
                expect(checkNumberValidation(0, variant)).toEqual(false);
                expect(checkNumberValidation('qwe', variant)).toEqual(false);
            });

            it('int-positive validation must work correctly', function () {
                var variant = 'int-positive';

                expect(checkNumberValidation(10, variant)).toEqual(true);
                expect(checkNumberValidation(-10, variant)).toEqual(false);
                expect(checkNumberValidation(10.1, variant)).toEqual(false);
                expect(checkNumberValidation(-10.1, variant)).toEqual(false);
                expect(checkNumberValidation(0, variant)).toEqual(false);
                expect(checkNumberValidation('qwe', variant)).toEqual(false);
            });
        });

        describe('getWordEndingVariant', function () {
            it('function must be defined', function () {
                expect(getWordEndingVariant).toBeDefined();
            });

            it('must correctly display word plural form', function () {
                var root = 'яблок',
                    endings = {1: 'о', 2: 'a', 5: ''},
                    count = 0;

                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[5]);

                count = 1;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[1]);

                count = 4;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[2]);

                count = -1;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[1]);

                count = 15;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[5]);

                count = 23;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[2]);

                count = -21;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[1]);

                count = 96;
                expect(count + ' ' + getWordWithEnding(root, count, endings)).toEqual(count + ' ' + root + endings[5]);
            });
        });
    });
})();