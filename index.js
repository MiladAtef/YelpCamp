const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(
	'mongodb://localhost:27017/yelpcamp',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	},
	err => {
		if (!err) {
			console.log('MongoDB Connection Succeeded.');
		} else {
			console.log('Error in DB connection: ' + err);
		}
	}
);
require('./models/Comment');
require('./models/Campground');
const Comment = mongoose.model('Comment');
const Campground = mongoose.model('Campground');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
});

app.post('/campgrounds', async (req, res) => {
	const { name, image, description } = req.body;
	const campground = new Campground({
		name,
		image,
		description
	});
	await campground.save();
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const campground = await Campground.findById(id)
			.populate('comments')
			.exec();
		return res.render('campgrounds/show', { campground });
	} catch (e) {
		return res.status(404).send('Not Found!');
	}
});

// ================================
//       COMMENTS ROUTES
// ================================

app.get('/campgrounds/:id/comments/new', async (req, res) => {
	const { id } = req.params;
	try {
		const campground = await Campground.findById(id);
		res.render('comments/new', { campground });
	} catch (e) {
		res.status(404).send('Not Found!');
	}
});

app.post('/campgrounds/:id/comments', async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	try {
		const newComment = new Comment(comment);
		await newComment.save();

		await Campground.updateOne(
			{ _id: id },
			{
				$push: { comments: newComment }
			}
		);
		res.redirect(`/campgrounds/${id}`);
	} catch (e) {
		res.status(400).send('something went wrong');
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
