import { getData } from './AjaxMixin.js';
import { Person } from './Person.js';
import { Team } from './Team.js';

// POST
document.getElementById("sendPersonButton").addEventListener("click", sendPerson, false);
document.getElementById("sendTeamButton").addEventListener("click", sendTeam);

// GET
document.getElementById("showPersonsButton").addEventListener("click", getPersons);
document.getElementById("showTeamsButton").addEventListener("click", getTeams);

function sendPerson(){
  Person.sendPerson(
    document.querySelector('#apiPersonUrl').value,
    document.querySelector('#persons_table #age').value,
    document.querySelector('#persons_table #firstname').value,
    document.querySelector('#persons_table #height').value,
    document.querySelector('#persons_table #weight').value,
    document.querySelector('#persons_table #teamid').value
  );
}

function sendTeam(){
  Team.sendTeam(
    document.querySelector('#apiTeamUrl').value,
    document.querySelector('#teams_table #teamname').value,
    document.querySelector('#teams_table #nationality').value,
    document.querySelector('#teams_table #slogan').value
  );
}

function getPersons(){
  getData('api/person');
}

function getTeams(){
  getData('api/team');
}

