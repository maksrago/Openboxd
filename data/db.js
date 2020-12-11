var MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

var url = "mongodb://localhost:27017/openboxd";

var dbname='openboxd';

MongoClient.connect(url,{ useNewUrlParser: true })
    .then(client => module.exports.getdb = client.db(dbname)) 
    .catch(error => console.log("Could not connect to database."))
