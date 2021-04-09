import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer.js";
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, 
    orderPayReducer } from "./reducers/orderReducers.js";
import {productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, 
    productListReducer, productReviewCreateReducer, productUpdateReducer } from "./reducers/productReducers.js";
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, 
    userUpdateProfileReducer, userUpdateReducer} from "./reducers/userReducer.js";
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productReviewCreate: productReviewCreateReducer,
});
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;