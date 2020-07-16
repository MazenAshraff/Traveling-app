# My travelling Journal
This is a webapp under development that can help you note your travelling and get data about
the place you are visiting 
## Installation
make sure you have a ```.env``` file with the following variables set
```bash
user=<YourUserName From Geonames>
weather_key=<Your APIkey from weatherbit API>
pixabay_key=<Your APIKey from pixabay>
```
you can register for a Username from geonames [here](http://www.geonames.org/export/web-services.html),
you can register for an API key from weatherbit [here](https://www.weatherbit.io/account/create),
you can register for an API key from pixabay [here](https://pixabay.com/api/docs/)

you must have npm installed on your device in order to set the project Up and running.
if you have it installed:
navigate to the main directory of the project and run the following commands
```bash
npm install
```
```bash
npm run build-prod
```
```bash
npm start
```
and then navigate to https://localhost:8000 on your browser and the app should be up and running

## features
The App allows you to:
* Set a Location for your Trip
* Set a start date and an end date
* See how many days you are spending in your trip
* See the maximum, minimum tempreature and chance of rain on the day of your arrival
* See a popular picture of your destination 