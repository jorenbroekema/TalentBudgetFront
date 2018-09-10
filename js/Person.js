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