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
class YoungColfield extends PolymerElement {
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
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }

        .list-group-item {
          height: 230px;
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
      <input type=text value={{inputBudget::input}} placeholder="Budget...">
      <input type=text value={{inputTeamID::input}} placeholder="Team ID...">

      <paper-button raised class="indigo" on-click=_addStudentMethod>Submit Talent</paper-button>
      
      <div><a href="http://127.0.0.1:8080/talent.html">Click here to switch to the normal Talent Page!</a></div>
      
      <div class="talent-container">
        <ul class="list-group" id="ajaxResponseTalents">
          <dom-repeat items={{students}}>
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
      
      <paper-button raised on-click=startajax>Get Talents</paper-button>
      <iron-ajax id="studentajax" handle-as="json" on-response="returnfrombackend">
        
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
      inputName: {
        type: String,
        value: undefined,
      },
      inputBudget: {
        type: Number,
        value: undefined
      },
      inputTeamID: {
        type: Number,
        value: undefined
      },
      students: {
        type: Array,
        value(){
          return[
            { id:123, name:'billy', budget:345, team:{ id:67, teamname:'ABC' } },
          ];
        }
      }
    };
  }

  _addStudentMethod() {
    var ajax = this.$.studentajax;
    ajax.url = "http://127.0.0.1:" + httpPort + "/api/talent";
    ajax.generateRequest()
    this.push('students', { name: this.inputName, budget: this.inputBudget, team: { id: this.inputTeamID } });
    console.log(this.students);
  }

  startajax() {
    var ajax = this.$.studentajax;
    ajax.url = "http://127.0.0.1:" + httpPort + "/api/talent/all";
    ajax.generateRequest();
  }

  returnfrombackend(response) {
    response = response.detail.response;  // Get the inner response, which contains the actual talents.
    this.students = [];                   // Reset the array, because we will rebuild it from scratch.
    for (var i = 0; i < response.length; i++) {
      console.log(response[i]);
      if (response[i].talentTeam == null) {
        response[i].talentTeam = {
          id: 'null',
          teamname: 'null'
        };
      }
      this.push('students', { id: response[i].id, 
                              name: response[i].name, 
                              budget: response[i].budget, 
                              //expenditures: response[i].expenditures,
                              team: { id:response[i].talentTeam.id, 
                                      teamname:response[i].talentTeam.teamname } });
    }
    console.log(this.students);
  }
}

window.customElements.define('young-colfield', YoungColfield);