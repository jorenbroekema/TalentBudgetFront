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
          height: 200px;
          margin-bottom: 15p;
          border-radius: 4px;
          display: flex;
        }

        .id {
          width: 100%;
          line-height: 40px;
          text-aling: center;
        }

        .name {
          width: 100%;
          line-height: 40px;
          text-aling: center;
        }

        .budget {
          width: 100%;
          line-height: 40px;
          text-aling: center;
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
