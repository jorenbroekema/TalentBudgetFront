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
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);
        var newInnerHTML = '';
        for (var i = 0; i < response.length; i++) {
          console.log(response[i].expenditures);
          newInnerHTML += `<li class="list-group-item">
                            <budget-talent
                              id=${response[i].id}
                              name="${response[i].name}"
                              budget="${response[i].budget}"
                              expenditures='${JSON.stringify(response[i].expenditures)}' 
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
  id: document.getElementById('input-id'),
  budget: document.getElementById('input-budget'),
};

function submitNewTalent(){
  const submitData = {
    name: DOMElems.name.value,
    id: DOMElems.id.value,
    budget: DOMElems.budget.value,
  }
  const JSONdata = JSON.stringify(submitData);
  postData('api/talentmanager/talent', JSONdata).then( () => {
    Talent.showTalents('api/talentmanager/talent/all');
    getNavUsers();
  });
};