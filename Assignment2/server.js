var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true })); //need to add this
var qs = require('qs');
var fs = require('fs'); //loading file system



//here I am reading in the user data into an object called user_data
var user_data_file = './user_data.json';
var file_stats = fs.statSync(user_data_file);
var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8')); //gonna read it all as a string in this var.

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //passing it on to the next who can respond
}); // this is diagnostic, to see what's the metod, query etc
//this code is processing the registration form and input into the file with all the user data

app.post('/process_register', function (req, res) {
    username = req.body.uname;
    // adding new user to the object
    if (typeof user_data[username] == 'undefined') {  
        user_data[username] = {}; // sets up space for the newuser (empty object)
        user_data[username].password = req.body["psw"]; // alternative reg_data[username].["password"] = 'newpass';
        user_data[username].email = req.body["email"];
        user_data[username].name = req.body["name"];
            //checking if the email is already taken
    if (typeof user_data[username].email != 'undefined') {
        res.send(`It seems that you are already registered with the following email: ${user_data[username].email}, try <a href ="./login.html">logging in.</a>`);
}
        //convert the updated userdata object to json and write it to the file
        fs.writeFileSync('./user_data.json', JSON.stringify(user_data));
        res.redirect('invoice.html?' + qs.stringify(req.query));
    } else {
        res.send(`${username} is taken`);
    }
});


//this part is processing the login page
app.post('/process_login', function (request, response, next) {
    console.log(request.body); //getting the body stuff
    let username_entered = request.body.uname;  //making an object from the input form for username
    let password_entered = request.body.psw; //making an object from the input form for password
    request.query["uname"] = request.body["uname"]; //adding username to the URL of invoice
    if (typeof user_data[username_entered] != 'undefined') { //if the entered username undefined, that means I have it in my data already, so they can proceede to invoice
        if (user_data[username_entered]['password'] == password_entered) {
            response.redirect('invoice.html?' + qs.stringify(request.query));
        }
        else {
            response.send(`${username_entered}, your password is not correct, please re-enter.`);// if the username is not recognized, it sends the message to go back to the registration form
        }
    }
    if (typeof user_data[username_entered] == 'undefined') {// checking if username is there
        response.send(`<h2>${username_entered}</h2> username is not recognized. <br><br> Please go to the <a href="./registration.html"> Registration form </a> to create a profile`);

    }
}); 



/*
// processing login
app.post('/process_login', function (request, response, next) { 
    console.log(request.query);
    //check login and password and match database
  
    //all good, send to invoice
    request.query["uname"] = request.body["uname"];
    response.redirect('invoice.html?' + qs.stringify(request.query));   
});

// processing registration
app.post('/', function (request, response, next) { 
    response.send(request.body);
});

 
    user_data = {'uname':'stasa', 'password' : 'car'};
    post_data = request.body; //gets the data form the post in the variable    
    if(post_data['uname']){  //check the username if there is some data
             user = post_data ['uname'];
             if(user_data['uname'] == user){
                 response.send(`I recognize you ${user}!`);
                 return;
               }  else { 
                  response.send(`${user} is not a valid`); //comment out if you want to keep them on the page for the wrong input
                  //response.redirect('./log_in_page.html?username=' +user); //to return them back to the page, puts it in the query string, check the value in qty_texbox in the server. In login treba da im sacuvas podatke u kucicama, ako nije OK log in. 
                  return;
               }
             
         }
    //response.send(JSON.stringify(post_data)); 
        }); //this responds to post request (u ovom slucaju process_login) i pise u body 

*/
app.use(express.static('./public')); //get request goes here to look for file

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
  }