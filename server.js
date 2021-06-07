const express = require('express');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/figuringlifeoutdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const Plant = require('./api/models/figuringLifeOutModel');

db.on('error', err => {
    console.log('err', err)
});

db.on('connected', () => {
    console.log('mongoose is conneceted...')
});

db.on('disconnected', () => {
    console.log('mongoose is disconnected...')
});

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/figuringLifeOutRoutes');
routes(app);

app.listen(port);
// export server for testing
module.exports = app;

console.log("Figuring Life Out API server started on: " + port);

// // POST call to Plant.id API to get plant information
// const https = require('https');
// var fs = require('fs');

// const files = ['photo1.jpg', 'photo2.jpg'];

// const base64files = files.map(file => fs.readFileSync(file, 'base64'));

// const data = JSON.stringify({
//     api_key: "",
//     images: base64files,
//     modifiers: ["crops_fast", "similar_images"],
//     plant_language: "en",
//     plant_details: [
//         "common names",
//         "url",
//         "name_authority",
//         "wiki_description",
//         "taxonomy",
//         "synonyms"
//     ]
// })

// const options = {
//     hostname: 'api.plant.id',
//     port: 443,
//     path: '/v2/identify',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': data.length
//     }
// }

// const req = https.request(options, res=> {
//     res.on('data', d => {
//         process.stdout.write(d)
//     });
// });

// req.on('error', error => {
//     console.error('Error: ', error);
// })

// req.write(data)

// req.end()