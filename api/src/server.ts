import express from 'express';

const app = express();

app.get('/', (req, res) => {
	return res
		.json({
			message: 'Hello world',
		})
		.status(200);
});

app.post('/', (req, res) => {
	return res
		.json({
			message: 'User saved!',
		})
		.status(201);
});

app.listen(3333, () => console.log('Server running'));
