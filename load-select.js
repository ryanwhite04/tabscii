// import { LitElement, html } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

import { LitElement, html } from './assets/@polymer/lit-element/lit-element.js'
// import themes from './json/themes.json';

// console.log({ themes });
// const json = {
//   label: "Tabscii",
//   optgroups: [
//     {
//       label: "Main",
//       options: [
//         { value: "home.txt", label: "Home" },
//         { value: "formatting.txt", label: "Formatting" },
//         { value: "instructions.txt", label: "Instructions" }
//       ]
//     },
//     {
//       label:  "Songs",
//       options: [
//         { value: "songs.txt", label: "Songs" },
//         { value: "breeze-on-a-hill.txt", label: "Breeze On A Hill" },
//         { value: "heartbeats Jose Gonzalez.txt", label: "Heartbeats" },
//         { value: "heartbeats.txt", label: "Heartbeats 2" },
//         { value: "ryansong.txt", label: "Other" },
//         { value: "song1.txt", label: "Number 1" },
//         { value: "something.txt", label: "Something" }
//       ]
//     }
//   ]
// };

class LoadSelect extends LitElement {

  it = {
    a: 2, b: 4
  }
  static get properties() {
    return {
      src: String,
      json: Object,
      value: String,
    }
  }

  // json = {}
  constructor() {
    super();
    this.json = {};
    // this.addEventListener('')
  }
  
    /**
   * Sometimes it's useful to reflect js property values back to html attributes.
   * This can be done from the _propertiesChanged callback, which contains all
   * property change information.
   */
  _propertiesChanged(props, changedProps, oldProps) {
    // Make sure to call super, as this callback is used by LitElement as well.
    super._propertiesChanged(props, changedProps, oldProps);

    // In this case we are iterating over all properties and reflecting them.
    Object.keys(this.constructor.properties).forEach((key) => {

      // Only update if property changed
      if (key in changedProps) {
        const value = changedProps[key];

        if (value !== undefined) {
          this.setAttribute(key, value);
        } else {
          // Values are stringified as attributes. We don't like to see undefined
          // in the DOM, so we remove the attribute.
          this.removeAttribute(key);
        }
      }
    });

    // Instead of reflect all properties all the time, you could implement a separate property
    // to control which properties are reflected:

    // this._reflectedProperties.forEach((key) => {
    //   ... same as above
    // });
  }
  
  async _firstRendered() {
    console.dir(this)
    let body = await fetch(this.src).catch(console.error)
    let json = await body.json().catch(console.error)
    this._setProperty('json', json);
    console.log(json)
  }
  
  _changeHandler(detail) {
    this.setAttribute('value', detail)
    this.dispatchEvent(new CustomEvent('change', {
      detail,
      bubbles: true,
      composed: true,
    }))
  }
  
  _render({ src, json, value }) {
    
    function listOptions({ label, value }) {
      return html`<option value="${value}">${label}</option>`;
    }
    
    function listOptgroups({ label, options }) {
      return html`<optgroup label="${label}">${options.map(listOptions)}</optgroup>`
    }
    
    // const body = await fetch(src).catch(console.error);
    // const json = await body.json().catch(console.error);
    
    console.log({ src, json })
    const { label, optgroups, options } = json
    
    // console.log(json)
    
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
      <select title="${label}" value="${value}" on-change="${e => this._changeHandler(e.target.value)}">${optgroups ?
        optgroups.map(listOptgroups) :
        options ? options.map(listOptions) : "Loading..."}
      </select>
    `;
  }
  
}

customElements.define('load-select', LoadSelect);