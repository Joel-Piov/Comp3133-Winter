var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);

var jsonData = './UsersData.json';
//Declare MongoDB Schemas


userSchema = mongoose.Schema(
    {
        name: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
        username: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
        email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
        address:{  
            street: {type: String, required: [true, "can't be blank"]},
            suite:{type: String, required: [true, "can't be blank"]},
            city:{type: String, required: [true, "can't be blank"]},
            zipcode:{type: String,match: [/^\d{5}(?:[-\s]\d{4})?$/, 'is invalid'], required: [true, "can't be blank"]},
            geo:{
                longitude:{type: String, required: [true, "can't be blank"]},
                latitude:{type: String, required: [true, "can't be blank"]}
            }
        },
        phone: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
        website: {type: String, required: [true, "can't be blank"]},
        company:{
            name: {type: String, required: [true, "can't be blank"]},
            catchphrase:{type: String, required: [true, "can't be blank"]},
            bs:{type: String, required: [true, "can't be blank"]},
        }
    })




var dbUrl = 'mongodb+srv://jp121:jp121@cluster0.ciqkl.mongodb.net/<dbname>?retryWrites=true&w=majority'


app.post('/users', (req, res) => {
  var Users = mongoose.model('User', userSchema, 'UsersData');
  Users.insertMany(jsonData,(err) =>{ 
  })
})

mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

var db = mongoose.connection;

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});