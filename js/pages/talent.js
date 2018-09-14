import { httpPort } from '../../localconfig.js';
import { postData } from '../AjaxMixin.js';

export class Talent {

  constructor(api, budget, name, talent_team_id){
    this.api = api;
    this.budget = budget;
    this.name = name;
    this.talent_team_id = talent_team_id;
  }

  static sendTalent(api, budget, name, talent_team_id){
    const talentObj = {
      api: api,
      budget: budget,
      name: name,
      team: {
        id: talent_team_id
      }
    };
    alert(`Welcome to the team, ${name}!`);
    const talentJSON = JSON.stringify(talentObj);
    postData(talentObj.api, talentJSON);
  }

  static showTalents(api) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        var newInnerHTML = '';
        for (var i = 0; i < response.length; i++) {
          newInnerHTML += `<li class="list-group-item">
                            <budget-talent
                              id=${response[i].id}
                              name="${response[i].name}"
                              budget="€${response[i].budget}"
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
