import { postData, getData } from '../AjaxMixin.js';
import { getQueryVariable } from '../../js/getURLVar.js';

const newExpenditureButton = document.getElementById('submit-new-expenditure');
newExpenditureButton.addEventListener('click', submitNewExpenditure);
const userID = getQueryVariable('id');
loadTalent(userID);
loadExpenditures(userID);


const DOMElems = {
  name: document.getElementById('input-name'),
  description: document.getElementById('input-description'),
  goal: document.getElementById('input-goal'),
  date: document.getElementById('input-date'),
  cost: document.getElementById('input-cost'),
};

function submitNewExpenditure(){
  const submitData = {
    name: DOMElems.name.value,
    description: DOMElems.description.value,
    goal_description: DOMElems.goal.value,
    date: DOMElems.date.value,
    cost: DOMElems.cost.value
  }
  const JSONdata = JSON.stringify(submitData);

  postData(`api/user/${userID}/expenditure`, JSONdata).then( () => {
    loadExpenditures(userID);
    loadTalent(userID);
  });  
}

function loadTalent(id){
  const api = `api/talent/${id}`;
  const profileElement = document.querySelector('.profile-info');
  getData(api).then( (response) => {
    profileElement.innerHTML = `
      <img 
        src="../../resources/images/portraits/${response.name}.jpg" 
        onerror="this.src='../../resources/images/portraits/default.jpg'" 
        alt="${response.name}" 
        width="100" height="100" 
        class="portrait"
      >
      <h2>${response.name}</h2>
      <h5 class="talent-budget"></h5>
    `;
    const newBudget = calculateBudget(response);
    adjustBudget(newBudget);
  });

}

function calculateBudget(response){
  const expenditures = response.expenditures;
  let newBudget = parseInt(response.budget);
  for (let i = 0; i < expenditures.length; i++) {
    newBudget = newBudget - expenditures[i].cost;
  }
  return newBudget;
}

function adjustBudget(budget){
  document.querySelector('.talent-budget').innerText=`€${budget}`;
}

function loadExpenditures(id){
  const api = `api/talent/${id}/expenditures`;
  getData(api).then( (response) => {
    const list = document.querySelector('.expenditure-container .list-group');
    list.innerHTML = '';

    response.forEach(expenditure => {
      // TODO: Make icon configurable (needs backend first)
      list.innerHTML += `
        <li class="list-group-item">
          <budget-expenditure
            expenditure-id="${expenditure.id}"
            title="${expenditure.name}"
            icon="fa-graduation-cap"
            budget="€${expenditure.cost}"
            state="${expenditure.state}"
          ></budget-expenditure>
        </li>
        `;
      });
    });
  }
