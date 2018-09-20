import { httpPort } from '../../localconfig.js';
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * `young-colfield`
 * 
 * @customElement
 * @polymer
 */
export class YoungColfield extends PolymerElement {

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this._startajax();
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
          text-align: center;
        }

        .talent-container {
          display: flex;
          justify-content: center;
        }

        .list-group {
          padding: 0px;
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }

        .list-group-item {
          height: 200px;
          width: 200px;
          margin: 10px;
          border-radius: 4px;
        }

        .new-talent-container{
          padding: 0 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }
      </style>
      
      <h1>Talent Polymer Demo</h1>
      <p>This is the talent view for the Polymer demo!</p>

      <input type=text value={{inputName::input}} placeholder="First name...">
      <input type=number value={{inputBudget::input}} placeholder="Budget...">
      <input type=number value={{inputTeamID::input}} placeholder="Talent Team ID...">
      <paper-button raised class="indigo" on-click=_addTalentMethod>Submit Talent</paper-button>

      <br>

      <input type=number value={{inputID::input}} placeholder="Talent ID...">
      <paper-button raised class="indigo" on-click=_deleteTalentMethod>Delete Talent</paper-button>
      
      <div><a href="http://127.0.0.1:8080/talent.html">Click here to switch to the normal Talent Page!</a></div>
      
      <div class="talent-container">
        <ul class="list-group">
          <dom-repeat items={{talents}}>
            <template>
              <span class="list-group-item">
                <budget-talent
                  id="{{item.id}}" 
                  name="{{item.name}}" 
                  budget="{{item.budget}}" 
                  talent-team-name="{{item.team.teamname}}" 
                  talent-team-id="{{item.team.id}}" 
                ></budget-talent>
              </span>
            </template>
          </dom-repeat>
        </ul>
      </div>
      
      <paper-button raised on-click=_startajax>Get Talents</paper-button>

      <iron-ajax id="deletetalentajax" handle-as="json" on-response="returnfromdelete"></iron-ajax>
      <iron-ajax id="addtalentajax" 
                 handle-as="json" 
                 method="POST"
                 headers='{"Accept": "application/json"}'
                 content-type='application/json'
                 on-response="returnfromadd">
      </iron-ajax>
      <iron-ajax id="gettalentajax" handle-as="json" on-response="returnfromget"></iron-ajax>
    `;
  }
  static get properties() {
    return {
      inputName: {
        type: String,
      },
      inputBudget: {
        type: Number,
      },
      inputTeamID: {
        type: Number,
      },
      inputID: {
        type: Number,
      },
      talents: {
        type: Array,
        value(){
          return[];
        }
      }
    };
  }

  _deleteTalentMethod() {
    var ajax = this.$.deletetalentajax;
    ajax.url = "http://127.0.0.1:" + httpPort + "/api/talent/" + this.inputID;
    ajax.method = 'delete';
    ajax.generateRequest();
  }

  returnfromdelete(response) {
    console.log(response);
    this._startajax();
  }

  _addTalentMethod() {
    var ajax = this.$.addtalentajax;
    ajax.url = "http://127.0.0.1:" + httpPort + "/api/talent";
    ajax.method = 'post';
    const submitData = {
      name: this.inputName,
      budget: this.inputBudget,
      talentTeam: {
        id: DOMElems.teamID.value,
      }
    }
    console.log(submitData);
    ajax.body = JSON.stringify(submitData);
    ajax.generateRequest()
  }

  returnfromadd(response) {
    console.log(response);
    this._startajax();
  }
  
  _startajax() {
    var ajax = this.$.gettalentajax;
    ajax.url = "http://127.0.0.1:" + httpPort + "/api/talent/all";
    ajax.generateRequest();
  }

  returnfromget(response) {
    response = response.detail.response;  // Get the inner response, which contains the actual talents.
    this.talents = [];                    // Reset the array, because we will rebuild it from scratch.
    for (var i = 0; i < response.length; i++) {
      //console.log(response[i]);
      if (response[i].talentTeam == null) {
        response[i].talentTeam = {
          id: 'null',
          teamname: 'null'
        };
      }
      this.push('talents', { id: response[i].id, 
                              name: response[i].name, 
                              budget: response[i].budget, 
                              //expenditures: response[i].expenditures,
                              team: { id:response[i].talentTeam.id, 
                                      teamname:response[i].talentTeam.teamname } });
    }
    //console.log(this.talents);
  }
}

window.customElements.define('young-colfield', YoungColfield);