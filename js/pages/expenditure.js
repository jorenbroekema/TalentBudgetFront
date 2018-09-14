import { postData } from '../AjaxMixin.js';

const newExpenditureButton = document.getElementById('submit-new-expenditure');
newExpenditureButton.addEventListener('click', submitNewExpenditure);

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
  
  // TODO: do not hard code 1 
  postData('api/user/1/add/expenditure', JSONdata);
  console.log(submitData);
  console.log(JSONdata);
}