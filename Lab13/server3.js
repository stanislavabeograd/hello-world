var express = require('express');
var app = express();
var myParser = require("body-parser"); //takes a body of the request and creates an object of the data in it (POST data)
app.use(myParser.urlencoded({ extended: true })); //need to add this


app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //passing it on to the next who can respond
});

app.get('/test', function (request, response, next) {
    response.send('I got a request for /test'); 
    });

app.post('/display_purchase', function (request, response, next) { //ovo odgovara na POST u method u html form
    post_data = request.body; //gets the data form the post in the variable
    response.send(JSON.stringify(post_data)); 
        });

app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

