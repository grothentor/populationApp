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

            var labelsCount = 20;
            this.calculateByTarget = function () {
                this.targetData = {
                    labels: [0],
                    data: [[this.basic]]
                };
                this.targetFixed = this.target;
                this.targetTime = Math.log(this.target / this.basic) / this.increase;
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

            this.calculateByRange = function () {
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

            this.getPopulation = function (time) {
                return Math.round(this.basic * Math.exp(time * this.increase));
            };

            return this;
        });
})();