import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import LoadingBox from "../components/LoadingBox.js"
import MessageBox from "../components/MessageBox.js"

export default function OrderScreen(props) {
    const orderId = props.match.params.Id;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.road}, {cart.shippingAddress.area}
                                    {cart.shippingAddress.town}, {cart.shippingAddress.city}, {cart.shippingAddress.postalcode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
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
                                           {item.qty} x Ksh{item.price} =Ksh{item.qty * item.price}
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
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>Ksh{cart.itemsPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>Ksh{cart.shippingPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total </strong></div>
                                    <div><strong>Ksh{cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} 
                                className="primary block" disabled={cart.cartItems.lenght === 0}>
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