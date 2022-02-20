import { useReducer } from 'react';
import CartContext from './CartContext';
import useAuth from '../../hooks/useAuth';
import kiranaAPI from '../../apis/kiranaAPI';

const localCartData = JSON.parse(localStorage.getItem('cartData'));

const defaultCartState = {
	items: localCartData && localCartData.items ? localCartData.items : [],
	totalAmount: localCartData && localCartData.amount ? localCartData.amount : 0,
	totalPrice:
		localCartData && localCartData.totalPrice ? localCartData.totalPrice : 0, // NEEDS TO BE IMPLEMENTED
};

// This is a reducer for react hook (useReducer) to perform some action on the
const cartReducer = (state, action) => {
	// ? why is it action.item and not action.items
	// ! because we are passing a object below {type and item } item is coming from the adding cart btn

	if (action.type === 'ADD') {
		// This is updatedTotalPrice
		const updatedTotalPrice =
			state.totalPrice + +action.item.price * action.item.qty;
		// console.log(updatedTotalPrice);

		// ######### Carefull its _id from the state data ########## !

		const itemPresentInCartIndex = state.items.findIndex(
			(item) => item.id._id === action.item.id || item.id === action.item.id
		);
		// console.log(itemPresentInCartIndex);
		const itemToBeUpdated = state.items[itemPresentInCartIndex];
		// console.log(itemToBeUpdated);
		let updatedItems;

		if (itemToBeUpdated) {
			// console.log('Im reaching here');
			// console.log(itemPresentInCartIndex);
			// console.log(itemToBeUpdated);
			// updating the item price if the item exist by cumulating the price
			const updatedItem = {
				...itemToBeUpdated,
				qty: itemToBeUpdated.qty + action.item.qty,
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
			totalPrice: updatedTotalPrice,
		};
	}

	if (action.type === 'REMOVE') {
		// console.log('Inside the delete reducer ');
		console.log(state.items);
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id._id === action.id || item.id === action.id
		);

		const cartItemToBeUpdated = state.items[existingCartItemIndex];

		// currently removing the entire item. So, full price of the item
		const updatedTotalPrice =
			state.totalPrice - cartItemToBeUpdated.price * cartItemToBeUpdated.qty;

		// filtering the item out

		const updatedItemsArray = state.items.filter((item) => {
			if (typeof item.id === 'object' && item.id._id === action.id) {
				return;
			} else if (item.id === action.id) {
				return;
			}

			return item;
		});

		return {
			items: updatedItemsArray,
			totalPrice: updatedTotalPrice,
		};
	}

	if (action.type === 'RESET_CART') {
		return {
			items: [],
			totalPrice: 0,
		};
	}

	if (action.type === 'UPDATED_CART_DATA_FROM_DB') {
		// either do this or add using the add action type
		console.log(action.data);
		// console.log(action);
		return { items: action.data.cartItems, totalPrice: action.data.totalPrice };
	}

	if (action.type === 'REPLACE_CART') {
		return state;
	}
};

// NOTE: Context Provider for Cart
// It allows consuming components to subscribe to context changes.
const CartProvider = (props) => {
	const auth = useAuth();

	const [cartState, dispatchCartActions] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = async (item) => {
		console.log(item);
		// adding id
		item['id'] = item['_id'];
		delete item['_id'];

		// delete item['amount'];

		if (auth.isAuthenticated) {
			// * DB REQUEST TO MERGE ITEMS TO CART
			const response = await kiranaAPI.post(
				'/carts/me/',
				{
					cartItems: [item],
					amount: item.price,
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				}
			);
			console.log(response.data);
		}

		dispatchCartActions({ type: 'ADD', item });
	};

	// This will remove entire item from the cart
	const removeItemFromCartHandler = async (id) => {
		console.log(id);
		if (auth.isAuthenticated) {
			// delete req takes body at as 3rd param
			const response = await kiranaAPI.delete(`/carts/me/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});
		}

		dispatchCartActions({ type: 'REMOVE', id });
	};

	const getItemsFromDBToCartHandler = async () => {
		if (auth.isAuthenticated) {
			const response = await kiranaAPI.get('/carts/me', {
				token: auth.token,
			});

			console.log(response.data);

			dispatchCartActions({ type: 'REPLACE_CART', data: response.data });
		}
	};

	const updateItemsFromCartHandler = async (items, totalPrice) => {
		console.log('Is this even working bro?');
		if (auth.isAuthenticated) {
			// console.log('im firing here bro');
			// console.log(auth.token);
			// * DB REQUEST TO MERGE ITEMS FROM CART
			const response = await kiranaAPI.post(
				'/carts/me',
				{
					cartItems: items,
					amount: totalPrice,
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				}
			);
			console.log(response.data);

			// if (response.data.cartItems && response.data.cartItems.length > 0) {
			// 	response.data.cartItems.forEach((item) => (item.amount = item.qty));
			// }
			console.log(response.data.cartItems);

			await dispatchCartActions({
				type: 'UPDATED_CART_DATA_FROM_DB',
				data: response.data,
			});
		}
	};

	const resetItemsFromCartHandler = () => {
		dispatchCartActions({ type: 'RESET_CART' });
	};

	// * this takes in two functions responsible for modifying the cart
	// * and passes it to reducer to perform a action on them
	// * and a reference to its state is passed inside this making it to change
	// * the value
	const cartContext = {
		items: cartState.items,
		totalPrice: cartState.totalPrice,
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
