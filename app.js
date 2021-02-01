const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;


const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const passport = require('passport');


app.use(passport.initialize());
require('./config/passport')(passport);

// urlencoded allows postman to work
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //respond to json request

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// big picture: connecting the routers users.js 
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));
