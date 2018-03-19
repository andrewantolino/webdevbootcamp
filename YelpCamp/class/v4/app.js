const app 		 = require('express')(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment 	 = require('./models/comment'),
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
      res.render('campgrounds/index', {campgrounds: campgrounds});
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
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
	    if(err) {
	      	console.log(err);
	    } else {
	    	console.log(foundCampground);
	    	res.render('campgrounds/show', {campground: foundCampground});
	    }
  	}); 
});


//Comments routes
//New comment form
app.get('/campgrounds/:id/comments/new', (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//Create post route
app.post('/campgrounds/:id/comments', (req, res) => {
	//lookup campground using id
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			//create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.log(err);
				} else {

					//this has been commented out as Colt's version was more streamlined - no need to find the campground again - the Comment.create callback has access to the found `campground`

					/*connect new comment to campground
					Campground.findById(req.params.id, (err, campground) => {
						if(err) {
							console.log(err);
						} else {
							console.log(req.params.id);
					*/

							//save new comment to campground object's comments array
							campground.comments.push(comment);
							campground.save();

							/*this was also streamlined for the same reasons as above - access to scope of calling function(s)

							campground.save((err, updatedCampground) => {
								if(err) {
									console.log(err);
								} else {
									console.log(updatedCampground._id);
							*/ 	}

								//redirect to campground show page
								res.redirect('/campgrounds/' + campground._id);
						/*	});
						}
					}); */
				}
			});
		}
	});	
});

app.listen(3000, () => {
	console.log("YelpCamp Server running");
});