var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
var friends = ["Tony", "Miranda", "Justin", "Frank", "Gabbagool"];

app.get("/", (req, res) => {
	res.render("home");
});


app.get("/friends", (req, res) => {
	res.render("friends", {friends: friends});
});

app.post("/addfriend", (req, res) => {
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(app.get("port"), process.env.IP, () => {
	console.log("Listening on port: " + app.get("port"));
});