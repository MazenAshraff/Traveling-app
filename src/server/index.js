let projectData = {};
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


const isEmpty = (elem) => {
    if (elem.total == 0)
        return true;
    else
        return false;

}
app.post('/location', async(req, res) => {
    const loc = req.body['location'];
    const day = req.body['date'];
    try {
        const geoResponse = await fetch(`${geonamesURL}${loc}&username=${user}`);
        const geoJsonData = await geoResponse.json();
        let pixaResponse = await fetch(`${pixaURL}${loc}&image_type=photo&orientation=wider&category=travel&editors_choice=true&order=popular`);
        let pixaJsonData = await pixaResponse.json();
        if (isEmpty(pixaJsonData)) {
            pixaResponse = await fetch(`${pixaURL}${loc}&image_type=photo&orientation=wider&category=travel&order=popular`);
            pixaJsonData = await pixaResponse.json();
            if (isEmpty(pixaJsonData)) {
                pixaResponse = await fetch(`${pixaURL}${loc}&image_type=photo&category=travel&order=popular`);
                pixaJsonData = await pixaResponse.json();
                if (isEmpty(pixaJsonData)) {
                    pixaResponse = await fetch(`${pixaURL}${loc}&image_type=photo&order=popular`);
                    pixaJsonData = await pixaResponse.json();
                    if (isEmpty(pixaJsonData)) {
                        pixaResponse = await fetch(`${pixaURL}${loc}&order=popular`);
                        pixaJsonData = await pixaResponse.json();
                        if (isEmpty(pixaJsonData)) {
                            pixaResponse = await fetch(`${pixaURL}${loc}`);
                            pixaJsonData = await pixaResponse.json();
                            if (isEmpty(pixaJsonData)) {
                                projectData.picture = 'Sorry, we couldn\'t find any images of the location.';
                            }
                        }
                    }
                }
            }
        }
        if (projectData.picture != 'Sorry, we couldn\'t find any images of the location.') {
            projectData.picture = pixaJsonData.hits[0].webformatURL;

        }
        projectData.long = geoJsonData.geonames[0].lng;
        projectData.lat = geoJsonData.geonames[0].lat;
        const weatherResp = await fetch(`${weatherURL}&lat=${projectData.lat}&lon=${projectData.long}&key=${weather_key}`);
        const weatherJsonData = await weatherResp.json();
        projectData.high_temp = weatherJsonData.data[day].high_temp;
        projectData.low_temp = weatherJsonData.data[day].low_temp;
        projectData.chanceOfRain = weatherJsonData.data[day].pop;
        res.send(projectData);
    } catch (e) {
        console.log('This is an  error', e);
    }
});

export { isEmpty }