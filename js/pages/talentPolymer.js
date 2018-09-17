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
        .talent {
          position: relative;
        }
        .portrait {
          border-radius: 50%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .name {
          width: 100%;
          text-align: center;
          position: relative;
          top: 10px;
        }
        .id {
          width: 100%;
          text-align: center;
          position: relative;
          top: 10px;
          color: grey;
        }
        .budget {
          width: 100%;
          text-align: center;
          position: relative;
          top: 20px;
          color: red;
        }
        .talent-team-id {
          width: 100%;
          text-align: center;
          position: relative;
          top: 20px;
          color: grey;
        }
        .talent-team-name {
          width: 100%;
          text-align: center;
          position: relative;
          top: 20px;
        }
      </style>
      
      <h1>Talent Polymer Demo</h1>
      <p>This is the talent view for the Polymer demo!</p>

      <input type=text value={{inputName::input}} placeholder="First name...">
      <input type=text value={{inputBudget::input}} placeholder="Budget...">
      <input type=text value={{inputTeamID::input}} placeholder="Team ID...">

      <paper-button raised class="indigo" on-click=_addStudentMethod>Submit Student</paper-button>
      
      <div><a href="http://127.0.0.1:8080/talent.html">Click here to switch to the normal Talent Page!</a></div>

      <dom-repeat items={{students}}>
        <template>
          <li class="list-group-item">
            <budget-talent
              id={{item.id}}
              name="{{item.name}}"
              budget={{item.budget}}
              talent-team-name="{{item.team.teamname}}"
              talent-team-id={{item.team.id}}
            ></budget-talent>
          </li>
        
          <div>Hello {{item.name}}, welcome to team {{item.team.teamname}}.</div>
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
    ajax.url = "http://127.0.0.1:8083/api/talent";
    ajax.generateRequest()
    this.push('students', { name: this.inputName, budget: this.inputBudget, team: { id: this.inputTeamID } });
    console.log(this.students);
  }

  startajax() {
    var ajax = this.$.studentajax;
    ajax.url = "http://127.0.0.1:8083/api/talent/all";
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
                              expenditures: response[i].expenditures,
                              team: { id:response[i].talentTeam.id, 
                                      teamname:response[i].talentTeam.teamname } });
    }
  }
}

window.customElements.define('young-colfield', YoungColfield);