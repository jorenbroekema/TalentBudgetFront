class BudgetExpenditure extends HTMLElement {
  constructor(){
    super();

    this.addEventListener('click', e =>{
      this.displayDialog();
    });
  }

  connectedCallback(){
    console.log("element loaded in the DOM");
    const shadow = this.attachShadow({ mode: 'open' });
    const expenditureContainer = document.createElement('div');
    const title = this.title;
    const icon = this.icon;
    const budget = this.budget;

    expenditureContainer.classList.add('expenditure');

    expenditureContainer.innerHTML = `
      <style>
        @import url("./node_modules/@fortawesome/fontawesome-free/css/all.min.css");

        :host{
          width: 100%;
        }

        .expenditure{
          height: 60px;
          margin-bottom: 15px;
          border-radius: 4px;
          display: flex;
        }

        .icon{
          margin-right: 15px;
          line-height: 50px;
        }
        
        .title{
          width: 100%;
          line-height: 40px;
          text-align: center;
        }
        
        .budget{
          line-height: 40px;
          font-weight: bold;
        }
      </style>
      <div class="icon"><i class="fas ${icon} fa-2x"></i></div>
      <div class="title">${title}</div>
      <div class="budget">${budget}</div>
    `;
    shadow.appendChild(expenditureContainer);
  }
  
  displayDialog(){
    console.log("clicked the expenditure!");
  }

  get title(){
    return this.getAttribute('title');
  }

  set title(str){
    if (str) {
      this.setAttribute('title', str);
    } else {
      this.removeAttribute();
    }
  }

  get icon(){
    return this.getAttribute('icon');
  }

  set icon(str){
    if (str) {
      this.setAttribute('icon', str);
    } else {
      this.removeAttribute();
    }
  }

  get budget(){
    return this.getAttribute('budget');
  }

  set budget(str){
    if (str) {
      this.setAttribute('budget', str);
    } else {
      this.removeAttribute();
    }
  }
}
customElements.define('budget-expenditure', BudgetExpenditure);
