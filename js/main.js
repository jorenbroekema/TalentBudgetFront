import { getData, postData } from './AjaxMixin.js';
import './Person.js';
import './Team.js';
console.log("Hello");
// POST
let el = document.getElementById("sendPersonButton");
console.log(el);
el.addEventListener("click", sendPerson, false);

document.getElementById("sendTeamButton").addEventListener("click", sendTeam);

// GET
document.getElementById("showPersonsButton").addEventListener("click", getPersons);
document.getElementById("showTeamsButton").addEventListener("click", getTeams);

function sendPerson(){
  console.log("clicked on send person");
  const personForm = document.getElementById('persons_table');
  Person.sendPerson(
    personForm.getElementById('apiPersonUrl'),
    personForm.getElementById('age'),
    personForm.getElementById('firstname'),
    personForm.getElementById('height'),
    personForm.getElementById('weight'),
    personForm.getElementById('teamid')
  );
}

function sendTeam(){
  const teamForm = document.getElementById('teams_table');
  Team.sendTeam(
    teamForm.getElementById('apiTeamUrl'),
    teamForm.getElementById('teamname'),
    teamnorm.getElementById('nationality'),
    teamForm.getElementById('slogan')
  );
}

function getPersons(){
  getData('api/person');
}

function getTeams(){
  getData('api/team');
}
