const app 		 = require('express')(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      seedDB	 = require('./seeds');

mongoose.connect('mongodb://localhost/yelp-camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
seedDB();

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {campgrounds: campgrounds});
    }
  });
});

app.post('/campgrounds', (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
  let description = req.body.description;
	let newCampground = {name: name, image: image, description: description}
	Campground.create(newCampground, (err, campground) => {
      if(err) {
        console.log(err);
      } else {
      	console.log(foundCampground);
        res.redirect("/campgrounds");
      }
    });
  });

app.get('/campgrounds/new', (req, res) => {
	res.render('new.pug');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
	    if(err) {
	      	console.log(err);
	    } else {
	    	console.log(foundCampground);
	    	res.render('show', {campground: foundCampground});
	    }
  	}); 
});

app.listen(3000, () => {
	console.log("YelpCamp Server running");
});