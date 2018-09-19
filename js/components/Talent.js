import './ExpenditureSmall.js';
class BudgetTalent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const talentContainer = document.createElement('div');
    const id = this.id;
    const name = this.name;
    const expenditures = JSON.parse(this.expenditures);
    const talentTeamID = this.talentTeamID;
    const talentTeamName = this.talentTeamName;
    const expendituresInProgress = this.expendituresInProgress;
    
    let budget = parseInt(this.budget);
    for (let i = 0; i < expenditures.length; i++) {
      budget = budget - expenditures[i].cost;     
    } 
      
    // Try to find the profile image:
    let imgURL = `../../resources/images/portraits/${name}.jpg`;
    let defaultImgURL = `../../resources/images/portraits/default.jpg`;
    
    let expendituresHTML = '';
    if (expendituresInProgress.length > 0){
      expendituresHTML = `<div class="expenditures-container">`;
      expendituresInProgress.forEach(expenditure => {
        expendituresHTML += `
          <budget-expenditure-small
            talent-id="${id}"
            expenditure-id="${expenditure.id}"
            title="${expenditure.name}"
            description="${expenditure.description}"
            goal-description="${expenditure.goal_description}"
            icon="fa-graduation-cap"
            budget="€${expenditure.cost}"
            state="${expenditure.state}"
          ></budget-expenditure-small>
        `;
      });
      expendituresHTML += `</div>`;
    }

    talentContainer.classList.add('talent');
    talentContainer.innerHTML = `
      <style>
        @import url("../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
        @import url("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
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
        }
        .id {
          width: 100%;
          text-align: center;
          position: relative;
          color: grey;
        }
        .budget {
          width: 100%;
          text-align: center;
          position: relative;
          color: red;
        }
        .talent-team-name {
          width: 100%;
          text-align: center;
          position: relative;
        }
      </style>
      <img style="margin-bottom: 10px" src="${imgURL}" onerror="this.src='${defaultImgURL}'" alt="${name}" width="100" height="100" class=portrait>
      <div class="name">${name}</div>
      <div class="id">${id}</div>
      <div class="budget">€${budget}</div>
      <div class="talent-team-name">${talentTeamName}</div>
      <h5>Expenditures:</h5>
    `;
    shadow.appendChild(talentContainer);
    let expendituresElem = document.createElement('div');
    expendituresElem.innerHTML = expendituresHTML;
    this.insertAdjacentElement('afterend', expendituresElem);
  }

  get id() {
    return this.getAttribute('id');
  }
  set id(number) {
    if (number) {
      this.setAttribute('id', number);
    } else {
      this.removeAttribute('id');
    }
  }

  get name() {
    return this.getAttribute('name');
  }
  set name(str) {
    if (str) {
      this.setAttribute('name', str);
    } else {
      this.removeAttribute('name');
    }
  }

  get budget() {
    return this.getAttribute('budget');
  }
  set budget(number) {
    if (number) {
      this.setAttribute('budget', number);
    } else {
      this.removeAttribute('budget');
    }
  }

  get expenditures(){
    return this.getAttribute('expenditures');
  }
  set expenditures(obj) {
    if (obj){
      this.setAttribute('expenditures', obj);
    } else {
      this.removeAttribute('expenditures');
    }
  }
  get talentTeamID() {
    return this.getAttribute('talent-team-id');
  }
  set talentTeamID(number) {
    if (number) {
      this.setAttribute('talent-team-id', number);
    } else {
      this.removeAttribute('talent-team-id');
    }
  }

  get talentTeamName() {
    return this.getAttribute('talent-team-name');
  }
  set talentTeamName(str) {
    if (str) {
      this.setAttribute('talent-team-name', str);
    } else {
      this.removeAttribute('talent-team-name');
    }
  }

  get expendituresInProgress() {
    const expenditureData = JSON.parse(this.getAttribute('expenditures'));
    let expendituresToReturn = [];
    expenditureData.forEach(expenditure => {
      if (parseInt(expenditure.state) === 2){
        expendituresToReturn.push(expenditure);
      }
    });
    return expendituresToReturn;
  }
}
customElements.define('budget-talent', BudgetTalent);