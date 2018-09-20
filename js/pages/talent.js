import { postData, deleteData, getData } from '../AjaxMixin.js';
import { getNavUsers } from '../navbar.js';

loadTeams();

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
    talentTeam: {
      id: DOMElems.teamID.value,
    }
  }
  const JSONdata = JSON.stringify(submitData);
  postData('api/talent', JSONdata).then( () => {
    loadTeams();
    getNavUsers();
  });
};

const deleteTalentButton = document.getElementById('submit-delete-talent');
deleteTalentButton.addEventListener('click', deleteTalent);

function deleteTalent() {
  const id = document.getElementById('input-id').value;

  deleteData(`api/talent/${id}`).then( () => {
    loadTeams();
    getNavUsers();
  });
}

function loadTeams(){
  const api = `api/talentteam/all`;
  const api_alltalents = `api/talent/all`;
  const talentTeamNav = document.querySelector('.talentteam-container .nav.nav-tabs');
  const talentTeamElement = document.querySelector('.tab-content');
  let teamsNavHTML= `<li class="active"><a data-toggle="tab" href="#all">All Talents</a></li>`; 
  let teamsElHTML =`<div id="all" class="tab-pane fade in active"> <h2>All Talents</h2><ul>`
  getData(api_alltalents).then( (response_alltalents) => {
    response_alltalents.forEach(talent =>{
      if (talent.talentTeam == null) {
        talent.talentTeam = {
          id: 'null',
          teamname: 'null'
        }
      };
      teamsElHTML += `
        <li class="list-group-item">
          <budget-talent
            id=${talent.id}
            name="${talent.name}"
            budget="${talent.budget}"
            expenditures='${JSON.stringify(talent.expenditures)}' 
            talent-team-name="${talent.talentTeam.teamname}"
            talent-team-id=${talent.talentTeam.id}
          ></budget-talent>
        </li>
      `;
    });
    teamsElHTML += `</ul></div>`;
    talentTeamElement.innerHTML = teamsElHTML;

    getData(api).then( (response) => {
      response.forEach(team => {
        teamsNavHTML+=`<li><a data-toggle="tab" href="#${team.teamname.replace(/\s+/g, '-')}">${team.teamname}</a></li>` ;
        const api_perteam = `api/talentteam/${team.id}/teammembers`; 
        getData(api_perteam).then( (response_team) =>{
          teamsElHTML +=`
            <div id="${team.teamname.replace(/\s+/g, '-')}" class="tab-pane fade">
            <h2>${team.teamname} </h2><ul>
          `;
          response_team.forEach(member => {
            if (member.talentTeam == null) {
              member.talentTeam = {
                id: 'null',
                teamname: 'null'
              };
            }
            teamsElHTML += `
              <li class="list-group-item">
                <budget-talent
                  id=${member.id}
                  name="${member.name}"
                  budget="${member.budget}"
                  expenditures='${JSON.stringify(member.expenditures)}' 
                  talent-team-name="${member.talentTeam.teamname}"
                  talent-team-id=${member.talentTeam.id}
                ></budget-talent>
              </li>
            `;
          });
          teamsElHTML += `</ul></div>`;
          talentTeamElement.innerHTML = teamsElHTML;
        }); 
      });
      talentTeamNav.innerHTML = teamsNavHTML;
      talentTeamElement.innerHTML = teamsElHTML;
    });
  });
}
