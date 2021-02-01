// dont forget to export the routes at the bottom of the file
const express = require('express');
const router = express.Router();   //gives router object off of the Router
const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweet');


//retreving all tweets
router.get('/', (req, res) => {
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});


//retreving single users' tweet
router.get('/user/:user_id', (req, res) => {
    Tweet.find({ user: req.params.user_id }) //finding a tweet where the user matches the requested user id (which is in our url)
        .then(tweets => res.json(tweets))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No tweets found from that user' }
            )
        );
});

// retreviing single tweet
router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        );
});

// protected route for users to post tweets
router.post("/", 
//Passport strategy for authenticating with a JSON Web Token.
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateTweetInput(req.body);

        //not valid
        if (!isValid){
            return res.status(400).json(errors)
        }

        //tweet is valid and we have validated ourself
        const newTweet = new Tweet({
            text: req.body.text,
            user: req.user.id
        });
        newTweet.save().then(tweet => res.json(tweet))
    }
);

module.exports = router;