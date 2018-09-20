import { patchData, deleteData } from '../../js/AjaxMixin.js';
import { loadTeams } from '../pages/talent.js';

class BudgetExpenditureSmall extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    const shadow = this.attachShadow({ mode: 'open' });
    const expenditureContainer = document.createElement('div');
    const title = this.title;
    const state = this.state;
    const ex_id = this.expenditureID;
    let stateIcon;

    switch(state){
      case 'approved': 
        stateIcon = 'fa-check-circle';
        this.buttonDisplays = ['btn-request', 'btn-finish'];
      break;
      case 'in-progress': 
        stateIcon = 'fa-spinner';
        this.buttonDisplays = ['btn-request', 'btn-approve', 'btn-decline'];
      break; 
      case 'declined': 
        stateIcon = 'fa-exclamation-circle';
        this.buttonDisplays = ['btn-request', 'btn-delete'];
      break;
      case 'done': 
        stateIcon = 'fa-clipboard-check';
        this.buttonDisplays = [];
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
          margin-top: 10px;
          height: 100%;
          border-radius: 4px;
          -webkit-transition: all 0.30s ease-in-out;
          -moz-transition: all 0.30s ease-in-out;
          -ms-transition: all 0.30s ease-in-out;
          -o-transition: all 0.30s ease-in-out;
          outline: none;
        }

        .expenditure:hover{
          cursor: pointer;
          box-shadow: 0 0 5px rgba(81, 203, 238, 1);
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
      <div class="title">${title}</div>
    `;

    shadow.appendChild(expenditureContainer);
    this.createModal();
  }

  createModal(){
    const modalContainer = document.createElement('div');
    const stateString = this.toPascalCase(this.state);
    const buttonMapping = {
      "btn-request": "Request Approval",
      "btn-decline": "Decline",
      "btn-approve": "Approve",
      "btn-delete": "Delete",
      "btn-finish": "Finish"
    };
    let buttonsHTML = '';
    if(this.buttonDisplays){
      this.buttonDisplays.split(',').forEach(button => {
        buttonsHTML += `<button 
          type="button" 
          class="btn btn-default ${button}" 
          data-dismiss="modal"
        >${buttonMapping[button]}</button>`
      });
    }

    modalContainer.innerHTML = `
      <style>
        .modal-state{width: max-content}
        .approved, .btn-approve{border-bottom: 2px solid #dff0d8}
        .in-progress, .btn-request{border-bottom: 2px solid #fcf8e3}
        .declined, .btn-decline, .btn-delete{border-bottom: 2px solid #f2dede}
        .done, .btn-finish{border-bottom: 2px solid #d9edf7}
        .btn-request{float: left}
      </style>
      <div class="modal fade" id="modal-${this.expenditureID}" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h3 class="modal-title">${this.title}</h3>
              <h5 class="modal-state ${this.state}">Status: ${stateString}</h5>
            </div>
            <div class="modal-body">
              <h4>Description</h4>
              <p>${this.description}</p>
              <hr>
              <h4>Goal</h4>
              <p>${this.goalDescription}</p>
            </div>
            <div class="modal-footer">
              ${buttonsHTML}
            </div>
          </div>
          
        </div>
      </div>
    `;
    this.insertAdjacentElement('afterend', modalContainer);

    // TODO: configurable callback names, needs more elegance
    const buttons = document.querySelector(`#modal-${this.expenditureID} .modal-footer`).children;
    for (let i = 0; i < buttons.length; i++){
      let func = `ex_${buttons[i].classList[2].split('-')[1]}`;
      switch(func){
        case 'ex_finish':
          buttons[i].addEventListener('click', () => {
            this.ex_finish(this.expenditureID);
          });
        break;
        case 'ex_approve':
          buttons[i].addEventListener('click', () => {
            this.ex_approve(this.expenditureID);
          });
        break;
        case 'ex_request':
          buttons[i].addEventListener('click', () => {
            this.ex_request(this.expenditureID);
          });
        break;
        case 'ex_delete':
          buttons[i].addEventListener('click', () => {
            this.ex_delete(this.expenditureID);
          });
        break;
        case 'ex_decline':
          buttons[i].addEventListener('click', () => {
            this.ex_decline(this.expenditureID);
          });
        break;
      }      
    }
  }

  ex_approve(expenditureID){
    patchData(`api/expenditure/${expenditureID}/state/1`).then( (response) => {
      loadTeams();
    });
  }

  ex_request(expenditureID){
    patchData(`api/expenditure/${expenditureID}/state/2`).then( (response) => {
      loadTeams();
    });
  }

  ex_decline(expenditureID){
    patchData(`api/expenditure/${expenditureID}/state/3`).then( (response) => {
      loadTeams();
    });
  }
  
  ex_finish(expenditureID){
    patchData(`api/expenditure/${expenditureID}/state/4`).then( (response) => {
      loadTeams();
    });
  }

  ex_delete(expenditureID){
    deleteData(`api/user/${this.talent_id}/expenditure/${expenditureID}`).then( (response) => {
      loadTeams();
    });
  }

  toPascalCase(str){
    str = str.replace('-', ' ');
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' ');
  }

  get talent_id(){
    return this.getAttribute('talent-id');
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

  get state(){
    const state = this.getAttribute('state');
    const stateStrings = ['approved', 'in-progress', 'declined', 'done']
    return stateStrings[parseInt(state)-1];
  }

  get expenditureID(){
    return this.getAttribute('expenditure-id');
  }

  get goalDescription(){
    return this.getAttribute('goal-description');
  }

  get description(){
    return this.getAttribute('description');
  }

  get buttonDisplays(){
    return this.getAttribute('buttons');
  }

  set buttonDisplays(opts){
    if (opts) this.setAttribute('buttons', opts);
    else this.removeAttribute('buttons');
  }
}
customElements.define('budget-expenditure-small', BudgetExpenditureSmall);
