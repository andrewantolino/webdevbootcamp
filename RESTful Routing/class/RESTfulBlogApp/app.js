const express  	 = require('express'),
app 		   	 = express(),
methodOverride 	 = require('method-override'),
expressSanitizer = require('express-sanitizer'),
bodyParser 	   	 = require('body-parser'),
mongoose   	   	 = require('mongoose');

//App config
mongoose.connect("mongodb://localhost/restful-blog-app");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Mongoose/model config
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now()}
});

const Blog = mongoose.model("Blog", blogSchema);

//RESTful routes

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

//'Index' route
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs})
		}
	});
});

//'New' route
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

//'Create' route
app.post('/blogs', (req, res) => {
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err) {
			res.render('new');
		} else {
			//then, redirect to the 'index' route
			res.redirect('/blogs');
		}
	});
	
});

//'Show' route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', {blog: foundBlog});
		}
	});
});

//'Edit' route
app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', {blog: foundBlog});
		}
	});
});

//'Update' route
app.put('/blogs/:id', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.redirect(`/blogs/${req.params.id}`);
		}
	});
});

//'Destroy' route
app.delete('/blogs/:id', (req, res) => {
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, (err) => {
		//redirect somewhere
		if(err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, () => {
	console.log("Server running");
});

