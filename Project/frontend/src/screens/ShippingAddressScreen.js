import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [buildingandfloor, setBuildingAndFloor] = useState(shippingAddress.buildingandfloor);
    const [road, setRoad] = useState(shippingAddress.road);
    const [area, setArea] = useState(shippingAddress.area);
    const [town, setTown] = useState(shippingAddress.town);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, buildingandfloor, road, area, town, city, postalcode })
        );
        props.history.push('/payment');
    };
    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter full name" 
                    value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="buildingandfloor">Building And Floor</label>
                    <input type="text" id="buildingandfloor" 
                    placeholder="Enter name of building and floor number" value={buildingandfloor} 
                    onChange={(e) => setBuildingAndFloor(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="road">Road</label>
                    <input type="text" id="road" placeholder="Enter name of road" 
                    value={road} onChange={(e) => setRoad(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="area">Area</label>
                    <input type="text" id="area" placeholder="Enter Area" 
                    value={area} onChange={(e) => setArea(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="town">Town</label>
                    <input type="text" id="town" placeholder="Enter name of town" 
                    value={town} onChange={(e) => setTown(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter name of city" 
                    value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalcode">PostalCode</label>
                    <input type="text" id="postalcode" placeholder="Enter PostalCode" 
                    value={postalcode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
}