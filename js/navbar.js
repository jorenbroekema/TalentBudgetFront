import { getData } from './AjaxMixin.js';

const userSelector = document.getElementById('userSelector');
getNavUsers();

export function getNavUsers(){
// Wait till we have the data from the backend, then set the options etc.
  getData('api/talent/all').then(result => {
    setOptions(result);
    if(result.length > 0){
      changeUser();
    }
    userSelector.addEventListener('change', changeUser);
  });
}

function changeUser(){
  let selectedUser = userSelector.options[userSelector.selectedIndex].value;
}

function setOptions(response){
  const talents = response;

  let htmlOptions = '';
  talents.forEach(talent => {
    // If talent team does not exist, just set it to id:1
    if(talent.talentTeam === null){
      talent.talentTeam = {id: 1};
    }

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
