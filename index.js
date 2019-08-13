const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

require('./models/Campground');
const Campground = mongoose.model('Campground');

mongoose.connect(
	'mongodb://localhost:27017/yelpcamp',
	{
		useNewUrlParser: true,
		useCreateIndex: true
	},
	err => {
		if (!err) {
			console.log('MongoDB Connection Succeeded.');
		} else {
			console.log('Error in DB connection: ' + err);
		}
	}
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('index', { campgrounds });
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
	res.render('new');
});

app.get('/campgrounds/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const campground = await Campground.findById(id);
		return res.render('show', { campground });
	} catch (e) {
		return res.status(404).send('Not Found!');
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
