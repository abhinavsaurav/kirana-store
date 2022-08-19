const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		avatar: {
			type: Buffer, // setting type to Buffer for images
		},
	},
	{
		timestamps: true,
	}
);

// This will run prior to saving the
userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	// console.log(user);
	next();
});

// * https://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

// * Using statics as don't need the instance here(methods) so using statics also we are looking it on the model
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		// throwing a general error
		throw new Error('Username or password is incorrect!');
	}

	const isHashMatching = await bcrypt.compare(password, user.password);

	if (!isHashMatching) {
		throw new Error('Username or password is incorrect!');
	}

	return user;
};

// This method will control the response send from the api req
userSchema.methods.toJSON = function () {
	const user = this;

	const userObjects = user.toObject();

	delete userObjects.password;
	// console.log(userObjects.isAdmin);

	if (!userObjects.isAdmin) {
		delete userObjects.isAdmin;
	}
	delete userObjects.tokens;
	delete userObjects.avatar; // for not taking lot of time showing image

	return userObjects;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
