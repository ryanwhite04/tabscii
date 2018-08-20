import { LitElement, html } from '../../assets/@polymer/lit-element/lit-element.js'

const log = debug('component:load-select')

class LoadSelect extends LitElement {

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
  }
  
    /**
   * Sometimes it's useful to reflect js property values back to html attributes.
   * This can be done from the _propertiesChanged callback, which contains all
   * property change information.
   */
   
//   _propertiesChanged(props, changedProps, oldProps) {
//     // Make sure to call super, as this callback is used by LitElement as well.
//     super._propertiesChanged(props, changedProps, oldProps);

//     // In this case we are iterating over all properties and reflecting them.
//     Object.keys(this.constructor.properties).forEach((key) => {

//       // Only update if property changed
//       if (key in changedProps) {
//         const value = changedProps[key];

//         if (value !== undefined) {
//           this.setAttribute(key, value);
//         } else {
//           // Values are stringified as attributes. We don't like to see undefined
//           // in the DOM, so we remove the attribute.
//           this.removeAttribute(key);
//         }
//       }
//     });

//   }
  
  async _firstRendered() {
    let body = await fetch(this.src).catch(console.error)
    let json = await body.json().catch(console.error)
    this._setProperty('json', json);
    log('_firstRendered', json)
  }
  
  _changeHandler(detail) {
    this.setAttribute('value', detail)
    this.dispatchEvent(new CustomEvent('change', {
      detail,
      bubbles: true,
      composed: true,
    }))
    log('_changeHandler', detail)
  }
  
  _render({ src, json, value }) {
    
    function listOptions(option) {
      let {
        value,
        label,
      } = (typeof option === 'string') ? {
        label: option,
        value: option,
      } : option
      return html`<option value="${value}">${label}</option>`;
    }
    
    function listOptgroups({ label, options }) {
      return html`<optgroup label="${label}">${options.map(listOptions)}</optgroup>`
    }
    
    log('_render', { src, json, value })
    const { label, optgroups, options } = json
        
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