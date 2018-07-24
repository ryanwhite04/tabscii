var oldCode;
var top;
var loader;
var cursorLeftOld;
var cursorTopOld;
var strings = {};
var formats = {};
var files = {};
var keys = {

  // Bass Row
  49: 33,    // A1 : 1
  50: 35,    // B1 : 2
  51: 36,    // C2 : 3
  52: 38,    // D2 : 4
  53: 40,    // E2 : 5 Lowest Human
  54: 41,    // F2 : 6
  55: 43,    // G2 : 7
  56: 45,    // A2 : 8
  57: 47,    // B2 : 9
  48: 48,    // C3 : 0

  // Second Row
  81: 45,    // A2 : q
  87: 47,    // B2 : w
  69: 48,    // C3 : e
  82: 50,    // D3 : r
  84: 52,    // E3 : t
  89: 53,    // F3 : y
  85: 55,    // G3 : u
  73: 57,    // A3 : i
  79: 59,    // B3 : o
  80: 60,    // C4 : p Middle C

  // Main Row
  65: 57,    // A3 : a
  83: 59,    // B3 : s
  68: 60,    // C4 : d Middle C
  70: 62,    // D4 : f
  71: 64,    // E4 : g
  72: 65,    // F4 : h
  74: 67,    // G4 : j
  75: 69,    // A4 : k 440hz
  76: 71,    // B4 : l
  186: 72,   // C5 : ;

  90: 69,    // A4 : z 440hz
  88: 71,    // B4 : x
  67: 72,    // C5 : c
  86: 74,    // D5 : v
  66: 76,    // E5 : b
  78: 77,    // F5 : n
  77: 79,    // G5 : m
  188: 81,   // A5 : ,
  190: 83,   // B5 : .
  191: 84,   // C6 : / Highest Human
};

window.onload = () => {
  setInstrument(0, 0);
  setEditor();
  setFile();
  setPlaces();
};

$(window).keydown(event => {
  getStrings();
	MIDI.noteOn(parseInt(strings[0].instrument, 10), keys[event.shiftKey ? event.keyCode + 1 : event.keyCode], 127);
});

$(window).blur(function() {
  clearInterval(stop);
});

function setInstrument(channel, number) {

  if (typeof(MIDI.Soundfont[MIDI.GeneralMIDI.byId[number].id]) === "undefined") {
    $('.loader').show();
    loader.add({
      message: "loading: " + MIDI.GeneralMIDI.byId[number].instrument + "..."
    });
    MIDI.loadPlugin({
      soundfontUrl: "soundfont/",
      instruments: [MIDI.GeneralMIDI.byId[number].id],
      callback: function() {
        MIDI.programChange(channel, number);
        loader.stop();
        $('.loader').hide();
      }
    });
  } else {
    MIDI.programChange(channel, number);
  }
}

function setFile() {
  files['home.txt'] = new File('tabscii.com/', 'home.txt');
  files['home.txt'].open();
}

function setPlaces() {
  $("#editor, #leftMenu, #rightMenu").css("top", $("#header").outerHeight());
  $("#header, #editor").fadeIn(250);
}

function play() {
  cursorLeftOld = editor.renderer.$cursorLayer.getPixelPosition().left;
  cursorTopOld = editor.renderer.$cursorLayer.getPixelPosition().top;
  if ($('#play i').hasClass('fa-pause')) {
    clearInterval(stop);
  } else {
    var speed = (parseInt($("#play input").val(), 10) || 120);
    getStrings();

    stop = setInterval(function() {
      playSound();
      moveAll(0, 1);
      centerCursor();
    }, 15000 / speed);
  }
  $('#play i').toggleClass('fa-play fa-pause');
}

function playSound() {
  var stringNumber = 0;
  editor.execCommand({
    exec: function() {
      strings[stringNumber].play();

      stringNumber++;
    },
    multiSelectAction: "forEach"
  });
}

function moveAll(down, right) {
  editor.execCommand({
    exec: function() {
      editor.selection.moveCursorBy(down, right);
    },
    multiSelectAction: "forEach"
  });
}

function centerCursor() {
  var cursorLeft = editor.renderer.$cursorLayer.getPixelPosition().left;
  var cursorTop = editor.renderer.$cursorLayer.getPixelPosition().top;
  editor.renderer.scrollBy(cursorLeft - cursorLeftOld, cursorTop - cursorTopOld);
  cursorLeftOld = cursorLeft;
  cursorTopOld = cursorTop;
}

function getStrings() {
  var stringNumber = 0;
  var openStrings = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
  editor.execCommand({
    exec: function() {
      strings[stringNumber] = new string();
      strings[stringNumber].stringNumber = stringNumber;
      if (strings[stringNumber].openNote === null) {
        strings[stringNumber].openNote = openStrings[stringNumber];
      }
      stringNumber++;
    },
    multiSelectAction: "forEach"
  });
}

function load(extension, fileName) {
  var leadUrl = 'files/';
  files[fileName] = new File(extension, fileName);
  $.get(leadUrl + extension + fileName, null, function(data) {
    files[fileName].text = data;
    files[fileName].make();
    files[fileName].open();
  }).error(function() {
    $('select option[value="' + fileName + '"]').css('background', '#D64937');
  }).success(function() {
    $('select option[value="' + fileName + '"]').css('background', '#49D637');
  });
}

// Keyboard shortcuts
//$(document).bind("keyup", function(e){
//    var key = e.keyCode;
//    // ctrl+p for play or pause
//    if(e.ctrlKey && key == 80){
//	    play();
//    }
//    if(!e.shiftKey && key > 47 && key < 58){
//		fret = key - 48;
//		getStrings();
//		MIDI.noteOn(parseInt(strings[0].instrument, 10),MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10),127);
//	}
//	if (e.shiftKey && key > 64 && key < 91){
//		fret = key - 55;
//		getStrings();
//		MIDI.noteOn(parseInt(strings[0].instrument, 10),MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10),127);
//	}
//});


$('#play input').change(function() {
  if ($('#play i').hasClass('fa-pause')) {
    play();
    play();
  }
});

$('#fontSize i').click(function() {
  editor.setFontSize(parseInt($('#fontSize input').val(), 10));
});

$('#fontSize input').change(function() {
  editor.setFontSize(parseInt($('#fontSize input').val(), 10));
});

$('#instrument select').change(function() {
  var channel = 0;
  var instrumentName = $(this).val();
  var number = parseInt(MIDI.GeneralMIDI.byName[instrumentName].number, 10);
  setInstrument(channel, number);
});

$('#tabscii select').change(function() {
  var tabName = $(this).val();
  if (typeof(files[tabName]) === "undefined") {
    files[tabName] = new File('tabscii.com/', tabName);
  }
  files[tabName].open();
});

$('#gametabs select').change(function() {
  var tabName = $(this).val();
  if (typeof(files[tabName]) === "undefined") {
    files[tabName] = new File('gametabs.net/', tabName);
  }
  files[tabName].open();
});

$('#classtab select').change(function() {
  var tabName = $(this).val();
  if (typeof(files[tabName]) === "undefined") {
    files[tabName] = new File('classtab.org/', tabName);
  }
  files[tabName].open();
});

$('#upload select').change(function() {
  files[$(this).val()].open();
});

$('#editor').dblclick(function() {
  editor.selection.selectAWord();
  var fret = parseInt(editor.getCopyText(), 36);
  getStrings();
  MIDI.noteOn(parseInt(strings[0].instrument, 10), MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10), 127);
});

/////////////////////////////////
//string Object
/////////////////////////////////

function string() {
  this.position = this.getPosition();
  this.textInFront = this.getTextInFront();
  this.textToCursor = this.getTextToCursor();
  this.openNote = this.getOpenNote();
  this.instrument = this.getInstrument();
  this.transpose = this.getTranspose();
}

string.prototype.getPosition = function() {
  var position = editor.getCursorPosition();
  return position;
};

string.prototype.getTextInFront = function() {
  this.position = this.getPosition();
  editor.selection.setSelectionRange({
    start: {
      row: this.position.row,
      column: this.position.column + 8
    },
    end: {
      row: this.position.row,
      column: this.position.column
    }
  }, false);
  var text = editor.getCopyText();
  editor.clearSelection();
  return text;
};

string.prototype.getTextToCursor = function() {
  this.position = this.getPosition();
  editor.selection.setSelectionRange({
    start: {
      row: this.position.row,
      column: 0
    },
    end: {
      row: this.position.row,
      column: this.position.column
    }
  }, false);
  var text = editor.getCopyText();
  editor.clearSelection();
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
    editor.navigateTo(parseInt(str[2] + str[3], 10) - 1, 0);
    editor.renderer.scrollToX(0);
    str = this.getTextInFront();
    if (/[\-]/.test(str[0])) {
      editor.navigateRight(this.skips - 1);
    }
  }
  // if it is the end of a line
  else if (/[\s]/.test(str[1]) || str.length < 2) {
    for (var i = 0, l = 6; i < l; i++) {
      editor.find('\n[^\\s]', {
        regExp: true
      });
    }
    var place = editor.getSelectionRange().end;
    editor.navigateTo(place.row, place.column - 1);
    editor.renderer.scrollToX(0);
    str = this.getTextInFront();
    if (/[\-]/.test(str[0])) {
      editor.navigateRight(this.skips - 1);
    }
  }
  // if it is to be skipped
  else if (str[1] === '-') {
    editor.navigateRight(this.skips);
  }
  // if it is an openNote change
  else if (/[A-G]/.test(str[1])) {
    editor.navigateRight(4);
    this.openNote = /\w[0-9]#?/.exec(str);
  }
  // if it is an instrument change
  else if (/[I]/.test(str[1])) {
    editor.navigateRight(4);
    this.instrument = (/[0-9]./.exec(str) || "0");
  }
  // if it is a transpose change
  else if (/[T]/.test(str[1])) {
    editor.navigateRight(4);
    this.transpose = (/[0-9]/.exec(str) || "0");
  } else {
    play();
    return;
  }
  this.play();
};

/////////////////////////////////
//Format Object
/////////////////////////////////

function Format() {
  this.swapOut = ["[A-Za-z\\*]\\-", "\\|\\|"];
  this.swapIn = ["--", "|-"];
  // Letters for timing and there corresponding intervals
  this.letters = ['S', 'E', 'Q', 'H', 'W'];
  this.numbers = [1, 2, 4, 8, 16];
  this.ranges = editor.selection.getAllRanges();
}

Format.prototype.format = function() {
  this.swap();
  this.changeBase();
  //this.ending();
  this.setTiming();
};

Format.prototype.changeBase = function() {
  for (var i = 10; i < 36; i++) {
    editor.findAll(i + '([0-9A-Za-z\\-])', {
      regExp: true
    });
    editor.replaceAll("-" + i.toString(36).toUpperCase() + "$1");
  }
};

Format.prototype.swap = function() {
  for (var i = 0, n = this.swapIn.length; i < n; i++) {
    editor.findAll(this.swapOut[i], {
      regExp: true
    });
    editor.replaceAll(this.swapIn[i]);
  }
};

Format.prototype.ending = function() {
  // Got to the beginning of the file
  editor.navigateFileStart();
  // For storing all of the row numbers
  var rowNumbers = [];
  // For performing on every highlighted region
  for (var i = 0, j = this.ranges.length; i < j; i++) {
    // Store the number of each highlighted row in row numbers
    rowNumbers.push(this.ranges[i].start.row + 1);
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
  // For performing on each type of timing symbol
  for (var i = 0, l = this.letters.length; i < l; i++) {
    // no idea what this is for yet ???
    var less = this.numbers[i] - 2;
    var amount = editor.findAll(this.letters[i] + '(\\s{' + this.numbers[i] + ',}||\\s{0,' + less + '})(?=[WHQES\\|])', {
      regExp: true,
      caseSensitive: true
    });
    editor.selection.toSingleRange();
    editor.clearSelection();
    for (var j = 0; j < amount; j++) {
      editor.find(this.letters[i] + '(\\s{' + this.numbers[i] + ',}||\\s{0,' + less + '})(?=[WHQES\\|])', {
        regExp: true,
        caseSensitive: true
      });
      var text = editor.getSelectedText();
      editor.clearSelection();
      var length = text.length;
      text = '-';
      // For removing rows of dashes, change to removeDashRows()
      if (length > this.numbers[i]) {
        this.removeDashRows(length - this.numbers[i]);
      }
      // For adding rows of dashes
      else if (length < this.numbers[i]) {
        this.addDashRows(this.numbers[i] - length);
      }
    }
  }
};

Format.prototype.removeDashRows = function(rows) {
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
  editor.find('[SEQHW]\\.?\\s', {
    regExp: true
  });
  editor.clearSelection();
  var place = editor.getCursorPosition();
  editor.remove();
  editor.selection.moveCursorDown();
  editor.selection.selectRight();
  var text = "-";
  this.removeDash(text);
  editor.navigateTo(place.row, place.column);
};

Format.prototype.removeDash = function(text) {
  if (text === "-") {
    editor.remove();
    editor.selection.moveCursorDown();
    editor.selection.selectRight();
    text = editor.getCopyText();
    this.removeDash(text);
  }
  editor.clearSelection();
};

Format.prototype.setTiming = function() {
  var place = editor.find(/\s+S*[SEQHW]\.?\s/, {
    regExp: true,
    wrap: false
  });
  if (place !== undefined) {
    editor.clearSelection();
    editor.selection.selectTo(place.end.row, place.end.column - 1);
    editor.remove();
    this.timering();
    editor.navigateTo(place.end.row, place.end.column - 2);
    this.setTiming();
  }
};

Format.prototype.timering = function() {
  editor.selection.moveCursorDown();
  editor.selection.selectRight();
  var text = editor.getCopyText();
  if (text === "-") {
    editor.remove();
    this.timering();
  }
};

/////////////////////////////////
//File Object
/////////////////////////////////

function File(extension, name) {
  this.extension = extension;
  this.name = name;
  this.text = name;
}

File.prototype.save = function() {
  this.text = editor.getValue();
  localStorage[this.name] = JSON.stringify(this.text);
};

File.prototype.open = function() {
  if (typeof(this.session) === "undefined") {
    load(this.extension, this.name);
  } else {
    editor.setSession(this.session);
  }
  $('#download input').val(this.name);
};

File.prototype.make = function() {
  this.session = ace.createEditSession(this.text, 'ace/mode/text');
};

File.prototype.load = function() {
  this.text = JSON.parse(localStorage[this.name]);
  this.make();
};

File.prototype.copy = function() {
  this.session = editor.getSession();
};

/////////////////////////////////
//Upload And Download
/////////////////////////////////

$('#upload i').click(function() {
  $('#upload input').click();
});

$('#upload input').change(function() {
  var reader;
  var onload = function(e) {
    var fileTitle = /[^\.]*/.exec(file.name);
    files[file.name] = new File(file.name);
    files[file.name].text = reader.result;
    files[file.name].make();
    files[file.name].open();
    $('#upload select').append('<option selected="true" value="' + file.name + '">' + fileTitle + '</option>');
  };
  var uploadedFiles = this.files;
  for (var i = 0, l = uploadedFiles.length; i < l; i++) {
    var file = uploadedFiles[i];
    reader = new FileReader();
    reader.onload = onload;
    reader.readAsText(file);
  }
});

$('#download i').click(function() {
  $('#downloadify object').click();
});

$("#download i").downloadify({
  filename: function() {
    return $('#download input').val();
  },
  data: function() {
    return editor.getValue();
  },
  onComplete: function() {
    alert('Complete');
  },
  onCancel: function() {
    alert('Cancelled');
  },
  onError: function() {
    alert('Error');
  },
  transparent: false,
  swf: 'media/downloadify.swf',
  downloadImage: 'images/download.png',
  width: 32,
  height: 32,
  append: true
});


/*
editor.find('\n-',{regExp:true, wrap:false});
for ( var i=0, j=editor.selection.getAllRanges().length - 1; i<j; i++){
	editor.findNext();
}
editor.navigateTo(editor.getSelection().selectionLead.row);

editor.execCommand({
	exec:function() {
		for ( var i=0, j=editor.selection.getAllRanges().length; i<j; i++){
                editor.find('\n[A-G]',{regExp:true, wrap:false});
			}
		},
		multiSelectAction: "forEach"
});
*/
