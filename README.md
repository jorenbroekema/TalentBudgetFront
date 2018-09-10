# TalentBudgetFront
Front-end for TalentBudgetApp

Guys, there's a local config here similar to the backend application.properties.
Make sure you have a `localconfig.json` file in your root directory
```
var localConfig = {
	'port' : 8082
}
```
Change the port to your server port, same one as in the last line of your application.properties in your backend

Furthermore, to be able to run this locally, we need a simple http server to serve the front-end, else we will get errors.

`npm install http-server -g` to globally install https://www.npmjs.com/package/http-server

If you don't have npm, download and install node from here https://nodejs.org/en/. 

To run it, just do `npm start` and it will do the http-server start. Alternatively, `http-server` works and you can provide an alternative port to the default given one. 
