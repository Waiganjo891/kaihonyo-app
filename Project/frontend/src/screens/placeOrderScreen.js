import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { ORDER_CREATE_RESET } from "../constants/orderConstants.js";
import LoadingBox from "../components/LoadingBox.js"
import MessageBox from "../components/MessageBox.js"

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
      }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.totalPrice = cart.itemsPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart, orderItems: cart.cartItems }));
    };
    useEffect(() =>{
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                <Link to="/payment"><strong>Back</strong></Link>
                    <ul>
                    <li>
              <div className="card card-body">
                <p>
                  <strong>Pay using:</strong> {cart.paymentMethod}
                </p>
              </div>
              </li>
                        <li>
                            <div className="card card-body">
                                <h2>Product list</h2>
                                <ul>
                        {cart.cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"></img>
                                        </div>
                                        <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                           {item.qty} x Ksh{item.price.toLocaleString("ksh")} =Ksh{(item.qty * item.price).toLocaleString("ksh")}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div><strong>Product price </strong></div>
                                 <div className="price">Ksh {cart.totalPrice.toLocaleString("ksh")}</div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} 
                                className="primary block" disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}