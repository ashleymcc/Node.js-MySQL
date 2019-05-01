DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue orange", "Citrus", 21.99, 70),
       ("Frozen grape", "Berry", 4.53, 5),
       ("Black payaya", "Tropical", 8.99, 20),
       ("Square watermelon", "Melons",12.00, 20),
       ("Rotten peach", "Drupes", 6.99, 20),
       ("Feisty lemon", "Citrus", 58.72, 15),
       ("Sad pear", "Pomes", 1.12, 15),
       ("Singing persimmon", "Berry", 19.99, 4),
       ("Seedless mango", "Drupes", 9.97, 4),
       ("Not-a-plum", "Drupes", 8.72,9);