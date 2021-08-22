var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
var qs = require('qs');
var fs = require('fs'); //loading file system
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(myParser.json());
app.use(myParser.urlencoded({ extended: true }));
var session = require('express-session');



//here I am reading in the user data into an object called user_data
var user_data_file = './user_data.json';
var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8')); //gonna read it all as a string in this var.

app.use(session({
    secret: "ITM352 rocks!", // gives it a secret to encript it to make sure it is ID we give it
    cookie: {maxAge: 1000 * 60 * 60 * 24} //makes session expire in 1 day * 24 hr/1day * 60 * min/ 1hr taken from video tutorial https://www.youtube.com/watch?v=J1qXK66k1y4
}));



//Session and Profile (shopping cart) copied from the Assignment 3 examples code, intitializing an object to store the cart in the session. 
app.all('*', function (request, response, next) {
    if(typeof request.session.profile == 'undefined') { request.session.profile = {}; } 
    next();
});


//adding forms for each of the page 
app.get('/add_ties', function (req, res, next){
    req.session.ties = req.query; //adding the form to the session to use it in the profile
    res.redirect("./courses.html");
});

app.get('/add_courses', function (req, res, next){
    req.session.courses = req.query; //adding the form to the session to use it in the profile
    console.log(req.session.courses);
    res.redirect("./exams.html");
});

app.get('/add_exams', function (req, res, next){
    req.session.exams = req.query; //adding the form to the session to use it in the profile
    console.log(req.session.exams);
    res.redirect("./research.html");
});

app.get('/add_research', function (req, res, next){
    req.session.reserach = req.query; //adding the form to the session to use it in the profile
    console.log(req.session.reserach);
    res.redirect("./profile");
});


// profile data added from the previous pages data and saved in session
app.get('/profile',function (req, res, next){
    var ties_data = req.session.ties; //getting data out of session
    var exams_data = req.session.exams;
    var reserach_data = req.session.reserach;
    var courses_data = req.session.courses;
    var all_data = Object.assign(ties_data,exams_data,courses_data,reserach_data);
    console.log(all_data);
    res.redirect(`./invoice.html?${qs.stringify(all_data)}`);
});



//check if someone is logged in with cookies
app.get('/use_cookie', function (req, res, next){
    if (typeof req.cookies["username"] != 'undefined'){
        res.cookie('username');
        let userame = req.cookies["username"];
    next();
    } else {
        res.send("I don't know you!")
    }
});

//log-out by clearing cookie
app.get('/logout', function (req, res, next){
    res.clearCookie('username');
});

app.post('/email_profile', function (req, res, next){
    console.log(req.body);
    res.send({'message': 'OK'});
});


// regex to test the validity of entry for the registration
let name_re = /(^[a-z A-Z-]*$){1,20}/; //aplhabet characters 1 - 10
let username_re = /([a-z0-9]){4,10}/; //aplhanumeric characters 4-10
let password_re = /.{6,}/; //any string, minimum 6 char long
let email_re = /([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.([a-zA-Z0-9]){2,3}/; // simple version testing email, modified from https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression

//registration processing
app.post('/process_register', function (req, res) {
    username = req.body.uname;
    // adding new user to the object
    if (typeof user_data[username] == 'undefined') {
        if (username_re.test(req.body["uname"]) == false) {//testing username agains regex
            res.send(`Entered value for USERNAME should have 4-10 alphanumeric characters, please hit back button and revise entry.`);
        } //testing the username for the regex
        user_data[username] = {}; // sets up space for the newuser (empty object)
        if (name_re.test(req.body["name"]) == false) {
            res.send(`Entered value for Full Name should have only alphabet characters, please hit back button and revise entry.`);
        } //testing the name for the regex
        user_data[username].name = req.body["name"] //saving the entered name in the object
        if (password_re.test(req.body["psw"]) == false) {
            res.send(`Entered value for PASSWORD should have minimum 6 characters, please hit back button and revise entry.`); //testing the pass with the regex
        }
        user_data[username].password = req.body["psw"]; //saving the entered name in the object
        if (email_re.test(req.body["email"]) == false) {
            res.send(`You have entered an invalid EMAIL adress, please hit back button and revise`); //testing the pass with the regex
        }
        user_data[username].email = req.body["email"]; //saving the email of new user in the object
        res.cookie('username', username);//adding a cookie to the registration
        req.query["uname"] = user_data[username].name; //adds the name to the query string
        //convert the updated userdata object to json and write it to the file
        fs.writeFileSync('./user_data.json', JSON.stringify(user_data));
        res.redirect('./profile');
    } else {
        res.send(`${username} is taken`); //sends the message that the username is taken.
    }
});

 

//this part is processing the login page
app.post('/process_login', function (request, response, next) {
    console.log(request.body); //getting the body stuf
    let username_entered = request.body.uname;  //making an object from the input form for username
    let password_entered = request.body.psw; //making an object from the input form for password
    
    if (typeof user_data[username_entered] != 'undefined') { //if the entered username undefined, that means I have it in my data already, so they can proceede to invoice
        if (user_data[username_entered]['password'] == password_entered) {
            response.cookie('username', username_entered);
            request.query["uname"] = user_data[username_entered].name; //adding name to the URL of invoice, to personalize it
            response.redirect('profile'); 
        }
        else {
            response.send(`${username_entered}, your password is not correct, please re-enter.`);// if the username is not recognized, it sends the message to go back to the registration form
        }
    }
        if (typeof user_data[username_entered] == 'undefined') {// checking if username is there
        response.send(`<h2>${username_entered}</h2> username is not recognized. <br><br> Please go to the <a href="./registration.html"> Registration form </a> to create a profile`);
    }
});


app.use(express.static('./public')); //get request goes here to look for file

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

