import { httpPort } from '../localconfig.js';

export function postData(api, data){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 202) {
      const response = JSON.parse(this.responseText);
    }
  };
  xhttp.open("POST", "http://localhost:" + httpPort + "/" + api, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(data);
}

export async function getData(api){
  let xhttp = new XMLHttpRequest();

  let promise = new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const response = JSON.parse(this.responseText);
          resolve(response);
      }
    };
  }); 

  xhttp.open("GET", "http://localhost:" + httpPort + "/" + api);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();

  let response = await promise;
  return response;
}
