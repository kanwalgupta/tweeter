"use strict";
var ObjectID = require('mongodb').ObjectID;
// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null,true);
    },

    updateStatus: function(id,status,callback) {
      if(status === "unlike"){
        db.collection("tweets").update({ "_id": ObjectID(id) },{ $inc: { "likes": -1 } });
      }else{
        db.collection("tweets").update({ "_id": ObjectID(id) },{ $inc: { "likes": 1 } });
      }
      callback(null,true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection("tweets").find().toArray(function(err,tweets){
          const sortNewestFirst = (a, b) => b.created_at - a.created_at;
          callback(err, tweets.sort(sortNewestFirst));
        });
    }

  };
}
