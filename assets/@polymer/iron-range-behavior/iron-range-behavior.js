/// BareSpecifier=@polymer/iron-range-behavior/iron-range-behavior
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../polymer/polymer-legacy.js';

/**
 * `iron-range-behavior` provides the behavior for something with a minimum to
 * maximum range.
 *
 * @demo demo/index.html
 * @polymerBehavior
 */
export const IronRangeBehavior = {

  properties: {

    /**
     * The number that represents the current value.
     */
    value: { type: Number, value: 0, notify: true, reflectToAttribute: true },

    /**
     * The number that indicates the minimum value of the range.
     */
    min: { type: Number, value: 0, notify: true },

    /**
     * The number that indicates the maximum value of the range.
     */
    max: { type: Number, value: 100, notify: true },

    /**
     * Specifies the value granularity of the range's value.
     */
    step: { type: Number, value: 1, notify: true },

    /**
     * Returns the ratio of the value.
     */
    ratio: { type: Number, value: 0, readOnly: true, notify: true }
  },

  observers: ['_update(value, min, max, step)'],

  _calcRatio: function (value) {
    return (this._clampValue(value) - this.min) / (this.max - this.min);
  },

  _clampValue: function (value) {
    return Math.min(this.max, Math.max(this.min, this._calcStep(value)));
  },

  _calcStep: function (value) {
    // polymer/issues/2493
    value = parseFloat(value);

    if (!this.step) {
      return value;
    }

    var numSteps = Math.round((value - this.min) / this.step);
    if (this.step < 1) {
      /**
       * For small values of this.step, if we calculate the step using
       * `Math.round(value / step) * step` we may hit a precision point issue
       * eg. 0.1 * 0.2 =  0.020000000000000004
       * http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
       *
       * as a work around we can divide by the reciprocal of `step`
       */
      return numSteps / (1 / this.step) + this.min;
    } else {
      return numSteps * this.step + this.min;
    }
  },

  _validateValue: function () {
    var v = this._clampValue(this.value);
    this.value = this.oldValue = isNaN(v) ? this.oldValue : v;
    return this.value !== v;
  },

  _update: function () {
    this._validateValue();
    this._setRatio(this._calcRatio(this.value) * 100);
  }

};