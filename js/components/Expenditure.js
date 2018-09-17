class BudgetExpenditure extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    const shadow = this.attachShadow({ mode: 'open' });
    const expenditureContainer = document.createElement('div');
    const title = this.title;
    const icon = this.icon;
    const budget = this.budget;
    const state = this.state;
    const ex_id = this.expenditureID;
    let stateIcon;

    switch(state){
      case 'approved': stateIcon = 'fa-check-circle';
      break;
      case 'in-progress': stateIcon = 'fa-spinner';
      break; 
      case 'declined': stateIcon = 'fa-exclamation-circle';
      break;
      case 'done': stateIcon = 'fa-clipboard-check';
      break;
    }

    this.setAttribute('data-toggle', 'modal');
    this.setAttribute('data-target', '#modal-' + ex_id); 

    expenditureContainer.classList.add('expenditure', state);
    expenditureContainer.innerHTML = `
      <style>
        @import url("../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");
        @import url("../../node_modules/bootstrap/dist/css/bootstrap.min.css");

        :host{
          width: 100%;
        }

        .expenditure{
          display: flex;
          padding: 15px;
          height: 100%;
        }
        
        .title{
          width: 100%;
          line-height: 30px;
          text-align: center;
        }

        .title .fas{
          margin-left: 10px;
          font-size: 18px;
        }
        
        .budget{
          line-height: 30px;
          font-weight: bold;
        }

        .approved{border: 2px solid #dff0d8}
        .in-progress{border: 2px solid #fcf8e3}
        .declined{border: 2px solid #f2dede}
        .done{border: 2px solid #d9edf7}
      </style>
      <div class="icon"><i class="fas ${icon} fa-2x"></i></div>
      <div class="title">${title} <i class="fas ${stateIcon}"></i></div>
      <div class="budget">${budget}</div>
    `;

    shadow.appendChild(expenditureContainer);
    this.createModal();
  }

  createModal(){
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
      <div class="modal fade" id="modal-${this.expenditureID}" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">${this.title}</h4>
            </div>
            <div class="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>
    `;
    this.insertAdjacentElement('afterend', modalContainer);
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

  get state(){
    const state = this.getAttribute('state');
    const stateStrings = ['approved', 'in-progress', 'declined', 'done']
    return stateStrings[parseInt(state)-1];
  }

  get expenditureID(){
    return this.getAttribute('expenditure-id');
  }
}
customElements.define('budget-expenditure', BudgetExpenditure);
