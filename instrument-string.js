import { LitElement, html } from './assets/@polymer/lit-element/lit-element.js'
import './assets/@polymer/paper-toast/paper-toast.js'
import './assets/@polymer/paper-progress/paper-progress.js'
import './load-select.js'

const notes = { first: 21, last: 109 }
const formats = ['mp3', 'ogg']

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

let {
  Player,
  Players,
  Synth,
  PluckSynth,
} = Tone

console.log({ Tone })

class InstrumentString extends LitElement {

  static get properties() {
    return {
      instrument: String,
      note: String,
      position: Number,
    }
  }

  
  async _firstRendered() {
    console.log('_firstRendered', this)
    this._root.getElementById('instrument').addEventListener('change', ({ detail: instrument }) => {
      this.setAttribute('instrument', instrument)
    })
    this._root.getElementById('key').addEventListener('change', ({ detail: note }) => {
      this.setAttribute('note', note)
    })
  }
  
  get toast() {
    return this._root.getElementById('toast')
  }

//   async _shouldRender(props, { instrument, note, progress }, prevProps) {
//     console.log('_shouldRender', { props, changedProps: {
//       instrument,
//       note,
//       progress,
//     }, prevProps })

//     Number.isInteger(instrument) && setPlayer(instrument).catch((a, b, c) => console.log('error', { a, b, c }))
//     this.play(note)
//     return true;
//   }

  async _propertiesChanged(props, changedProps, prevProps) {
    super._propertiesChanged(props, changedProps, prevProps);
    let { instrument, note } = changedProps;

    this.player = instrument ? await player(instrument).catch((console.error)) : this.player;
    console.log('_propertiesChanged', { props, changedProps, prevProps }, this.player)
    note && this.play(getNote(note))
  }

  async play(note) {
//     console.log('play', { note, instrument: this.instrument, player: this.player })
//       if (Number.isInteger(note) && note >= 0 && note < 88) {
//         console.log('playing', { note }, this.player)
        this.player.has(note) && this.player.get(note).start();
//       }
  }

  _render({ note, instrument }) {

    console.log('_render', { note, instrument })
    console.dir(this)
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
        }
        :host([hidden]) {
          display: none;
        }
        :host select {
          flex: 1;
          width: 100%;
          padding: 7px;
        }
      </style>
      <slot></slot>
      <paper-toast id="toast" duration="0">
      </paper-toast>
      <p>Instrument: ${instrument}</p>
      </br>
      <p>Note: ${note}</p>
      <p>${read(this.textContent)}</p>

      <load-select id="instrument" value$="${instrument}" src="./json/instruments.json"></load-select>
      <load-select id="key" value$="${note}" src="./json/keys.json"></load-select>
    `;
  }
  
}

customElements.define('instrument-string', InstrumentString);

async function player(instrument, ext='mp3') {

  function buffer(ogg) {
    return new Promise((resolve, reject) => new Players(ogg, resolve))
  }

  return (await fetch(`./assets/soundfonts/${instrument}/${ext}.json`)
    .then(response => response.json())
    .then(buffer)
    .catch(console.error)
  ).toMaster()
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

function read(text, position) {

  text = text.slice(0, position);
  let note = parseInt(text.slice(-1), 36);
  let string = getNote(mappings[text.split('|')[0]]);
  console.log('read', { text, note, string })
  return isNaN(note) ? null : note + string - 38;
}