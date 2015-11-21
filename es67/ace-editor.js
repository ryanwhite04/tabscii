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
  ready: function() {
    var node = this.create('div', {
        id: 'editor'
    });
    Polymer.dom(document.body).appendChild(node);
    this.editor = ace.edit("editor");
    Polymer.dom(this).appendChild(node);
  },
  themeChanged: function(theme) {
    this.editor.setTheme("ace/theme" + theme);
  },
  modeChanged: function(mode) {
    this.editor.getSession().setMode("ace/mode" + mode);
  },
  join: (...args) => args.join('')
});
