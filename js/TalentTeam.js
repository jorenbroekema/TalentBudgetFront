import { postData } from './AjaxMixin.js';

export class TalentTeam {

  constructor(api, team_name){
    this.api = api;
    this.teamname = team_name;
  }

  static sendTalentTeam(api, team_name){
    var teamObj = {
      api: api,
      teamname: team_name
    };
    alert(`Woooo, let's go team ${team_name}!`);
    const teamJSON = JSON.stringify(teamObj);
    postData(teamObj.api, teamJSON);
  }
}
