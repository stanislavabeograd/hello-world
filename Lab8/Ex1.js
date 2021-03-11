require("./product_data.js");

num_products = 6;

var item_num = 1;

while (item_num != (num_products + 1)) 
{
    console.log(` ${item_num}. ${eval('name' + item_num)}`);
    item_num++;
}

Console.log(`That's all we have!`)