import { httpPort } from '../../localconfig.js';

showTalentteams('api/talentteam/all');

function showTalentteams(api){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      let newInnerHTML = '';
      for (var i = 0; i < response.length; i++) {
        newInnerHTML += `
          <li class="list-group-item">
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