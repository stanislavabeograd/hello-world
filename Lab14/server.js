var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true })); //need to add this
var qs = require('qs');
var fs = require('fs'); //loading file system
const e = require('express');

//var user_data = require('./user_data.json'); loading the object from the file

//console.log(user_data['stasa']['password']);

var user_data_file = './user_data.json';
if (fs.existsSync(user_data_file)){
    var file_stats = fs.statSync(user_data_file);
 //   console.log(file_stats["size"]);
    var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8')); //gonna read it all as a string in this var.
} else {
  //  console.log(`${user_data_file} does not exist!`);
}


app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //passing it on to the next who can respond
}); // this is diagnostic, to see what's the metod, query etc.

app.get('/test', function (request, response, next) {
    response.send('I got a request for /test');
}); // if I get get request, then execute this function


/*
//check if the server has access to your form
app.post('/process_login', function (request, response, next) { //ovo odgovara na POST u method u html form
    post_data = request.body; //gets the data form the post in the variable    
    response.send(post_data);
});
*/


app.post('/process_login', function (request, response, next) { //ovo odgovara na POST u method u html form
    console.log(request.body);
    let username_entered = request.body.username;
    let password_entered = request.body.password;
    if(typeof user_data[username_entered] != 'undefined') { //ako nije undefined onda ga imam u data
      if(user_data[username_entered]['password'] == password_entered){
          response.send(`${username_entered} is logged in.`)
      }
      else {
        response.send(`${username_entered}'s password is wrong.`)

      }
    }
    if(typeof user_data[username_entered] == 'undefined'){
        response.send(`${username_entered} is not recognized.`)

    } 
}); //this responds to post request (u ovom slucaju process_login) i pise u body 


app.use(express.static('./public')); //get request goes here to look for file

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}