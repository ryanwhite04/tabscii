export default function Format(editor) {
  this.editor = editor;
  this.swapOut = ["[A-Za-z\\*]\\-", "\\|\\|"];
  this.swapIn = ["--", "|-"];
  // Letters for timing and there corresponding intervals
  this.letters = ['S', 'E', 'Q', 'H', 'W'];
  this.numbers = [1, 2, 4, 8, 16];
  this.ranges = this.editor.selection.getAllRanges();
}

Format.prototype.format = function() {
  let { swap, changeBase, setTiming } = this;
  swap();
  changeBase();
  //this.ending();
  setTiming();
};

Format.prototype.changeBase = function() {
  let { editor } = this;
  for (var i = 10; i < 36; i++) {
    editor.findAll(i + '([0-9A-Za-z\\-])', {
      regExp: true
    });
    editor.replaceAll("-" + i.toString(36).toUpperCase() + "$1");
  }
};

Format.prototype.swap = function() {
  let { editor, swapIn, swapOut } = this;
  for (var i = 0, n = swapIn.length; i < n; i++) {
    editor.findAll(swapOut[i], {
      regExp: true
    });
    editor.replaceAll(swapIn[i]);
  }
};

Format.prototype.ending = function() {
    let { editor, ranges } = this;
  // Got to the beginning of the file
  editor.navigateFileStart();
  // For storing all of the row numbers
  var rowNumbers = [];
  // For performing on every highlighted region
  for (var i = 0, j = ranges.length; i < j; i++) {
    // Store the number of each highlighted row in row numbers
    rowNumbers.push(ranges[i].start.row + 1);
    // Find the end of each row (needs fixing) ???
    editor.find('(-[\\|])\n', {
      regExp: true
    });
    // Replace each one with it's row number (how does this work)
    editor.replace('-|L' + rowNumbers[i] + '\n', {
      regExp: true
    });
  }
};

Format.prototype.timing = function() {
  let { editor, letters, numbers, addDashRows, removeDashRows } = this;
  // For performing on each type of timing symbol
  for (var i = 0, l = letters.length; i < l; i++) {
    // no idea what this is for yet ???
    var less = numbers[i] - 2;
    var amount = editor.findAll(letters[i] + '(\\s{' + numbers[i] + ',}||\\s{0,' + less + '})(?=[WHQES\\|])', {
      regExp: true,
      caseSensitive: true
    });
    editor.selection.toSingleRange();
    editor.clearSelection();
    for (var j = 0; j < amount; j++) {
      editor.find(letters[i] + '(\\s{' + numbers[i] + ',}||\\s{0,' + less + '})(?=[WHQES\\|])', {
        regExp: true,
        caseSensitive: true
      });
      var text = editor.getSelectedText();
      editor.clearSelection();
      var length = text.length;
      text = '-';
      // For removing rows of dashes, change to removeDashRows()
      if (length > numbers[i]) {
        removeDashRows(length - numbers[i]);
      }
      // For adding rows of dashes
      else if (length < numbers[i]) {
        addDashRows(numbers[i] - length);
      }
    }
  }
};

Format.prototype.removeDashRows = function(rows) {
  let { editor } = this;
  for (var i = 0; i < rows; i++) {
    editor.navigateLeft(1);
    editor.remove();
  }
  editor.navigateRight(length);
  while (text === '-') {
    editor.selection.moveCursorDown();
    editor.selection.selectLeft();
    text = editor.getCopyText();
    editor.selection.selectRight();
    for (var j = 0; j < rows; j++) {
      editor.navigateLeft(1);
      editor.remove();
    }
    editor.navigateRight(rows);
  }
};

Format.prototype.addDashRows = function(rows) {
  let { editor } = this;
  for (var o = 0; o < rows; o++) {
    editor.insert(" ");
  }
  editor.navigateLeft(rows);
  while (text === '-') {
    editor.selection.moveCursorDown();
    editor.selection.selectLeft();
    editor.getCopyText();
    editor.selection.selectRight();
    for (var p = 0; p < rows; p++) {
      editor.insert("-");
    }
    editor.navigateLeft(rows);
  }
};

Format.prototype.timingGP = function() {
  let { editor, removeDash } = this;
  editor.find('[SEQHW]\\.?\\s', {
    regExp: true
  });
  editor.clearSelection();
  var place = editor.getCursorPosition();
  editor.remove();
  editor.selection.moveCursorDown();
  editor.selection.selectRight();
  var text = "-";
  removeDash(text);
  editor.navigateTo(place.row, place.column);
};

Format.prototype.removeDash = function(text) {
  let { editor } = this;
  if (text === "-") {
    editor.remove();
    editor.selection.moveCursorDown();
    editor.selection.selectRight();
    text = editor.getCopyText();
    removeDash(text);
  }
  editor.clearSelection();
};

Format.prototype.setTiming = function() {
  let { editor, timering, setTiming } = this;
  var place = editor.find(/\s+S*[SEQHW]\.?\s/, {
    regExp: true,
    wrap: false
  });
  if (place !== undefined) {
    editor.clearSelection();
    editor.selection.selectTo(place.end.row, place.end.column - 1);
    editor.remove();
    timering();
    editor.navigateTo(place.end.row, place.end.column - 2);
    setTiming();
  }
};

Format.prototype.timering = function() {
  let { editor } = this;
  editor.selection.moveCursorDown();
  editor.selection.selectRight();
  var text = editor.getCopyText();
  if (text === "-") {
    editor.remove();
    timering();
  }
};