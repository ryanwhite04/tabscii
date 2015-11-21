'use strict';

var AceEditor = Polymer({
  is: 'ace-editor',
  properties: {
    theme: {
      type: String,
      observer: 'themeChanged'
    },
    mode: {
      type: String,
      observer: 'modeChanged'
    }
  },
  ready: function ready() {
    var node = this.create('div', {
      id: 'editor'
    });
    Polymer.dom(document.body).appendChild(node);
    this.editor = ace.edit("editor");
    Polymer.dom(this).appendChild(node);
  },
  themeChanged: function themeChanged(theme) {
    this.editor.setTheme("ace/theme" + theme);
  },
  modeChanged: function modeChanged(mode) {
    this.editor.getSession().setMode("ace/mode" + mode);
  },
  join: function join() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.join('');
  }
});
//# sourceMappingURL=ace-editor.js.map