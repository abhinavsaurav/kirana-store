// URL
const PRODUCTION_API_URL = '';
const DEVELOPMENT_API_URL = 'http://localhost:5000/';
export const API_URL = PRODUCTION_API_URL || DEVELOPMENT_API_URL;

// ACTION CREATOR
export const FETCH_ALL_PRODUCTS = 'fetchAllProducts';
export const FETCH_PRODUCT = 'fetchProduct';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const LOADING = 'LOADING';
export const IDLE = 'IDLE';
export const ERROR = 'ERROR';

// Errors - LOGIN PAGE
export const ERROR_LOGIN_SUBMIT = 'Username or Password entered is wrong!';
export const ERROR_LOGIN_EMAIL = 'Username format is incorrect';

// Extra
export const EMAIL_VALIDATION_PATTERN =
	/^[a-zA-Z][a-zA-Z0-9_-]{4,}@[a-zA-Z0-9]{2,}(\.(com|in|[a-zA-Z0-9]{2,6})){1,3}$/g;
