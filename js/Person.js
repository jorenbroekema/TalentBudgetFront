class Person {

  constructor(api, age, firstname, height, weight, teamId){
    this.api = api;
    this.age = age;
    this.firstname = firstname;
    this.height = height; 
    this.weight = weight;
    this.teamId = teamId;
    console.log(this);
  }

  sendPerson(){
    const personObj = {
      api: this.api,
      age: this.age,
      firstname: this.firstname,
      height: this.height,
      weight: this.weight,
      teamId: this.teamId
    };
    const personJSON = JSON.stringify(personObj);
    postData(personObj.api, personJSON);
  }
}