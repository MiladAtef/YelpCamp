const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampgroundSchema = new Schema({
	name: String,
	image: String,
	description: String
});

mongoose.model('Campground', CampgroundSchema);
