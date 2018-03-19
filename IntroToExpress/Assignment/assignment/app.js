const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Hello there, welcome to my assignment!");
});

app.get('/speak/:animal', (req, res) => {
	var noise = ''
	if (req.params.animal === "pig") {
		noise += "Oink oink";
	} else if (req.params.animal === "cow") 
{		noise += "Moooo";
	} else if (req.params.animal)
	res.send(`The ${animal} says ${noise}!!!`);
});

app.get('/repeat/:phrase/:number', (req, res) => {
	var repeats = Number(req.params.number);
	var result = '';

	for(var i = 0; i < repeats; i++) {
		result += req.params.phrase + ' ';
	}
	res.send(result);
});

app.listen(3000, () => {
	console.log("Server listening");
});