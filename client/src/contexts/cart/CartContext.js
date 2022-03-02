import React from 'react';

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	totalPrice: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
	getItemsFromDB: () => {},
	updateItems: (items, totalAmount) => {},
	resetItems: () => {},
});

export default CartContext;
