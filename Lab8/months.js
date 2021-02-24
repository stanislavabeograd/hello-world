
    var month;
    var num_days;
    d = new Date();
    

    switch (d.getMonth()) {
        case 0:
        month = 'January'; num_days= 31;
        break;
        case 1:
        month = "February"; num_days =28;
        break;
        case 2:
        month = "March"; num_days = 31; 
        break;
        case 3: 
        month = "April"; num_days= 30;
        break;
        case 4: 
        month= "May"; num_days= 31;
        break;
        case 5: 
        month = "June"; num_days= 30;
        break;
        case 6: 
        month = "July"; num_days= 31;
        break;
        case 7: 
        month = "August"; num_days= 31;
        break;
        case 8: 
        month = "September"; num_days= 30;
        break;
        case 9: 
        month = "October"; num_days= 31;
        break;
        case 10: 
        month = "November"; num_days= 30;
        break;
        case 11: 
        month = "December"; num_days= 31;
        break;
        default:
        num_days = 1;
        break;
    }
    
    
console.log( `Month is ${month} and it has ${num_days} days `); 
