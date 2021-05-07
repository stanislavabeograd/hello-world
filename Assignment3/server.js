var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true })); //need to add this
var qs = require('qs');
var fs = require('fs'); //loading file system
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');


let name_re = /(^[a-z A-Z-]*$){1,20}/; //aplhabet characters 1 - 10
let username_re = /([a-z0-9]){4,10}/; //aplhanumeric characters 4-10
let password_re = /.{6,}/; //any string, minimum 6 char long
let email_re = /([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.([a-zA-Z0-9]){2,3}/; // simple version testing email, modified from https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression



//here I am reading in the user data into an object called user_data
var user_data_file = './user_data.json';
var file_stats = fs.statSync(user_data_file);
var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8')); //gonna read it all as a string in this var.


//sessions

app.use(session({secret: "pazidatinekazem"}));// gives it a secret to encript it to make sure it is ID we give it

app.get('/set_session', function (req, res, next){
    res.send(`welcome, your session ID is ${req.session.id}`); //automatski generise ID za sesiju i vezuje data za taj ID
    next();
})

app.get('/use_session', function (req, res, next){
    res.send(`welcome, your session ID is ${req.session.id}`); //automatski generise ID za sesiju i vezuje data za taj ID
    next();
})

//cookies

app.get('/set_cookie', function (req, res, next){
    res.cookie('my_name', my_name, {expire: 5000 + now.getTime()});
    res.send(`Cookie for ${my_name} sent`)//allows 2 responses, but they are usually sent silently
    next();
});

//check if someone is logged in if you do this with username (Assignmnet 2)
app.get('/use_cookie', function (req, res, next){
    if (typeof req.cookies["username"] != 'undefined'){
        res.cookie('username')
        let userame = req.cookies["username"];
    res.send(`${user_data[username].name} is logged in!`)//allows 2 responses, but they are usually sent silently
    next();
    } else {
        res.send("I don't know you!")
    }
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //passing it on to the next who can respond
}); // this is diagnostic, to see what's the metod, query etc
//this code is processing the registration form and input into the file with all the user data


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

        req.query["uname"] = user_data[username].name; //adds the name to the query string
        //convert the updated userdata object to json and write it to the file
        fs.writeFileSync('./user_data.json', JSON.stringify(user_data));
        res.redirect('invoice.html?' + qs.stringify(req.query));
    } else {
        res.send(`${username} is taken`); //sends the message that the username is taken.
    }
});

 

//this part is processing the login page
app.post('/process_login', function (request, response, next) {
    console.log(request.body); //getting the body stuff
    let username_entered = request.body.uname;  //making an object from the input form for username
    let password_entered = request.body.psw; //making an object from the input form for password
    
    if (typeof user_data[username_entered] != 'undefined') { //if the entered username undefined, that means I have it in my data already, so they can proceede to invoice
        if (user_data[username_entered]['password'] == password_entered) {
            request.query["uname"] = user_data[username_entered].name; //adding name to the URL of invoice, to personalize it
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


app.use(express.static('./public')); //get request goes here to look for file

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

//setting cookies

app.get('/set_cookie', function (req, res, next){
    res.cookie('username', username);
    next();
});