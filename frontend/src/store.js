import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// composeWithDevTools allows for the store to interrface with the redux dev tools extension
// composeWithDevTools gets wrapped around the applyMiddleware funtion in the create store 
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    productTopRatedReducer
} from './reducers/productReducers'

import {
    cartReducer
} from './reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
} from './reducers/orderReducers'


// need to import combineReducers() to use it
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,


})

// cart items localstorage check
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
// console.log(cartItemsFromStorage);

//  user info localstorage check
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
// console.log(userInfoFromStorage);

// shipping address from local storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : []
// console.log(shippingAddressFromStorage);

// payment method from local storage
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : []
// console.log(paymentMethodFromStorage);


// initial state
const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

//  calls thunk so we can dispatch asynchronous actions aka post, put, get
const middleware = [thunk]


// creates the store and runs the reducers, initial state, 
// thunk middleware allows us to call the dispatch function directly so we can make asyncronous requests
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))




export default store

// questions
// 1. what is applyMiddleware
// 2. better knowledge on thunk