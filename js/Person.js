class Person {

  constructor(api, age, firstname, height, weight, teamId){
    this.api = api;
    this.age = age;
    this.firstname = firstname;
    this.height = height; 
    this.weight = weight;
    this.teamId = teamId;
  }

  static sendPerson(api, age, firstname, height, weight, teamId){
    const personObj = {
      api: api,
      age: age,
      firstname: firstname,
      height: height,
      weight: weight,
      teamId: teamId
    };
    console.log(personObj);
    if (personObj.age < 18) {
      document.getElementById("sendPersonButton").style.background='#FF69B4';
      document.getElementById("sendPersonButton").style.color='#FFFFFF';
      alert("You're too young!");
    } else {
      const personJSON = JSON.stringify(personObj);
      postData(personObj.api, personJSON);
    }
  }
}
