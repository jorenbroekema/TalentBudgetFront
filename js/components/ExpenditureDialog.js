import './Expenditure.js';

class BudgetExpenditureDialog extends BudgetExpenditure {

  connectedCallback(){
    const shadow = this.attachShadow({ mode: 'open' });
    const expenditureDialog = document.createElement('div');
    const title = this.title;
    const icon = this.icon;
    const budget = this.budget;

    expenditureDialog.classList.add('expenditure-dialog');

    expenditureDialog.innerHTML = `
      <style></style>
    `;
    shadow.appendChild(expenditureDialog);
  }
}
customElements.define('budget-expenditure-dialog', BudgetExpenditureDialog);
