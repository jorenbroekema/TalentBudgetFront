class BudgetTalent extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', e =>{
      this.displayDialog();
    });
  }

  connectedCallback() {
    console.log("talent element loaded in the DOM");
    const shadow = this.attachShadow({ mode: 'open' });
    const talentContainer = document.createElement('div');
    const id = this.id;
    const name = this.name;
    const budget =this.budget;
    //const expenditures = 
    //const teams = 

    talentContainer.classList.add('talent');

    talentContainer.innerHTML = `
      <style>
        :host {
          width: 100%;
        }

        .talent {
          /*height: 100px;
          margin-bottom: 15px;
          border-radius: 4px;
          display: flex;*/
          position: relative;
        }

        .name {
          width: 100%;
          text-align: center;
          position: absolute;
          top: 0px;
        }

        .id {
          width: 100%;
          text-align: center;
          position: absolute;
          top: 20px;
          color: grey;
        }

        .budget {
          width: 100%;
          text-align: center;
          position: absolute;
          top: 60px;
          color: red;
        }
      </style>
      <div class="id">${id}</div>
      <div class="name">${name}</div>
      <div class="budget">${budget}</div>
    `;
    shadow.appendChild(talentContainer);
  }

  displayDialog() {
    console.log("clicked the talent!");
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
}
customElements.define('budget-talent', BudgetTalent);
