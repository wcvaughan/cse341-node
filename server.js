const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect.js');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running at port ${port}`);
        });
    }
});

