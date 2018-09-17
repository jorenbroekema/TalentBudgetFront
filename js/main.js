import { getData } from './AjaxMixin.js';
import { Talent } from './components/Talent.js';
import { TalentTeam } from './components/TalentTeam.js';

// POST Event Listeners:
document.getElementById("sendTalentButton").addEventListener("click", sendTalent, false);
document.getElementById("sendTalentTeamButton").addEventListener("click", sendTalentTeam);

// GET Event Listeners:
document.getElementById("showTalentsButton").addEventListener("click", getTalents);
document.getElementById("showTalentTeamsButton").addEventListener("click", getTalentTeams);

// POST functions:
function sendTalent(){
  Talent.sendTalent(
    document.querySelector('#apiTalentUrl').value,
    document.querySelector('#talents_table #budget').value,
    document.querySelector('#talents_table #name').value,
    document.querySelector('#talents_table #talent_team_id').value
  );
}
function sendTalentTeam(){
  TalentTeam.sendTalentTeam(
    document.querySelector('#apiTeamUrl').value,
    document.querySelector('#teams_table #team_name').value
  );
}

// GET functions:
function getTalents(){
  getData('api/talent/all');
}
function getTalentTeams(){
  getData('api/talentteam/all');
}

function showTalentComponents(){
  Talent.showTalents('api/talent/all');
}