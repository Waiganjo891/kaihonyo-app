import Axios from "axios"
import { CART_ADD_ITEM, CART_REDUCE_ITEM, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstant.js";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            seller: data.seller,
            qty,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  };

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REDUCE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};