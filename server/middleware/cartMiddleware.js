const Cart = require('../src/models/cart');

// TODO cart middleware can query latest product prices before sending data

const cartMiddleware = async function (req, res, next) {
	try {
		// if (req.params.id.length !== 24) {
		// 	res.status(400);
		// 	return next();
		// }
		// console.log(req.user._id);
		const cart = await Cart.findCartByUserId(req.user._id);

		if (!cart) {
			throw new Error('Cart not found something is wrong!');
		}

		req.cart = cart;
		next();
	} catch (e) {
		next(e);
	}
};

module.exports = cartMiddleware;
