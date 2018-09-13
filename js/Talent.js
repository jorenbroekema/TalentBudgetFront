import { postData } from './AjaxMixin.js';

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
}
