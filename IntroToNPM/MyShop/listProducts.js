const faker = require('faker');

console.log("====================");
console.log("WELCOME TO MY SHOP!");
console.log("====================");

var i = 0;
while (i <= 10) {
	console.log(`${faker.commerce.productName()} - $${faker.commerce.price()}`);
	i++;
}
