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
    
    let budget = parseInt(this.budget);
    for (let i = 0; i < expenditures.length; i++) {
      budget = budget - expenditures[i].cost;     
    } 
      

    // Try to find the profile image:
    var imgURL = `../../resources/images/portraits/${name}.jpg`;
    var defaultImgURL = `../../resources/images/portraits/default.jpg`;

    talentContainer.classList.add('talent');
    talentContainer.innerHTML = `
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
          top: 25px;
          font-size: 18px;
        }
        .id {
          width: 100%;
          text-align: center;
          position: relative;
          top: 18px;
          color: grey;
        }
         .talent-team-name {
           width: 100%;
           text-align: center;
           position: relative;
           top: 25px;
           font-size: 18px;
         }
         .talent-team-id {
           width: 100%;
           text-align: center;
           position: relative;
           top: 20px;
           color: grey;
         }
        .budget {
          width: 100%;
          text-align: center;
          position: relative;
          top: 25px;
          color: #E46A35;
          font-size: 18px;
        }

      </style>
      <img src="${imgURL}" onerror="this.src='${defaultImgURL}'" alt="${name}" width="100" height="100" class=portrait>
      <div class="name">${name}</div>
      <div class="id">${id}</div>
      <div class="talent-team-name">${talentTeamName}</div>
      <div class="talent-team-id">${talentTeamID}</div>
      <div class="budget">€${budget}</div>

    `;
    shadow.appendChild(talentContainer);
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
}
customElements.define('budget-talent', BudgetTalent);