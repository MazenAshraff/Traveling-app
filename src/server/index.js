const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('dist'));

const port = 8000;
const listening = () => console.log(`Running on localhost:${port}`);
const user = process.env.user;
const weather_key = process.env.weather_key;
const pixabay_key = process.env.pixabay_key;
app.listen(port, listening);
const geonamesURL = 'http://api.geonames.org/searchJSON?name=';
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const pixaURL = `https://pixabay.com/api/?key=${pixabay_key}&q=`

app.post('/location', async(req, res) => {
    const loc = req.body['location'];
    const day = req.body['date'];
    try {
        const geoResponse = await fetch(`${geonamesURL}${loc}&username=${user}`);
        const geoJsonData = await geoResponse.json();
        const pixaResponse = await fetch(`${pixaURL}${loc}&image_type=photo&category=travel&order=popular`);
        const pixaJsonData = await pixaResponse.json();
        const picture = pixaJsonData.hits[0].webformatURL;
        const long = geoJsonData.geonames[0].lng;
        const lat = geoJsonData.geonames[0].lat;
        const weatherResp = await fetch(`${weatherURL}&lat=${lat}&lon=${long}&key=${weather_key}`);
        const weatherJsonData = await weatherResp.json();
        const high_temp = weatherJsonData.data[day].high_temp;
        const low_temp = weatherJsonData.data[day].low_temp;
        const chanceOfRain = weatherJsonData.data[day].pop;
        res.send({ high_temp: high_temp, low_temp: low_temp, chanceOfRain: chanceOfRain, picture: picture });
    } catch (e) {
        console.log('This is an  error', e);
    }
})