/// BareSpecifier=@polymer/iron-resizable-behavior/demo/src/x-app
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { IronResizableBehavior } from '../../iron-resizable-behavior.js';

import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: inline-block;
        border: 3px solid lightblue;
      }
    </style>

    <b>I'm a resize-aware, thirdifying puck at (<span>{{x}}</span> x <span>{{y}}</span>).</b>
`,

  is: 'x-puck',
  behaviors: [IronResizableBehavior],

  properties: {
    x: { type: Number, value: 0 },

    y: { type: Number, value: 0 }
  },

  listeners: { 'iron-resize': '_onIronResize' },

  attached: function () {
    this.async(this.notifyResize, 1);
  },

  get parent() {
    if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return this.parentNode.host;
    }

    return this.parentNode;
  },

  _onIronResize: function () {
    var x = this.x = Math.floor(this.parent.offsetWidth / 3);
    var y = this.y = Math.floor(this.parent.offsetHeight / 3);

    this.translate3d(x + 'px', y + 'px', 0);
  }
});
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    </style>
    <x-puck></x-puck>
`,

  is: 'x-app',
  behaviors: [IronResizableBehavior]
});