






var day = 18;
var month = "September";
var year = 1983;
var monthKey = {'January': 0, 'February' : 1, 'March' : 3, 'April' : 3, 'May' : 0, 'June' : 3, 'July': 5, 'August': 1, 'September': 4, 'October' : 6, 'November' : 2, 'December' : 4}; 
var dayofweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var step1 = year;
if (month == 'January' || month == 'February')
    {step1=year-1;}
var step2 = step1 + parseInt(step1/4);
var step3 = step2 - parseInt(step1/100);
var step4 = step3 + parseInt(step1/400);
var step5 = day + step4;
var step6 = monthKey[month] + step5;
var step7 = step6%7;

console.log(` The day I was born was ${dayofweek[step7]}`);    
     
 

 
 
 
 
     
   