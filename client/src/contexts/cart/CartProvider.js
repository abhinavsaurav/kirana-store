import { useReducer } from 'react';
import CartContext from './CartContext';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

// This is a reducer for react hook (useReducer) to perform some action on the
const cartReducer = (state, action) => {
	// ? why is it action.item and not action.items
	// ! because we are passing a object below {type and item } item is coming from the adding cart btn

	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + +action.item.price * action.item.amount;

		// ! ######### Carefull its _id from the state data ########## !

		const itemPresentInCartIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		console.log(itemPresentInCartIndex);
		const itemToBeUpdated = state.items[itemPresentInCartIndex];
		// console.log(itemToBeUpdated);
		let updatedItems;

		if (itemToBeUpdated) {
			console.log('Im reaching here');
			console.log(itemPresentInCartIndex);
			console.log(itemToBeUpdated);
			// updating the item price if the item exist by cumulating the price
			const updatedItem = {
				...itemToBeUpdated,
				amount: itemToBeUpdated.amount + action.item.amount,
			};

			// getting all the item from the previous state and then updating the specific item
			updatedItems = [...state.items];
			updatedItems[itemPresentInCartIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
			console.log(updatedItems);
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

		// eslint-disable-next-line
		const itemToBeUpdated = state.items[existingCartItemIndex];

		// const total
		// if(amount>1){
		//     const updatedItem = {...existingItem, price: updatedTotalAmount};
		// }
		// return {
		//     items:
		// }
	}
};

// NOTE: Context Provider for Cart
// It allows consuming components to subscribe to context changes.
const CartProvider = (props) => {
	const [cartState, dispatchCartActions] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		// adding id
		item['id'] = item['_id'];
		//deleting _id
		delete item['_id'];
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
