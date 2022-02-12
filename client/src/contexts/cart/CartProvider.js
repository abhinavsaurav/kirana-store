import { useReducer } from 'react';
import CartContext from './CartContext';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import kiranaAPI from '../../apis/kiranaAPI';

const localCartData = JSON.parse(localStorage.getItem('cartData'));

const defaultCartState = {
	items: localCartData.items ?? [],
	totalAmount: localCartData.amount ?? 0,
};

// This is a reducer for react hook (useReducer) to perform some action on the
const cartReducer = (state, action) => {
	// ? why is it action.item and not action.items
	// ! because we are passing a object below {type and item } item is coming from the adding cart btn

	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + +action.item.price * action.item.amount;

		// ######### Carefull its _id from the state data ########## !

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
		// console.log('Inside the delete reducer ');
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const cartItemToBeUpdated = state.items[existingCartItemIndex];

		// currently removing the entire item. So, full price of the item
		const updatedTotalAmount =
			state.totalAmount -
			cartItemToBeUpdated.price * cartItemToBeUpdated.amount;

		// filtering the item out
		const updatedItemsArray = state.items.filter(
			(item) => item.id !== action.id
		);

		return {
			items: updatedItemsArray,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'RESET_CART') {
		return {
			items: [],
			totalAmount: 0,
		};
	}

	if (action.type === 'UPDATE_CART_ITEMS') {
		// either do this or add using the add action type
		return {};
	}

	if (action.type === 'REPLACE_CART') {
		return state;
	}
};

// NOTE: Context Provider for Cart
// It allows consuming components to subscribe to context changes.
const CartProvider = (props) => {
	const auth = useAuth();
	const dispatch = useDispatch();

	const [cartState, dispatchCartActions] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		// adding id
		item['id'] = item['_id'];
		item['qty'] = item['amount'];
		//deleting _id
		delete item['_id'];
		delete item['amount'];

		dispatchCartActions({ type: 'ADD', item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartActions({ type: 'REMOVE', id });
	};

	const getItemsFromDBToCartHandler = async () => {
		if (auth.isAuthenticated) {
			const response = await kiranaAPI.get('/carts/me', {
				token: auth.token,
			});

			console.log(response.data);

			dispatch({ type: 'REPLACE_CART', data: response.data });
		}
	};

	const updateItemsFromCartHandler = async (items, totalAmount) => {
		console.log('Is this even working bro?');
		if (auth.isAuthenticated) {
			console.log('im firing here bro');
			console.log(auth.token);
			const response = await kiranaAPI.post(
				'/carts/me',
				{
					cartItems: items,
					amount: totalAmount,
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				}
			);
			console.log(response.data);

			dispatch({ type: 'REPLACE_CART', data: response.data });
		}
	};

	const resetItemsFromCartHandler = (id) => {
		dispatchCartActions({ type: 'RESET_CART' });
	};

	// * this takes in two functions responsible for modifying the cart
	// * and passes it to reducer to perform a action on them
	// * and a reference to its state is passed inside this making it to change
	// * the value
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		getItemsFromDB: getItemsFromDBToCartHandler,
		updateItems: updateItemsFromCartHandler,
		resetItems: resetItemsFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
