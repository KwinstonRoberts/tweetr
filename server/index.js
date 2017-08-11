"use strict";

// Basic express setup:
require('dotenv').config();

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt        = require('bcrypt');
const app           = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'user_id',
  keys : ['key1','key2'],
  maxAge: 24 * 60 * 60 * 1000,
}));
app.use(bodyParser.json());


const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;



MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  const DataHelpers = require("./lib/data-helpers.js")(db);
  const userHelper    = require("./lib/util/user-helper.js");



	// The `data-helpers` module provides an interface to the database of tweets.
	// This simple interface layer has a big benefit: we could switch out the
	// actual database it uses and see little to no changes elsewhere in the code
	// (hint hint).
	//
	// Because it exports a function that expects the `db` as a parameter, we can
	// require it and pass the `db` parameter immediately:

	// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
	// so it can define routes that use it to interact with the data layer.
	const tweetsRoutes = require("./routes/tweets")(DataHelpers);

	// Mount the tweets routes at the "/tweets" path prefix:

  app.post('/login', function(req,res){
    db.collection('users').find({'name':req.body.username}).toArray((err,array)=>{
    bcrypt.compareSync(req.body, array[0].password,function(){
      if(err)throw err;
      req.session.user_id = array[0].name;
      res.redirect('');
    });
  });
});

  app.post('/register', function(req,res){
    console.log(req.body.password)
    if(!req.body.password || !req.body.username){
      db.collection('users').find({'name':req.body.username}).toArray((err,array)=>{
        if(array.length!==0){
          res.status(400).send("email exists");
          throw "error occurred";
        }
      });
      res.status(400).send('empty form field');
      throw "error occurred";
    }else{
      var user = userHelper.generateRandomUser();
      var newUser = {
        "name" : req.body.username,
        "avatars":user.avatars,
        "handle" : req.body.username.slice(4),
        "password":bcrypt.hashSync(req.body.password,10)
      }
      db.collection('users').insertOne(newUser);
      req.session.user_id = newUser.name;
    }
  })

	app.use("/tweets", tweetsRoutes);

  app.post('/logout', function(req,res){
    req.session = null;
    res.redirect('back');
  });

  app.listen(process.env.PORT || PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
