/**
 * Created by Alexandr on 11.03.2017.
 */
'use strict';

(function () {
    angular.module('populationApp')
        .factory('populationFactory', function () {
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
            this.basicFixed = 100;
            this.increaseFixed = 0.01;

            var labelsCount = 20;
            this.calculateByTarget = function () {
                this.fixData();
                this.targetData = {
                    labels: [],
                    data: [[]]
                };
                this.targetTime = Math.log(this.target / this.basic) / this.increase;
                this.targetData[this.targetTime] = this.target;

                var step = Math.round(this.targetTime / labelsCount);
                if (0 > step) step = Math.abs(step);
                if (1 > step) step = 1;

                var start =  this.targetTime > 0 ? 0 : this.targetTime;
                var end = this.targetTime > 0 ? this.targetTime : 0;

                for (var i = start; i <= end; i += step) {
                    if (i + step > end) {
                        this.targetData.labels.push(Math.round(end));
                        this.targetData.data[0].push(this.getPopulation(end));
                    } else {
                        this.targetData.labels.push(Math.round(i));
                        this.targetData.data[0].push(this.getPopulation(i));
                    }
                }
            };

            this.calculateByRange = function () {
                this.fixData();
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
                if (checkNumberValidation(this.basic, 'int-positive') &&
                    checkNumberValidation(this.increase)) {
                    this.calculatePopulation = checkNumberValidation(this.target, 'int-positive');
                    this.calculateRange = checkNumberValidation(this.range.end) &&
                        checkNumberValidation(this.range.start) &&
                        this.range.start < this.range.end;
                } else {
                    this.calculatePopulation = false;
                    this.calculateRange = false;
                }
            };

            this.getPopulation = function (time) {
                var population = Math.round(this.basic * Math.exp(time * this.increase));
                return population > 0 ? population : 0;
            };

            this.fixData = function () {
                this.targetFixed = this.target;
                this.basicFixed = this.basic;
                this.increaseFixed = this.increase;
                this.rangeFixed = {
                    start: this.range.start,
                    end: this.range.end
                };
            };

            return this;
        });
})();