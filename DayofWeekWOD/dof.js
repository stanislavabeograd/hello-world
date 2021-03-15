
// all the arreys
var year = [];
for (var i = 1990; i<=2099; i++) 
{
    year.push(i);
}

//var day =[];
/*for (var a = 1; a <= 31; a++)
{
    day.push(a);
}
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
*/

var monthKey = {'January': 0, 'February' : 1, 'March' : 3, 'April' : 3, 'May' : 0, 'June' : 3, 'July': 5, 'August': 1, 'September': 4, 'October' : 6, 'November' : 2, 'December' : 4}; 

var day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// my dates

myMonth = 'September';
myDate = 18;
myYear = 1983;

//  algorithm

var step1 = myYear - 1;
if (month = ['January', 'February']) 
        {year - 2;}

var step2 = parseInt (step1/4) + step1;
var step3 = step2 - parseInt(step1/100);
var step4 = step3 + parseInt (step1/400);
var step5 = myDate + step4;
var step6 = monthKey['September'] + step5;
var step7 = step6%7;

console.log(day[step7]);



