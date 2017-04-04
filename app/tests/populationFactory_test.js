/**
 * Created by Alexandr on 03.04.2017.
 */
'use strict';
(function () {
    describe('populationFactory', function() {
        var population = null;

        beforeEach(angular.mock.module('populationApp'));

        beforeEach(inject(function(_populationFactory_) {
            population = _populationFactory_;
        }));

        it('service populationFactory should exist', function() {
            expect(population).toBeDefined();
        });

        it('function calculateByTarget should exist', function() {
            expect(population.calculateByTarget).toBeDefined();
        });

        it('function calculateByRange should exist', function() {
            expect(population.calculateByRange).toBeDefined();
        });

        it('function getPopulation should exist', function() {
            expect(population.getPopulation).toBeDefined();
        });

        it('function checkFieldsValidation should exist', function() {
            expect(population.checkFieldsValidation).toBeDefined();
        });

        describe('validation must work correctly', function() {
            it('validation must work with nice data', function() {
                population.basic = 100;
                population.increase = 0.01;
                population.target = 1000;
                population.range = {
                    start: 0,
                    end: 100
                };

                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(true);
                expect(population.calculateRange).toEqual(true);
            });

            it('validation must work with negative population', function() {
                population.increase = 0.01;
                population.target = 1000;
                population.range = {
                    start: 0,
                    end: 100
                };

                population.basic = -10;
                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(false);
                expect(population.calculateRange).toEqual(false);

                population.basic = 100;
                population.target = -10;
                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(false);
                expect(population.calculateRange).toEqual(true);
            });

            it('validation must work with double population', function() {
                population.increase = 0.01;
                population.target = 1000;
                population.range = {
                    start: 0,
                    end: 100
                };

                population.basic = 14.6;
                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(false);
                expect(population.calculateRange).toEqual(false);

                population.basic = 100;
                population.target = 1000.9;
                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(false);
                expect(population.calculateRange).toEqual(true);
            });

            it('validation must work with range validation', function() {
                population.increase = 0.01;
                population.target = 1000;
                population.range = {
                    start: 200,
                    end: 100
                };

                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(true);
                expect(population.calculateRange).toEqual(false);

                population.range = {
                    start: -200,
                    end: 100.9
                };
                population.checkFieldsValidation();
                expect(population.calculatePopulation).toEqual(true);
                expect(population.calculateRange).toEqual(true);
            });
        });

        it('population must be calculated correctly', function() {
            initPopulation(population);

            expect(population.getPopulation(0)).toEqual(population.basic);
            expect(population.getPopulation(10)).toEqual(Math.round(population.basic * Math.exp(10 * population.increase)));
            expect(population.getPopulation(-999999)).toEqual(0);
        });

        it('time of needed population must be calculated correctly', function () {
            initPopulation(population);

            population.calculateByTarget();
            expect(population.targetTime).toEqual(Math.log(population.target / population.basic) / population.increase);
            expect(population.targetData.data[0][0]).toEqual(population.basic);
            expect(population.targetData.data[0][population.targetData.data[0].length - 1]).toEqual(population.target);

            population.target = population.basic;
            population.calculateByTarget();
            expect(population.targetTime).toEqual(0);
            expect(population.targetData.data[0][0]).toEqual(population.basic);
            expect(population.targetData.data[0][population.targetData.data[0].length - 1]).toEqual(population.basic);
        });

        it('population on interval must be calculated correctly', function () {
            initPopulation(population);

            population.calculateByRange();
            expect(population.rangeData.data[0][0]).toEqual(population.basic);
            expect(population.rangeData.data[0][population.rangeData.data[0].length - 1])
                .toEqual(population.getPopulation(population.range.end));
        });

        function initPopulation(population) {
            population.basic = 100;
            population.increase = 0.01;
            population.range = {
                start: 0,
                end: 100
            };
            population.calculatePopulation = false;
            population.calculateRange = false;
            population.targetData = [];
            population.rangeData = [];
            population.targetTime = 0;
            population.rangeFixed = {
                start: 0,
                end: 100
            };
            population.targetFixed = 1000;
            population.basicFixed = 100;
            population.increaseFixed = 0.01;
        }
    });
})();