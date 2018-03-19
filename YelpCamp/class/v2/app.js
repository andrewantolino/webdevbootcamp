const app = require('express')(),
      bodyParser = require('body-parser'),
      mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/yelp-camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

//Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//         name: "Granite Hill",
//         image: "https://images.unsplash.com/photo-1502013962345-43ab54a37e9b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6bb9f6c703bbc3549a3f7797057cfe21&auto=format&fit=crop&w=1168&q=80",
//         description: "This is a big granite hill"
//   }, (err, campground) => {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground: ", campground);
//     }
//   });

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
        res.redirect("/campgrounds");
      }
    });
  });

app.get('/campgrounds/new', (req, res) => {
	res.render('new.pug');
});

app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, () => {
	console.log("YelpCamp Server running");
});