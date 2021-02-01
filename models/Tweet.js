
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, //user object id
        ref: 'users' //associations
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tweet = mongoose.model('tweet', TweetSchema);
// ^^ same thing
// const Tweet = mongoose.model('tweet', TweetSchema);
// module.exports = Tweet