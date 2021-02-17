var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);

var jsonData = require('./UsersData.json');

/* fs.readFile('./UsersData.json', 'utf8', function (err, data) {
    if (err) throw err;
    jsonData = data;
    console.log(jsonData);
}) */

//Declare MongoDB Schemas
const User = mongoose.model('User',
    {
        name: {type: String},
        username: {type: String},
        email: {type: String},
        address:{  
            street: {type: String, },
            suite:{type: String },
            city:{type: String },
            zipcode:{type: String },
            geo:{
                longitude:{type: String },
                latitude:{type: String }
            }
        },
        phone: {type: String},
        website: {type: String },
        company:{
            name: {type: String },
            catchphrase:{type: String },
            bs:{type: String },
        }
    })




var dbUrl = 'mongodb+srv://jp121:jp121@cluster0.ciqkl.mongodb.net/<dbname>?retryWrites=true&w=majority'


app.post('/users', (req, res) => {
    User.insertMany(jsonData,(err) =>{ 
    console.log("Success");
  })
})

mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});