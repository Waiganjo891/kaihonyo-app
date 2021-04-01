import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress.area) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Equity');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                <div>
                    <input type="radio" id="equity" value="Equity" name="paymentMethod" 
                    required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="equity"> Equity</label>
                </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}