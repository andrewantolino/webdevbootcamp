const app = require('express')();
const bodyParser = require('body-parser');

const campgrounds = [
	{
		name: "Salmon Creek",
	  	image: "https://images.unsplash.com/photo-1430391553909-82e0eed4d127?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=22d05c60e85f6b9c26d4097940e4204b&auto=format&fit=crop&w=1050&q=80"
  	},
  	{
  		name: "Granite Hill",
  		image: "https://images.unsplash.com/photo-1502013962345-43ab54a37e9b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6bb9f6c703bbc3549a3f7797057cfe21&auto=format&fit=crop&w=1168&q=80"
  	},
  	{
  		name: "Mountain Goat's Rest",
  		image: "https://images.unsplash.com/uploads/1411962318730c9ed18c7/d39825fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1dea025a82c758ce756408a3c2ce427&auto=format&fit=crop&w=1051&q=80"
  	},
	{
		name: "Salmon Creek",
	  	image: "https://images.unsplash.com/photo-1430391553909-82e0eed4d127?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=22d05c60e85f6b9c26d4097940e4204b&auto=format&fit=crop&w=1050&q=80"
  	},
  	{
  		name: "Granite Hill",
  		image: "https://images.unsplash.com/photo-1502013962345-43ab54a37e9b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6bb9f6c703bbc3549a3f7797057cfe21&auto=format&fit=crop&w=1168&q=80"
  	},
  	{
  		name: "Mountain Goat's Rest",
  		image: "https://images.unsplash.com/uploads/1411962318730c9ed18c7/d39825fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1dea025a82c758ce756408a3c2ce427&auto=format&fit=crop&w=1051&q=80"
  	}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new.pug');
});

app.listen(3000, () => {
	console.log("YelpCamp Server running");
});