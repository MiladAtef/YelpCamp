const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const campgrounds = [
	{
		name: 'Salmon Greek',
		image:
			'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: "Mountain Goat's rest",
		image:
			'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: 'Salmon Greek',
		image:
			'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: "Mountain Goat's rest",
		image:
			'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: 'Salmon Greek',
		image:
			'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	},
	{
		name: "Mountain Goat's rest",
		image:
			'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	}
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds });
});

app.post('/campgrounds', (req, res) => {
	const { name, image } = req.body;
	campgrounds.push({ name, image });
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
