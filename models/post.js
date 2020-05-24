// Define Schema
// - https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [String],
    date: {
        type: Date,
        default: Date.now
    },
    location: String,
    lat: Number,
    lng: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

module.exports = mongoose.model('Post', PostSchema);