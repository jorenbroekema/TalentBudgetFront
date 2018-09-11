class BudgetExpenditure extends HTMLElement {
  constructor(){
    super();

    // FIXME: This needs to change to only fire when the actual expenditure gets clicked
    // instead of "anywhere in shadowroot"
    this.addEventListener('click', e =>{
      this.displayDialog();
    });
  }

  connectedCallback(){
    const shadow = this.attachShadow({ mode: 'open' });
    const expenditureContainer = document.createElement('div');
    const title = this.title;
    const icon = this.icon;
    const budget = this.budget;
    console.log(this.BSmodal);

    expenditureContainer.classList.add('expenditure');

    expenditureContainer.innerHTML = `
      <style>
        @import url("./node_modules/@fortawesome/fontawesome-free/css/all.min.css");
        @import url("./node_modules/bootstrap/dist/css/bootstrap.min.css");

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

        /* The Modal (background) */
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content/Box */
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 1px solid #888;
          width: 80%; /* Could be more or less, depending on screen size */
        }

        /* The Close Button */
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      </style>
      <div class="icon"><i class="fas ${icon} fa-2x"></i></div>
      <div class="title">${title}</div>
      <div class="budget">${budget}</div>

      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    `;
    // TODO: Add event listener for modal to this container
    expenditureContainer.addEventListener('click', (e) => {
      
    });
    shadow.appendChild(expenditureContainer);
  }
  
  displayDialog(){
    const dialog = this.shadowRoot.getElementById('myModal');
    const closeButton = this.shadowRoot.querySelector(".close");
    console.log(closeButton);
 
    dialog.style.display = "block";

    closeButton.onclick = function() {
      dialog.style.display = "none";
    }
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
