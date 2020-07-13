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

app.listen(port, listening);
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const user = process.env.user;
app.post('/location', async(req, res) => {
    const loc = req.body['location'];
    try {
        const apiResponse = await fetch(`http://api.geonames.org/searchJSON?q=${loc}&username=${user}`);
        const jsondata = await apiResponse.json()
        const long = jsondata.geonames[0].lng;
        const lat = jsondata.geonames[0].lat;
    } catch (e) {
        console.log('This is an  error', e);
    }
})