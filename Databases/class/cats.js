const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// var bubbles = new Cat({
// 	name: "Mr. Business",
// 	age: 12,
// 	temperament: "Aggressive"
// });

// bubbles.save((err, cat) => {
// 	if(err) {
// 		console.log("Something went wrong");
// 	} else {
// 		console.log("Saved a cat to the db");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Billy boy",
	age: 3,
	temperament: "Playful"
}, (err, cat) => {
	if(err) {
		console.log(err);
	} else {
		console.log(`Cat created: ${cat}`);
	}
});

Cat.find({}, (err, cats) => {
	if(err) {
		console.log("Error:", err);
	} else {
		console.log("Cats: ");
		console.log(cats);
	}
});