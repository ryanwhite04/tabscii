import { LitElement, html } from '../../assets/@polymer/lit-element/lit-element.js'
import '../../assets/@polymer/paper-toast/paper-toast.js'
import '../../assets/@polymer/paper-progress/paper-progress.js'
import '../../debug.js'
import Tone from './tone.js'
import '../ace-editor/index.js'

let {
  names,
  families,
  notes,
  formats,
} = {
  "families": [
    "Piano",
    "Chromatic Percussion",
    "Organ",
    "Guitar",
    "Bass",
    "Strings",
    "Ensemble",
    "Brass",
    "Reed",
    "Pipe",
    "Synth Lead",
    "Synth Pad",
    "Synth Effects",
    "Ethnic",
    "Percussive",
    "Sound Effects"
  ],
  "path": "instruments",
  "notes": {
    "first": 21,
    "last": 109
  },
  "formats": [
    "mp3",
    "ogg"
  ],
  "names": [
    "Acoustic Grand Piano",
    "Bright Acoustic Piano",
    "Electric Grand Piano",
    "Honky-tonk Piano",
    "Electric Piano 1",
    "Electric Piano 2",
    "Harpsichord",
    "Clavichord",
    "Celesta",
    "Glockenspiel",
    "Music Box",
    "Vibraphone",
    "Marimba",
    "Xylophone",
    "Tubular bells",
    "Dulcimer",
    "Drawbar Organ",
    "Percussive Organ",
    "Rock Organ",
    "Church Organ",
    "Reed Organ",
    "Accordion",
    "Harmonica",
    "Tango Accordion",
    "Acoustic Guitar (nylon)",
    "Acoustic Guitar (steel)",
    "Electric Guitar (jazz)",
    "Electric Guitar (clean)",
    "Electric Guitar (muted)",
    "Overdriven Guitar",
    "Distortion Guitar",
    "Guitar harmonics",
    "Acoustic Bass",
    "Electric Bass (finger)",
    "Electric Bass (pick)",
    "Fretless Bass",
    "Slap Bass 1",
    "Slap bass 2",
    "Synth Bass 1",
    "Synth Bass 2",
    "Violin",
    "Viola",
    "Cello",
    "Contrabass",
    "Tremolo Strings",
    "Pizzicato Strings",
    "Orchestral Harp",
    "Timpani",
    "String Ensemble 1",
    "String Ensemble 2",
    "SynthStrings 1",
    "SynthStrings 2",
    "Choir Aahs",
    "Voice Oohs",
    "Synth Voice",
    "Orchestra Hit",
    "Trumpet",
    "Trombone",
    "Tuba",
    "Muted Trombone",
    "French Horn",
    "Brass Section",
    "SynthBrass 1",
    "SynthBrass 2",
    "Soprano Sax",
    "Alto Sax",
    "Tenor Sax",
    "Baritone Sax",
    "Oboe",
    "English Horn",
    "Bassoon",
    "Clarinet",
    "Piccolo",
    "Flute",
    "Recorder",
    "Pan Flute",
    "Blown Bottle",
    "Shakuhachi",
    "Whistle",
    "Ocarina",
    "Lead 1 (square)",
    "Lead 2 (sawtooth)",
    "Lead 3 (calliope)",
    "Lead 4 (chiff)",
    "Lead 5 (charang)",
    "Lead 6 (voice)",
    "Lead 7 (fifths)",
    "Lead 8 (bass + lead)",
    "Pad 1 (new age)",
    "Pad 2 (warm)",
    "Pad 3 (polysynth)",
    "Pad 4 (choir)",
    "Pad 5 (bowed)",
    "Pad 6 (metallic)",
    "Pad 7 (halo)",
    "Pad 8 (sweep)",
    "FX 1 (rain)",
    "FX 2 (soundtrack)",
    "FX 3 (crystal)",
    "FX 4 (atmosphere)",
    "FX 5 (brightness)",
    "FX 6 (goblins)",
    "FX 7 (echoes)",
    "FX 8 (sci-fi)",
    "Sitar",
    "Banjo",
    "Shamisen",
    "Koto",
    "Kalimba",
    "Bag pipe",
    "Fiddle",
    "Shanai",
    "Tinkle Bell",
    "Agogo",
    "Steel Drums",
    "Woodblock",
    "Taiko Drum",
    "Melodic Tom",
    "Synth Drum",
    "Reverse Cymbal",
    "Guitar Fret Noise",
    "Breath Noise",
    "Seashore",
    "Bird Tweet",
    "Telephone Ring",
    "Helicopter",
    "Applause",
    "Gunshot"
  ]
}

let {
  // Player,
  Players,
  // Synth,
  // PluckSynth,
} = Tone;

const log = debug('component:player-editor')

const mappings = {
  '_': '|',
  '^': '|L10|R',
  '$': '|M10|S',
  'e': '|E6 ',
  'B': '|B5 ',
  'G': '|G5 ',
  'D': '|D5 ',
  'A': '|A4 ',
  'E': '|E4 ',
}

function read(text, position) {
  
  const mappings = {
    '_': '|',
    '^': '|L10|R',
    '$': '|M10|S',
    'e': '|E6 ',
    'B': '|B5 ',
    'G': '|G5 ',
    'D': '|D5 ',
    'A': '|A4 ',
    'E': '|E4 ',
  }
  text = text.slice(0, position);
  let note = parseInt(text.slice(-1), 36);
  let string = getNote(mappings[text.split('|')[0]]);
  log('read', { text, note, string })
  return isNaN(note) ? null : note + string - 38;
}

function getNote(string = '') {
  var trimmed = string.trim();
  var octave = Number(trimmed.slice(-1));
  var note = trimmed.slice(1, -1);
  return ([
    'C', 'C#',
    'D', 'D#',
    'E',
    'F', 'F#',
    'G', 'G#',
    'A', 'A#',
    'B'
  ].indexOf(note) + 12 * octave);
}

async function loadInstrument(id = 24, ext = 'mp3') {

  function buffer(ogg) {
    return new Promise((resolve, reject) => new Players(ogg, resolve))
  }

  const player = (await fetch(`../../assets/soundfonts/${names[id]}/${ext}.json`)
    .then(response => response.json())
    .then(buffer)
    .catch(console.error)).toMaster()

  return {
    name: names[id],
    notes: { first: 21, last: 109 },
    formats: ['mp3', 'ogg'],
    family: families[~~(id / 16)],
    play: note => {
      log('play', { note })
      player.has(note) && player.get(note).start()
    },
  }
}
  
class PlayerEditor extends LitElement {
  
  static get properties() {
    return {
      instrument: Object,
      playing: Boolean,
      tempo: Number,
      instruments: Array,
      value: String,
    }
  }
  
  constructor() {
    super();
    this.instruments = new Array(128).fill(false);
    this.tempo = 240;
    this.playing = false;
    this.value = this.textContent;
    loadInstrument()
      .then(instrument => this.instrument = instrument)

  }
  
  // These functions are performed when interacting with ace editor
  toggle() {
    log('toggle', this.playing)
    this.playing ?
      clearInterval(this.timer) :
      this.timer = setInterval(() => this.editor.execCommand('gotolineend'), 15000 / this.tempo);
    this.playing = !this.playing;
  }
  
  back = ({ instrument }) => {
    let self = this;
    return function (editor, { count, ...args }) {
      const { row, column } = editor.getCursorPosition();
      const line = editor.getValue().split('\n')[row]
      const note = read(line.slice(0, column))
      const next = line.slice(column - 4, column )
      
      log('back', self, self.instrument, { row, column, line, note, next })
      
      // .split('').reverse().join('')
      if (/\|---/.test(next)) {
        editor.navigateLeft(4);
        log('Skip', `${next}: ${row}, ${column}`)
        this.exec(editor, { ...args, count: ++count });
      } else if (!column) {
        editor.navigateUp(10)
        editor.navigateLineEnd()
        
        log('New', `${next}: ${row}, ${column}`)
        this.exec(editor, { ...args, count: ++count });
      } else {
        self.instrument && self.instrument.play(note)
        editor.navigateLeft(args.times)
        log('Play', `${next}: ${row}, ${column}`)
      }
    }
  }
    
  next = ({ instrument }) => function (editor, { count, ...args }) {
    const { row, column } = editor.getCursorPosition();
    const line = editor.getValue().split('\n')[row]
    const note = read(line.slice(0, 1+column))
    const next = line.slice(column, column + 4)
    
    log('next', instrument, { row, column, line, note, next })
    
    if (/\|---/.test(next)) {
      editor.navigateRight(4);
      log('Skip', `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else if (/\|L\d\d/.test(next)) {
      let col = next.slice(2);
      editor.navigateTo(parseInt(next.slice(2)), 0)
      log(`Jump to ${col}`, `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else if (/^\|\s*$/.test(next)) {
      editor.navigateDown(10)
      editor.navigateLineStart()
      log('Last', `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else if (/^\|\|\s*$/.test(next)) {
      // editor.navigateDown(10)
      editor.navigateLineStart()
      log('Last', `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else if (/^\*\|\s*$/.test(next)) {
      // editor.navigateDown(10)
      debugger;
      editor.navigateLineStart()
      log('Last', `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else if (!column && /\|?[A-Ga-g]?#?\d?\|/.test(next)) {
      editor.navigateRight(next.split('|')[0].length)
      log('New', `${next}: ${row}, ${column}`)
      this.exec(editor, { ...args, count: ++count });
    } else {
      instrument && instrument.play(note)
      editor.navigateRight(args.times)
      log('Play', `${next}: ${row}, ${column}`, note)
    }
  }
  
  download = app => function(editor, args) {
    log('download')
  }
  
  upload = app => function(editor, args) {
    log('upload')
  }

  prepareEditor = ({ detail: { editor }}) => {

    const {
      toggle,
      back,
      next,
      loadInstrument,
      download,
      upload,
    } = this;
    
    log('prepareEditor', { editor }, this)
    
    let commands = [
      {
        name: 'toggle',
        exec: toggle,
        bindKey: { win: 'Alt-Space', mac: 'Alt-Space' },
      },
      {
        name: 'download',
        exec: download(this),
        bindKey: { win: 'Ctrl-S', mac: 'Ctrl-S' },
      },
      {
        name: 'upload',
        exec: upload(this),
        bindKey: { win: 'Ctrl-O', mac: 'Ctrl-O' },
      },
      {
        name: 'gotolinestart',
        exec: back(this),
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
      },
      {
        name: 'gotolineend',
        exec: next(this),
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
      }
    ]
    
    commands.map(({ name, ...command }) => {
      editor.commands.addCommand({
        ...(editor.commands.commands[name] || { name }),
        ...command,
      })
    })
    
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
    
    editor.setOptions({
      lineNumbers: true,
      viewportMargin: Infinity,
      firstLineNumber: 0,
      fixedGutter: false,
      selectionStyle: 'line',
    })
  }

  _render({ value }) {

    log('_render', { value })
    
    return html`
      <style>
        :host {
          display: block;
        }
        #editor {
          height: 300px;
        }
      </style>
      <ace-editor id="editor"
        mode="text"
        theme="github"
        on-ready="${this.prepareEditor}"
        on-change="${log}"
        alt>
        ${value}
      </ace-editor>
    `;
  }
  
}

customElements.define('player-editor', PlayerEditor);