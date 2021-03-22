
var attributes  =  "Stasa; 37; -36.5; CIS";
var pieces = attributes.split (";");

function isNonNegInt(q, returnErrors = false) //this function checks whether the item in array is a whole number or not.
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

function checkIt(item, index) { 
    // console.log(`part ${index} is ${(isNonNegInt(pieces[item])?'a':'not a')} quantity`);
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}

// pieces.forEach(checkIt);
pieces.forEach( (item, index) => console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`));

var monthly_sales = [125, 200, 199, 499];
var tax_rate = 0.04;

function calculateTaxesOwed(sales, tax){
    var tax_owing = [];

}

function calculateTaxesOwed(sales, tax){
    var tax_owing = [];
    for (var i = 0; i < sales.length; i++) {
        tax_owing.push(sales[i]*tax);
    }
    return tax_owing;
}

var tax_owing = calculateTaxesOwed(monthly_sales, tax_rate);
console.log(tax_owing);