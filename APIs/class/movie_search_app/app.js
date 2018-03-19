const app = require('express')();
const request = require('request');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render("search");
});

app.get('/results', (req, res) => {
	let query = req.query.search;
	let url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, (err, response, body) => {
		if(!err && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render('results', {data: data});
		}
	});
});

app.listen(3000, () => {
	console.log("Movie app running");
});