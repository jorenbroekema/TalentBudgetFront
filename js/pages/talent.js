import { httpPort } from '../../localconfig.js';
import { postData, deleteData, getData } from '../AjaxMixin.js';
import { getNavUsers } from '../navbar.js';

showTalents('api/talent/all');
/*showTalentteams('api/talentteam/all');*/
loadTeams();

function showTalents(api){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      let newInnerHTML = '';
      for (var i = 0; i < response.length; i++) {
        if (response[i].talentTeam == null) {
          response[i].talentTeam = {
            id: 'null',
            teamname: 'null'
          };
        }
        newInnerHTML += `
          <li class="list-group-item">
            <budget-talent
              id=${response[i].id}
              name="${response[i].name}"
              budget="${response[i].budget}"
              expenditures='${JSON.stringify(response[i].expenditures)}' 
              talent-team-name="${response[i].talentTeam.teamname}"
              talent-team-id=${response[i].talentTeam.id}
            ></budget-talent>
          </li>
        `;
      }
      document.getElementById("ajaxResponseTalents").innerHTML = newInnerHTML;
    }
  };
  xhttp.open("GET", "http://localhost:" + httpPort + "/" + api);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
/*
function showTalentteams(api){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      let newInnerHTML = '';
      for (var i = 0; i < response.length; i++) {
        newInnerHTML += `
          <li class="list-group-item1">
            <budget-talentteam
              id=${response[i].id}
              teamname="${response[i].teamname}"
            ></budget-talentteam>
          </li>
        `;
      }
      document.getElementById("ajaxResponseTalentteams").innerHTML = newInnerHTML;
    }
  };
  xhttp.open("GET", "http://localhost:" + httpPort + "/" + api);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

*/

// Add new talent:
const newTalentButton = document.getElementById('submit-new-talent');
newTalentButton.addEventListener('click', submitNewTalent);

const DOMElems = {
  name: document.getElementById('input-name'),
  budget: document.getElementById('input-budget'),
  teamID: document.getElementById('input-talent-team-id'),
};

function submitNewTalent() {
  const submitData = {
    name: DOMElems.name.value,
    budget: DOMElems.budget.value,
    teamID: DOMElems.teamID.value,
  }
  const JSONdata = JSON.stringify(submitData);
  postData('api/talent', JSONdata).then( () => {
    showTalents('api/talent/all'); 
    getNavUsers();
  });
};

// Delete talent:
const deleteTalentButton = document.getElementById('submit-delete-talent');
deleteTalentButton.addEventListener('click', deleteTalent);

function deleteTalent() {
  const id = document.getElementById('input-id').value;
  deleteData(id, 'api/talent').then( () => {
    showTalents('api/talent/all');
    getNavUsers();
  });
}

function loadTeams(){
  const api = `api/talentteam/all`;
  const talentTeamNav = document.querySelector('.talentteam-container .nav.nav-tabs');
  const talentTeamElement = document.querySelector('.tab-content');
  getData(api).then( (response) => {
    console.log(response);
    let teamsNavHTML= `<li class="active"><a data-toggle="tab" href="#all">All Talents</a></li>`; 
    let teamsElHTML =`<div id="all" class="tab-pane fade in active"> <h3>HOME</h3> </div>`;
    response.forEach(team => {
      teamsNavHTML+=`<li><a data-toggle="tab" href="#${team.teamname}">${team.teamname}</a></li>` ;
      teamsElHTML +=`<div id="${team.teamname}" class="tab-pane fade"> 
      <h3>${team.teamname} </h3></div>`;
      console.log(teamsElHTML);

    });

    talentTeamNav.innerHTML = teamsNavHTML;
    talentTeamElement.innerHTML = teamsElHTML;
  });
}
