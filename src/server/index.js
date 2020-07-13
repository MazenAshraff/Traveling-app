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