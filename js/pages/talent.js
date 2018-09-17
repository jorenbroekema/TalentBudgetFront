import { httpPort } from '../../localconfig.js';
import { postData } from '../AjaxMixin.js';
import { getNavUsers } from '../navbar.js';

export class Talent {

  constructor(api, budget, name, talent_team_id){
    this.api = api;
    this.budget = budget;
    this.name = name;
    this.talent_team_id = talent_team_id;
  }

  static showTalents(api) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        var newInnerHTML = '';
        for (var i = 0; i < response.length; i++) {
          if (response[i].talentTeam == null) {
            response[i].talentTeam = {
              id: 'null',
              teamname: 'null'
            };
          }
          newInnerHTML += `<li class="list-group-item">
                            <budget-talent
                              id=${response[i].id}
                              name="${response[i].name}"
                              budget="€${response[i].budget}"
                              talent-team-name="${response[i].talentTeam.teamname}"
                              talent-team-id=${response[i].talentTeam.id}
                            ></budget-talent>
                          </li>`;
        }
        document.getElementById("ajaxResponseTalents").innerHTML = newInnerHTML;
      }
    };
    xhttp.open("GET", "http://localhost:" + httpPort + "/" + api);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }
}

// Add new talent:
const newTalentButton = document.getElementById('submit-new-talent');
newTalentButton.addEventListener('click', submitNewTalent);

const DOMElems = {
  name: document.getElementById('input-name'),
  budget: document.getElementById('input-budget'),
  teamID: document.getElementById('input-talent-team-id'),
};

function submitNewTalent(){
  const submitData = {
    name: DOMElems.name.value,
    budget: DOMElems.budget.value,
    teamID: DOMElems.teamID.value,
  }
  const JSONdata = JSON.stringify(submitData);
  postData('api/talentmanager/talent', JSONdata).then( () => {
    Talent.showTalents('api/talentmanager/talent/all');
    getNavUsers();
  });
};