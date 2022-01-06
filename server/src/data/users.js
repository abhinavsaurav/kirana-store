const bcrypt = require('bcryptjs');

const users = [
	{
		name: 'Admin',
		email: 'admin@kirana.com',
		password: bcrypt.hashSync('asdfjkl;', 8),
		isAdmin: true,
	},
	{
		name: 'Abhinav',
		email: 'abhinav@kirana.com',
		password: bcrypt.hashSync('asdfjkl;', 8),
	},
	{
		name: 'Saurav',
		email: 'saurav@kirana.com',
		password: bcrypt.hashSync('asdfjkl;', 8),
	},
];
module.exports = users;
