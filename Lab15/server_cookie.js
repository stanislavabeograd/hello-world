var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request -data- and creates an object of the data in it (POST data)
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true })); //need to add this to get the data from the post
var qs = require('qs');
var fs = require('fs'); //loading file system
const e = require('express');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');


//do the cookies ...cookies are always response
app.get('/set_cookie', function (req, res, next){
    let my_name = 'Stasa Gardasevic';
    now= new Date();
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


//sessions

app.use(session({secret: "ITM352 rocks!"}));// gives it a secret to encript it to make sure it is ID we give it

app.get('/set_session', function (req, res, next){
    res.send(`welcome, your session ID is ${req.session.id}`); //automatski generise ID za sesiju i vezuje data za taj ID
    next();
})

app.get('/use_session', function (req, res, next){
    res.send(`welcome, your session ID is ${req.session.id}`); //automatski generise ID za sesiju i vezuje data za taj ID
    next();
})

//var user_data = require('./user_data.json'); loading the object from the file

//console.log(user_data['stasa']['password']);

var user_data_file = './user_data.json';
if (fs.existsSync(user_data_file)) {
    var file_stats = fs.statSync(user_data_file);
    //   console.log(file_stats["size"]);
    var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8')); //gonna read it all as a string in this var.
} else {
    //  console.log(`${user_data_file} does not exist!`);
}



app.all('*', function (request, response, next) {
    console.log(request);
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //passing it on to the next who can respond
}); // this is diagnostic, to see what's the metod, query etc.

//u assignment 2 mora da proveris da li postoji u fajlu vec -- ako je undefind znaci postoji, onda pass da li ima dovoljno karaktera, onda da li se matchuju pass sa reentered pass 



//function to read the data from the register form and write it in the file
app.post('/process_register', function (req, res) {
    username = req.body.username;
    // adding new user to the object
    if (typeof user_data[username] == 'undefined') {  
        user_data[username] = {}; // sets up space for the newuser (empty object)
        user_data[username].password = req.body["password"]; // alternative reg_data[username].["password"] = 'newpass';
        user_data[username].email = req.body["email"];
        user_data[username].first_name = req.body["first_name"];
        //convert the updated userdata object to json and write it to the file
        fs.writeFileSync('./user_data.json', JSON.stringify(user_data));
        res.send(`${username} is registered`);
    } else {
        res.send(`${username} is taken`);
    }
}
)

app.get('/test', function (request, response, next) {
    response.send('I got a request for /test');
}); // if I get get request, then execute this function




app.post('/process_login', function (request, response, next) {
    console.log(request.body); //getting the body stuff
    if(typeof request.session['last_login'] != 'undefined'){
        console.log('Last login time was ' + request.session['last_login']);
        request.session['last_login'] = Date();
    } else{
        console.log("first time login");
    }
    let username_entered = request.body.uname;  //making an object from the input form for username
    let password_entered = request.body.psw; //making an object from the input form for password
    
    if (typeof user_data[username_entered] != 'undefined') { //if the entered username undefined, that means I have it in my data already, so they can proceede to invoice
        if (user_data[username_entered]['password'] == password_entered) {
            response.cookie('username', username_entered);
            request.query["uname"] = user_data[username_entered].name; //adding name to the URL of invoice, to personalize it
            response.redirect('/login.html');
            
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

