import Format from './format.js'
import string from './string.js'
var strings = {};
var files = {};

let load;

function getStrings(editor) {
  var stringNumber = 0;
  var openStrings = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
  editor.execCommand({
    exec: function() {
      strings[stringNumber] = new string(editor);
      strings[stringNumber].stringNumber = stringNumber;
      if (strings[stringNumber].openNote === null) {
        strings[stringNumber].openNote = openStrings[stringNumber];
      }
      stringNumber++;
    },
    multiSelectAction: "forEach"
  });
}

function keyboardNote({ shiftKey, keyCode }, keys = {

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
}) {
  getStrings(editor);
  MIDI.noteOn(parseInt(strings[0].instrument, 10), keys[shiftKey ? keyCode + 1 : keyCode], 127);
}

function playEditorNote(editor) {
  return () => {
    editor.selection.selectAWord();
    var fret = parseInt(editor.getCopyText(), 36);
    getStrings(editor);
    MIDI.noteOn(parseInt(strings[0].instrument, 10), MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10), 127);
  }
}

function shortcuts({ keyCode: key, ctrlKey, shiftKey }){

  // ctrl+p for play or pause
  ctrlKey && key == 80 && play()
    
  if (!shiftKey && key > 47 && key < 58) {
    fret = key - 48;
    getStrings(editor);
    MIDI.noteOn(parseInt(strings[0].instrument, 10),MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10),127);
  }

  if (shiftKey && key > 64 && key < 91){
    fret = key - 55;
    getStrings(editor);
    MIDI.noteOn(parseInt(strings[0].instrument, 10),MIDI.keyToNote[strings[0].openNote] + fret + parseInt(strings[0].transpose, 10),127);
  }

}

function getControls(editor, playing=false, rate=360) {
  
  let interval;
  let cursorLeftOld = editor.renderer.$cursorLayer.getPixelPosition().left;
  let cursorTopOld = editor.renderer.$cursorLayer.getPixelPosition().top;

  function changeRate({ target: { value } }) {
    console.log('changeRate', { value })
    rate = parseInt(value, 10) || rate;
    toggle()
    toggle()
  }
  
  function centerCursor(editor) {
    // let cursorLeft = editor.renderer.$cursorLayer.getPixelPosition().left;
    // let cursorTop = editor.renderer.$cursorLayer.getPixelPosition().top;
    // editor.renderer.scrollBy(cursorLeft - cursorLeftOld, cursorTop - cursorTopOld);
    // cursorLeftOld = cursorLeft;
    // cursorTopOld = cursorTop;
  }
  
  function play() {
    console.log('play', { playing, rate })
    document.getElementById('toggle').classList.toggle('fa-pause')
    getStrings(editor);
    interval = setInterval(() => {
      playSound(editor);
      moveAll(0, 1, editor);
      centerCursor(editor);
    }, 15000 / rate);
    playing = true;
    return interval;
  }
  
  function stop() {
    console.log('stop', { playing })
    document.getElementById('toggle').classList.toggle('fa-pause')
    playing = false;
    return clearInterval(interval)
  }

  function toggle() {
    return playing ? stop() : play()
  }
  return {
    changeRate,
    play,
    stop,
    toggle,
  }
}

function open(e) {
  document.getElementById('menu').classList.toggle('open')
}

function setFontSize(editor) {
  return ({ target: { value } }) => {
    console.log('setFontSize', { value })
    editor.setFontSize(parseInt(value, 10))
  }
}

function changeInstrument({ detail }) {
  console.log('changeInstrument', { detail })
  var number = parseInt(MIDI.GM.byName[detail].number, 10);
  setInstrument(0, number);
}

function upload({ value }) {
  console.log('upload', { value })
  files[value].open();
}

function chooseFile() {
  document.getElementById('upload').click()
}

function download(editor) {
  return ({ target }) => {
    target.setAttribute('href', `data:application/txt,${encodeURIComponent(editor.getValue())}`)
    target.setAttribute('download', `${document.getElementById('filename').value}.txt`)
  }
}



function setInstrument(channel, number) {

  if (typeof(MIDI.Soundfont[MIDI.GM.byId[number].id]) === "undefined") {
//     $('.loader').show();
    var loader = new sketch.ui.Timer
    // loader.add({
    //   message: "loading: " + MIDI.GM.byId[number].instrument + "..."
    // });
    console.log('setInstrument')
    MIDI.loadPlugin({
      soundfontUrl: "./assets/midi/examples/soundfont/",
      instruments: [MIDI.GM.byId[number].id],
      callback: function() {
        MIDI.programChange(channel, number);
        loader.stop();
//         $('.loader').hide();
      }
    });
  } else {
    MIDI.programChange(channel, number);
  }
}

function setFile(editor) {
  files['Heartbeats.txt'] = new File('tabscii/', 'Heartbeats.txt', editor);
  files['Heartbeats.txt'].open();
}

function loadFile(path, editor) {
  return ({ detail }) => {
    console.log('loadFile', path, detail)
    if (typeof(files[detail]) === "undefined") {
      files[detail] = new File(path, detail, editor);
    }
    files[detail].open();
  }
}

function upload2() {
  var reader;
  var onload = function(e) {
    var fileTitle = /[^\.]*/.exec(file.name);
    files[file.name] = new File(file.name);
    files[file.name].text = reader.result;
    files[file.name].make();
    files[file.name].open();
//     $('#upload select').append('<option selected="true" value="' + file.name + '">' + fileTitle + '</option>');
  };
  var uploadedFiles = this.files;
  for (var i = 0, l = uploadedFiles.length; i < l; i++) {
    var file = uploadedFiles[i];
    reader = new FileReader();
    reader.onload = onload;
    reader.readAsText(file);
  }
}

function setEditor(){
  let editor = ace.edit("editor");
  
  setTheme(editor)({ detail: "chrome" })
  setMode(editor)({ detail: "javascript" })
  
  editor.setShowPrintMargin(false);
  editor.getSession().setUseWorker(false);
  let EditSession = ace.require("ace/edit_session").EditSession;
  
  return editor;
}

function setTheme(editor) {
  return ({ detail }) => {
    console.log('setTheme', { editor, theme: detail })
    return editor.setTheme(`ace/theme/${detail}`)
  }
}

function setMode(editor) {
  return ({ detail }) => {
    console.log('setMode', { editor, mode: detail })
    return editor.getSession().setMode(`ace/mode/${detail}`)
  }
}

function playSound(editor) {
  var stringNumber = 0;
  editor.execCommand({
    exec: function() {
      strings[stringNumber].play();

      stringNumber++;
    },
    multiSelectAction: "forEach"
  });
}

function moveAll(down, right, editor) {
  editor.execCommand({
    exec: function() {
      editor.selection.moveCursorBy(down, right);
    },
    multiSelectAction: "forEach"
  });
}

/////////////////////////////////
//File Object
/////////////////////////////////

function File(extension, name, editor) {
  this.editor = editor;
  this.extension = extension;
  this.name = name;
  this.text = name;
}

File.prototype.save = function() {
  let { editor, text, name } = this;
  text = editor.getValue();
  localStorage[name] = JSON.stringify(text);
};

File.prototype.make = function() {
  let { text } = this;
  this.session = ace.createEditSession(text, 'ace/mode/text');
};

File.prototype.load = function() {
  let { name } = this;
  this.text = JSON.parse(localStorage[name]);
  this.make();
};

File.prototype.copy = function() {
  let { editor } = this;
  this.session = editor.getSession();
};

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

File.prototype.open = function() {
  console.log('File.open', { load })
  let { extension, name, editor } = this;
  if (typeof(this.session) === "undefined") {
    load(extension, name);
  } else {
    editor.setSession(this.session);
  }
  document.getElementById('value', name)
};

function getLoad(editor) {
  return async function(extension, fileName) {
    var leadUrl = 'files/';
    files[fileName] = new File(extension, fileName, editor);
    let data = await fetch(leadUrl + extension + fileName).catch(console.error)
    data = await data.text();
    files[fileName].text = data;
    files[fileName].make();
    files[fileName].open();
  }
}

window.onload = () => {
  setInstrument(0, 0);
  let editor = setEditor();
  load = getLoad(editor);
  setFile();
  // Tell ace that the alt key is held down for mousedown events
  // This makes it so blockselection is always on
  // It also allows block selection on chromebooks
  editor._eventRegistry.mousedown[1] = (func => e => func({
    ...e, ...e.__proto__,
    getButton: () => e.getButton(),
    domEvent: { ...e.domEvent,
      altKey: !e.domEvent.altKey,
      shiftKey: e.domEvent.shiftKey,
      ctrlKey: e.domEvent.ctrlKey,
    },
  }))(editor._eventRegistry.mousedown[1])
  
  let { play, stop, toggle, changeRate } = getControls(editor)
  
  // Add all event listeners
  let eventListeners = [
    // ['editor', 'keyup', shortcuts],
    ['editor', 'blur', stop],
    ['open', 'click', open],
    // ['editor', 'keydown', keyboardNote],
    ['editor', 'dblclick', playEditorNote(editor)],
    ['rate', 'change', changeRate],
    ['fontSize', 'click', setFontSize(editor)],
    ['instrument', 'change', changeInstrument],
    ['theme', 'change', setTheme(editor)],
    ['mode', 'change', setMode(editor)],
    ['tabscii', 'change', loadFile('tabscii/', editor)],
    ['gametabs', 'change', loadFile('gametabs/', editor)],
    ['classtab', 'change', loadFile('classtab/', editor)],
//     ['upload', 'change', upload],
    ['download', 'click', download(editor)],
    ['toggle', 'click', toggle],
  ].map(([id, event, handler]) => {
    console.log('addEventListener', { id, event, handler })
    return (id ? document.getElementById(id) : document).addEventListener(event, handler)
  })
  
}