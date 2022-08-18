// URL
const PRODUCTION_API_URL = 'http://localhost:5000/'; // for now its acting as production too
const DEVELOPMENT_API_URL = 'http://localhost:5000/';
export const API_URL = PRODUCTION_API_URL || DEVELOPMENT_API_URL;

// ACTION CREATOR
export const FETCH_ALL_PRODUCTS = 'fetchAllProducts';
export const FETCH_PRODUCT = 'fetchProduct';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const IDLE = 'IDLE';
export const ERROR = 'ERROR';
export const SET_CHECKOUT_ADDRESS = 'SET_CHECKOUT_ADDRESS';
export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
// export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
// export const ORDER_CREATE_FAILED = 'ORDER_CREATE_FAILED';

export const ORDER_PAYMENT_REQUEST = 'ORDER_PAYMENT_REQUEST';
// export const ORDER_PAYMENT_SUCCESS = 'ORDER_PAYMENT_SUCCESS';
export const ORDER_PAYMENT_ERROR = 'ORDER_PAYMENT_ERROR';

export const CHART_PAID_UNPAID_COUNT = 'CHART_PAID_UNPAID_COUNT';
export const CHART_TOTAL_MONTHLY_ORDER = 'CHART_TOTAL_MONTHLY_ORDER';

// Errors - LOGIN PAGE
export const ERROR_LOGIN_SUBMIT = 'Username or Password entered is wrong!';
export const ERROR_LOGIN_EMAIL = 'Username format is incorrect';

// Extra
export const EMAIL_VALIDATION_PATTERN =
	/^[a-zA-Z][a-zA-Z0-9_-]{4,}@[a-zA-Z0-9]{2,}(\.(com|in|[a-zA-Z0-9]{2,6})){1,3}$/g;
export const IS_NUMBER_REGEX = /^[0-9]*$/;
// export const PHONE_NO_REGEX = /^[0-9]*$/
