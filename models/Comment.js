const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	text: String,
	author: String
});

mongoose.model('Comment', commentSchema);
