import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `talentbudgetfront-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TalentbudgetfrontElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'talentbudgetfront-element',
      },
    };
  }
}

window.customElements.define('talentbudgetfront-element', TalentbudgetfrontElement);
