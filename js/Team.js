class Team {

  constructor(api, teamname, nationality, slogan){
    this.api = api;
    this.teamname = teamname;
    this.nationality = nationality;
    this.slogan = slogan;
    console.log(this);
  }

  sendTeam(){
    var teamObj = {
      api: this.api,
      teamname: this.teamname,
      nationality: this.nationality,
      slogan: this.slogan
    };
    var teamJSON = JSON.stringify(teamObj);
    console.log(teamJSON);
    postData(teamObj.api, teamJSON);
  }

}