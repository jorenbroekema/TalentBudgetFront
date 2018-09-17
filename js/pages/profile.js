import { postData, getData } from '../AjaxMixin.js';

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
  });  
}

function loadTalent(id){
  const api = `api/talent/${id}`;
  const profileElement = document.querySelector('.profile-info');
  getData(api).then( (response) => {
    console.log(response);
    profileElement.innerHTML = `
      <img 
        src="../../resources/images/portraits/${response.name}.jpg" 
        onerror="this.src='../../resources/images/portraits/default.jpg'" 
        alt="${response.name}" 
        width="100" height="100" 
        class="portrait"
      >
      <h2>${response.name}</h2>
    `;
  });

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

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  let result = ''
  vars.forEach(someVar => {
    let pair = someVar.split("=");
    if (pair[0] == variable) result = pair[1];
  });
  return result ? result : false;
}