const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts'); 
const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/contacts', contactsRoutes);


mongodb.initDb((err, db) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running at port ${port}`);
        });
    }
});

