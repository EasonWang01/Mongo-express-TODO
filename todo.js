var express = require("express");
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var mongoose = require("mongoose");
mongoose.connect('mongodb://forclass1:test123@ds013898.mlab.com:13898/forclass',function(err){
	if(err){throw err};
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect mongo")
});
var Cat = mongoose.model('Dog', {
  name: String,
  time: String
});

/*var kitty = new Cat({ name: 'Zildjian', time:'12:00'});

//使用save方法後才會存入
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});*/


//-----
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }))
app.get("/",function(req,res){

res.render('home');
});


app.post("/signup",function(req,res){

	var kitty = new Cat({ name:req.body.username, time:req.body.email});

	kitty.save(function (err) {
	  if (err) // ...
	  console.log('save err');
	});
	res.redirect('/read')
	res.end();
});


app.post("/updatelist",function(req,res){
	
	Cat.update({_id:req.body.id[0]},{time:req.body.event[0],name:req.body.event[1]},function(err){
		if(err){
		console.log(err);
	     }
	});
		res.redirect('/read');
		res.end();
});




app.post("/deletelist",function(req,res){
	

	Cat.remove({_id:req.body.id},function(err){
		if(err){throw err};
	});

		res.redirect('/read');
		res.end();
});


app.get("/read",function(req,res){

	var find = Cat.find({},{name:1,time:1,_id:1},function(err,doc){
	res.render("home",{text:doc});
	});

});



app.listen("3000",function(){
	console.log("listening3000");
});

