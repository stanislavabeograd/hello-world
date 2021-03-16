attributes  =  "Stasa; 37.5; -36.5; CIS";
var i;
var x ="";
pieces = attributes.split (";");
    for (i=0; i<pieces.length; i++)
        {x += " " + typeof(pieces[i]) + ", " + pieces[i] + ",";
        }

console.log(x.slice(0,x.length-1));


