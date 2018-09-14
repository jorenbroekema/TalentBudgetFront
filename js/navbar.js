import { getData } from './AjaxMixin.js';

const userSelector = document.getElementById('userSelector');

// Wait till we have the data from the backend, then set the options etc.
getData('api/talentmanager/talent/all').then(result => {
  setOptions(result);
  changeUser();
  userSelector.addEventListener('change', changeUser);
});

function changeUser(){
  let selectedUser = userSelector.options[userSelector.selectedIndex].value;
}

function setOptions(response){
  const talents = response;

  let htmlOptions = '';
  talents.forEach(talent => {
    console.log(talent);
    htmlOptions+= `
      <option 
        value="${talent.name}"
        talent-id="${talent.id}"
        talent-budget="${talent.budget}"
        talent-team-id="${talent.talentTeam.id}"
      >
      ${talent.name}</option>
    `;
  });

  userSelector.innerHTML = htmlOptions;
}
