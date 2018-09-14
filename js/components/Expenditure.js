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

    this.setAttribute('data-toggle', 'modal');
    // TODO: Make #myModal configurable!
    this.setAttribute('data-target', '#myModal');

    expenditureContainer.classList.add('expenditure');
    expenditureContainer.setAttribute('data-toggle', 'modal');
    expenditureContainer.setAttribute('data-target', '#myModal');
    expenditureContainer.innerHTML = `
      <style>
        @import url("./node_modules/@fortawesome/fontawesome-free/css/all.min.css");
        @import url("./node_modules/bootstrap/dist/css/bootstrap.min.css");

        :host{
          width: 100%;
        }

        .expenditure{
          display: flex;
          padding: 15px;
        }

        .icon{
          margin-right: 15px;
        }
        
        .title{
          width: 100%;
          line-height: 30px;
          text-align: center;
        }
        
        .budget{
          line-height: 30px;
          font-weight: bold;
        }
      </style>
      <div class="icon"><i class="fas ${icon} fa-2x"></i></div>
      <div class="title">${title}</div>
      <div class="budget">${budget}</div>
    `;

    shadow.appendChild(expenditureContainer);
    this.createModal();
  }

  createModal(){
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Modal Header</h4>
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

  get BSmodal(){
    return this.hasAttribute('BSmodal');
  }
}
customElements.define('budget-expenditure', BudgetExpenditure);
