import { LitElement, html } from '../../assets/@polymer/lit-element/lit-element.js'
import '../../assets/@polymer/paper-toast/paper-toast.js'
import '../../assets/@polymer/paper-progress/paper-progress.js'

const log = debug('component:instrument-string')
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

log({ Tone })

class InstrumentString extends LitElement {

  static get properties() {
    return {
      instrument: String,
      note: String,
      position: Number,
    }
  }

  async _firstRendered() {
    log('_firstRendered', this)
  }
  
  getNote(string = '') {
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
  
  get key() {
    return this.getNote(this.note)
  }
  
  get toast() {
    return this._root.getElementById('toast')
  }
  
  read(text, position) {

    text = text.slice(0, position);
    let note = parseInt(text.slice(-1), 36);
    let string = this.getNote(mappings[text.split('|')[0]]);
    log('read', { text, note, string })
    return isNaN(note) ? null : note + string - 38;
  }

  async _propertiesChanged(props, changedProps, prevProps) {
    super._propertiesChanged(props, changedProps, prevProps);
    let { instrument, note } = changedProps;

    this.player = instrument ? await player(instrument).catch((console.error)) : this.player;
    log('_propertiesChanged', { props, changedProps, prevProps }, this.player)
  }

  play() {
    this.player.has(this.key) && this.player.get(this.key).start();
  }

  _render({ note, instrument }) {

    log('_render', { note, instrument })
    console.dir(this)
    return html`
      <style>
        :host {
        }
        :host([hidden]) {
          display: none;
        }
        :host select {
          // flex: 1;
          // width: 100%;
          padding: 7px;
        }
      </style>
      <slot></slot>
      <paper-toast id="toast" duration="0"></paper-toast>
      <p>Instrument: ${instrument}</p>
      <p>Note: ${note}</p>
      <p>${this.read(this.textContent)}</p>
    `;
  }
  
}

customElements.define('instrument-string', InstrumentString);

async function player(instrument, ext='mp3') {

  function buffer(ogg) {
    return new Promise((resolve, reject) => new Players(ogg, resolve))
  }

  return (await fetch(`../../assets/soundfonts/${instrument}/${ext}.json`)
    .then(response => response.json())
    .then(buffer)
    .catch(console.error)
  ).toMaster()
}