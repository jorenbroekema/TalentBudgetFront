import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * `young-colfield`
 * 
 * @customElement
 * @polymer
 */
class YoungColfield extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: #F00
        }
      </style>
      <input type=text value={{inputFirstName::input}}>
      <input type=text value={{inputKlas::input}}>

      <paper-button raised class="indigo" on-click=_addStudentMethod>Submit Student</paper-button>

      <dom-repeat items={{students}}>
        <template>
          <div>Hello {{item.firstname}}, welcome to class {{item.klas}}.</div>
        </template>
      </dom-repeat>
      
      <br>Start Ajax:
      <paper-button raised on-click=startajax>Start Ajax</paper-button>
      <iron-ajax id="studentajax" handle-as="json" on-response="returnfrombackend">
        
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
      inputFirstName: {
        type: String,
        value: 'First name...',
      },
      inputKlas: {
        type: String,
        value: 'Klas...'
      },
      students: {
        type: Array,
        value(){
          return[
            { firstname:'Joost', klas: 'mavo4a' },
            { firstname:'Frits', klas: 'have5b' },
            { firstname:'Jan', klas: 'vwo6c' }
          ];
        }
      }
    };
  }

  _addStudentMethod() {
    this.push('students', {firstname:this.inputFirstName, klas:this.inputKlas});
    console.log(this.students);
  }

  startajax() {
    alert();
    var ajax = this.$.studentajax;
    ajax.url = "http://127.0.0.1:8083/api/expenditure";
    ajax.generateRequest();
  }

  returnfrombackend(response) {
    alert("in return from backend");
    console.log(response)
    alert(response.detail.response[0].description);
  }
}

window.customElements.define('young-colfield', YoungColfield);