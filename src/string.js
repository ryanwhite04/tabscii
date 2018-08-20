/////////////////////////////////
//string Object
/////////////////////////////////

function string(editor) {
  this.editor = editor;
  this.position = this.getPosition();
  this.textInFront = this.getTextInFront();
  this.textToCursor = this.getTextToCursor();
  this.openNote = this.getOpenNote();
  this.instrument = this.getInstrument();
  this.transpose = this.getTranspose();
}

string.prototype.getPosition = function() {
  var position = this.editor.getCursorPosition();
  return position;
};

string.prototype.getTextInFront = function() {
  this.position = this.getPosition();
  this.editor.selection.setSelectionRange({
    start: {
      row: this.position.row,
      column: this.position.column + 8
    },
    end: {
      row: this.position.row,
      column: this.position.column
    }
  }, false);
  var text = this.editor.getCopyText();
  this.editor.clearSelection();
  return text;
};

string.prototype.getTextToCursor = function() {
  this.position = this.getPosition();
  this.editor.selection.setSelectionRange({
    start: {
      row: this.position.row,
      column: 0
    },
    end: {
      row: this.position.row,
      column: this.position.column
    }
  }, false);
  var text = this.editor.getCopyText();
  this.editor.clearSelection();
  return text;
};

string.prototype.getOpenNote = function() {
  var openNoteRegExp = /\|[A-G][0-9]./;
  this.openNote = /\w[0-9]#?/.exec(openNoteRegExp.exec(this.textToCursor));
  return this.openNote;
};

string.prototype.getInstrument = function() {
  var instrumentRegExp = /\|I[0-9]./;
  this.instrument = (/[0-9]./.exec(instrumentRegExp.exec(this.textToCursor)) || "0");
  return this.instrument;
};

string.prototype.getTranspose = function() {
  var instrumentRegExp = /\|T([0-9]|-)./;
  this.transpose = (/([0-9]|-)[0-9]?/.exec(instrumentRegExp.exec(this.textToCursor)) || "0");
  return this.transpose;
};

string.prototype.play = function() {
  var str = this.getTextInFront();
  // if approaching a skip
  if (/[\-]/.test(str[0]) && /[\|]/.test(str[1]) && /[\-]/.test(str[2])) {
    this.getSkips(str);
  }
  // if it's a note (digit)
  if (/[^\|a-z]/.test(str[0])) {
    MIDI.noteOn(parseInt(this.instrument, 10), MIDI.keyToNote[this.openNote] + parseInt(str[0], 36) + parseInt(this.transpose, 10), 127);
  }
  // if it's a note (letter)
  else if (/[a-z]/.test(str[0])) {
    MIDI.noteOn(parseInt(this.instrument, 10), MIDI.keyToNote[this.openNote] + parseInt("-", 36) + parseInt(this.transpose, 10), 127);
  }
  // if it's a function
  else if (/[\|]/.test(str[0])) {
    this.doFunction(str);
  }
};

string.prototype.getSkips = function(str) {
  if (/[a-z0-9]/.test(str[3])) {
    string.prototype.skips = 2;
  } else if (/[a-z0-9]/.test(str[4])) {
    string.prototype.skips = 3;
  } else if (/[a-z0-9]/.test(str[5])) {
    string.prototype.skips = 4;
  }
};

string.prototype.doFunction = function(str) {
  // if it changes line
  if (str[1] === 'L') {
    this.editor.navigateTo(parseInt(str[2] + str[3], 10) - 1, 0);
    this.editor.renderer.scrollToX(0);
    str = this.getTextInFront();
    if (/[\-]/.test(str[0])) {
      this.editor.navigateRight(this.skips - 1);
    }
  }
  // if it is the end of a line
  else if (/[\s]/.test(str[1]) || str.length < 2) {
    for (var i = 0, l = 6; i < l; i++) {
      this.editor.find('\n[^\\s]', {
        regExp: true
      });
    }
    var place = this.editor.getSelectionRange().end;
    this.editor.navigateTo(place.row, place.column - 1);
    this.editor.renderer.scrollToX(0);
    str = this.getTextInFront();
    if (/[\-]/.test(str[0])) {
      this.editor.navigateRight(this.skips - 1);
    }
  }
  // if it is to be skipped
  else if (str[1] === '-') {
    this.editor.navigateRight(this.skips);
  }
  // if it is an openNote change
  else if (/[A-G]/.test(str[1])) {
    this.editor.navigateRight(4);
    this.openNote = /\w[0-9]#?/.exec(str);
  }
  // if it is an instrument change
  else if (/[I]/.test(str[1])) {
    this.editor.navigateRight(4);
    this.instrument = (/[0-9]./.exec(str) || "0");
  }
  // if it is a transpose change
  else if (/[T]/.test(str[1])) {
    this.editor.navigateRight(4);
    this.transpose = (/[0-9]/.exec(str) || "0");
  } else {
    play(parseInt(document.getElementById('rate').value, 10))
    return;
  }
  this.play();
};

export default string;