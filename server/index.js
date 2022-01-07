require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const listening = () => {
	console.log('server started');
	console.log('server running at port: ' + PORT);
};

app.listen(PORT, listening);
