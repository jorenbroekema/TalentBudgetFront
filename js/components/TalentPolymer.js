import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Define the element's API using an ES2015 class
class BudgetTalent extends PolymerElement {

  // Define optional shadow DOM template
  static get template() { 
    // Try to find the profile image:
    var imgURL = `../../resources/images/portraits/${name}.jpg`;
    var defaultImgURL = `../../resources/images/portraits/default.jpg`;

    return html`
      <style>
        /* CSS rules for your element */
      </style>
      <style>
        :host {
          width: 100%;
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
      <img src="${imgURL}" onerror="this.src='${defaultImgURL}'" alt="${name}" width="100" height="100" class=portrait>
      <div class="name">${name}</div>
      <div class="id">${id}</div>
      <div class="budget">€${budget}</div>
      <div class="talent-team-id">${talentTeamID}</div>
      <div class="talent-team-name">${talentTeamName}</div>

      <!-- shadow DOM for your element -->

      <div>[[greeting]]</div> <!-- data bindings in shadow DOM -->
    `;
  }

  // Declare properties for the element's public API
  static get properties() {
    return {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      budget: {
        type: Number
      },
      team: {
        type: {
          id: {
            type: Number
          },
          teamname: {
            type: String
          }
        }
      }
    }
  }

  constructor() {
    super();
  }

  // Add methods to the element's public API
  greetMe() {
    console.log(this.greeting);
  }

}

// Register the budget-talent element with the browser
customElements.define('budget-talent', BudgetTalent);