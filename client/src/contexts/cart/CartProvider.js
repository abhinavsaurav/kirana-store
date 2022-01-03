import { useReducer } from 'react';
import CartContext from './CartContext';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount = state.totalAmount + action.item.price;

		const itemPresentInCartIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const itemToBeUpdated = state.items[itemPresentInCartIndex];

		let updatedItems;

		if (itemToBeUpdated) {
			// updating the item price if the item exist by cumulating the price
			const updatedItem = {
				...itemToBeUpdated,
				amount: itemToBeUpdated.amount + action.item.amount,
			};

			// getting all the item from the previous state and then updating the specific item
			updatedItems = [...state.items];
			updatedItems[itemPresentInCartIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.items);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		// Add the price and then try changing it
		// const existingItem = state.items[existingCartItemIndex];
		// const amount = state.totalAmount/existingItem.price;
		// const updatedTotalAmount = state.totalAmount - existingItem.price;
		// let updateditem;

		// if(amount>1){
		//     const updatedItem = {...existingItem, price: updatedTotalAmount};

		// }

		// return {
		//     items:
		// }
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartActions] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartActions({ type: 'ADD', item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartActions({ type: 'REMOVE', id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
