//Npm install  and init

var mysql = require('mysql');
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'Bamazon', 
});

connection.connect(function(err){
    if (err) throw err;
   
    displayItems();
    custPurchase();
    orderMore();
 
});


function displayItems(){
    connection.query("SELECT * FROM PRODUCTS", function(err, res){
        if (err) throw err;
        console.log(res);
    
    });
}

//asking user which product and how many
function custPurchase(){
    inquirer.prompt([
            
    {
        type: "input",
        message: "Please enter the product ID you would like to purchase",
        name: "item_id"
    },
    {
        type: "input",
        message: "How many would you like to buy?",
        name: "quantity"
    }
    ])
    .then(function(userInput){

//comparing user input against product table 
    connection.query("SELECT * FROM PRODUCTS WHERE ?", {item_id: userInput.item_id},function(err, res){
        if (err) throw err;
        
        console.log("Stock Quantity : ", res[0].stock_quantity);
        console.log("User Input: ", userInput.quantity);
        console.log("Price: ", res[0].price);
        
        if(userInput.quantity > res[0].stock_quantity){
            console.log("Insufficient quantity!")
            connection.end();
        }
        else{
            console.log("Your Total Today is: ", userInput.quantity * res[0].price);

            //update product table (Stock - User input)
            var new_stock_quantity = res[0].stock_quantity - userInput.quantity;
            connection.query("UPDATE PRODUCTS SET ? WHERE ?", 
                [{
                    stock_quantity : new_stock_quantity
                },
                {
                    item_id : res[0].item_id
                }],
                
                function(err){
                    if (err) throw err;
                    console.log("Order placed successfully!");
                    
                    orderMore();
                }
            );
            
 function orderMore() {
                inquirer.prompt([
                    {
                        type: "confirm",
                        message: "Would you like to order anything else?",
                        name: "again"
                    },
                ]).then(function (userInput) {
                    if(userInput.again) {
                        selection();
                    } else {
                        exit();
                    }
                });
            }
            
            function exit() {
                connection.end();
                console.log("Have a great day!");
            }
            connection.end();
        }
    });
});

}