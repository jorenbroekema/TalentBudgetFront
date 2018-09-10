class Team {

  constructor(api, teamname, nationality, slogan){
    this.api = api;
    this.teamname = teamname;
    this.nationality = nationality;
    this.slogan = slogan;
  }

  static sendTeam(api, teamname, nationality, slogan){
    var teamObj = {
      api: api,
      teamname: teamname,
      nationality: nationality,
      slogan: slogan
    };
    const teamJSON = JSON.stringify(teamObj);
    postData(teamObj.api, teamJSON);
  }
}
