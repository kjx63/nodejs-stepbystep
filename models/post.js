// Define Schema
// - https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const PostSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
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

// anytime .remove method gets called (see the postDestroy in the posts.js controllers), this pre-hook middleware gets called.
PostSchema.pre('remove', async function() {
    // review goes through and removes any reviews that mach up with the review id inside the post.reviews array.s
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    });
});

module.exports = mongoose.model('Post', PostSchema);