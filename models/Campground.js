const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampgroundSchema = new Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

mongoose.model('Campground', CampgroundSchema);
