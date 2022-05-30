const Order = require('../models/order');

const countPaidUnpaidOrder = async (req, res, next) => {
	try {
		const countPaidUnpaidOrder = await Order.aggregate([
			{
				$group: {
					_id: '$isPaid',
					totalCount: { $sum: 1 },
				},
			},
		]);

		// console.log(countPaidUnpaidOrder);
		countPaidUnpaidOrder.map((data) => {
			if (data._id) {
				console.log(data._id);
				data.name = 'Paid';
			} else {
				data.name = 'Unpaid';
			}
			delete data._id;
		});
		// console.log(countPaidUnpaidOrder);

		res.send({ countPaidUnpaidOrder });
	} catch (err) {
		next(err);
	}
};

const totalMonthlyOrder = async (req, res, next) => {
	try {
		if (!req.user.isAdmin) {
			throw Error('Not authorized');
		}

		const totalMonthlyOrder = await Order.aggregate([
			{
				$group: {
					_id: {
						$month: '$createdAt',
					},
					totalSum: {
						$sum: '$totalPrice',
					},
					mycount: {
						$sum: 1,
					},
				},
			},
		]);

		res.send({ totalMonthlyOrder });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	countPaidUnpaidOrder,
	totalMonthlyOrder,
};
