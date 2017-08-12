"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
          db.collection("tweets").find().toArray((err,array)=>{
            if (err){
            return callback(err);
          }
          callback(null, array);
        });
      });
    },
    likeTweet: function(name,liked,callback) {
      simulateDelay(() => {

          db.collection("tweets").find({'user.name':name}).toArray((err,array)=>{
            if (err){
            return callback(err);
            }

            if(liked){
              db.collection("tweets").update(
                {'user.name':name},
                {$inc:{
                  'liked':1
                }}
              )
            }else{
              db.collection("tweets").update(
                {'user.name':name},
                {$inc:{
                  'liked':-1
                }}
              )
            }

          callback(null, array[0]);
        });
      });
    }
  }
}
