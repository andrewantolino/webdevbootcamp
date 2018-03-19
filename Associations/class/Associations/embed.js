const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');

//Models
//Post - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

//User - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: 'bobby@thewynn.org',
// 	name: 'Bobby De Niro'
// });

// newUser.posts.push({
// 	title: "How to skim from the top",
// 	content: "Don't be a fuckin' wise guy, alright?"
// });

// newUser.save((err, user) => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflections on apples",
// 	content: "They're not so great"
// });

// newPost.save((err, post) => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "Bobby De Niro"}, (err, user) => {
	if(err) {
		// console.log(err);
	} else {
		user.posts.push({
			title: "How to choke with piano wire",
			content: "Luca Brasi sleeps with the fishes"
		});
		user.save((err, user) => {
			if(err) {
				console.log(err)
			} else {
				console.log(user);
			}
		});
	}
});