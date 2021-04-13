var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true })); //need to add this
var qs = require('qs');


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

function process_login_form(post_data, response) {
    user_data = {'username':'stasa', 'password' : 'car'};
    if(post_data['username']){  //check the username if there is some data
             user = post_data ['username'];
             if(user_data['username'] == user){
                 response.send(`I recognize you ${user}!`);
                 return;
               }  else { 
                  response.send(`${user} is not a valid`); //comment out if you want to keep them on the page for the wrong input
                  //response.redirect('./log_in_page.html?username=' +user); //to return them back to the page, puts it in the query string, check the value in qty_texbox in the server. In login treba da im sacuvas podatke u kucicama, ako nije OK log in. 
                  return;
               }
             
         }
    
}
app.post('/process_login', function (request, response, next) { //ovo odgovara na POST u method u html form
    process_login_form(request.body, response);
    //response.send(JSON.stringify(post_data)); 
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