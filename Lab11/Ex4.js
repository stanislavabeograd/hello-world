
attributes  =  "Stasa; 37; -36.5; CIS";
pieces = attributes.split (";");

function isNonNegInt(q, returnErrors = false) //this function checks whether the item in array is a whole number or not.
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

for (let piece of pieces) {
    console.log(a(piece, true));
}


