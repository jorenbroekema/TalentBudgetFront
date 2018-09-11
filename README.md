# TalentBudgetFront
Front-end for TalentBudgetApp

Guys, there's a local config here similar to the backend application.properties.
Make sure you have a `localconfig.js` file in your root directory
```
export let httpPort = 8082;
```
Change the port to your server port, same one as in the last line of your application.properties in your backend

Furthermore, to be able to run this locally, we need to install NPM/Bower dependencies and polymer

If you don't have npm, download and install node from here https://nodejs.org/en/. 

`npm install` in your root folder (frontend one) of the project to install dependencies.

`npm install -g bower` to install bower globally
`npm install -g polymer-cli to install polymer globally

To run it, just do `npm start` and it will do the http-server start. Alternatively, `http-server` works and you can provide an alternative port to the default given one. 
