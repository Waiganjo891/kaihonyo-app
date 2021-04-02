import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route} from "react-router-dom";
import { signout } from "./actions/userActions.js";
import CartScreen from "./screens/cartScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import OrderHistoryScreen from "./screens/OrderHistoryScreens.js";
import OrderScreen from "./screens/orderScreen.js";
import PaymentMethodScreen from "./screens/PaymentMethod.js";
import PlaceOrderScreen from "./screens/placeOrderScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import RegisterScreen from "./screens/Register Screen.js";
import SigninScreen from "./screens/signinScreen.js";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">Kaihonyo</Link>
                </div>
                <div>
                    <Link className="head" to="/cart">Cart
                    {cartItems.length > 0 && (
                      <span className="badge"> {cartItems.length} </span>
                    )}
                    </Link>
                    { userInfo ? (
                        <div className="dropdown">
                      <Link className="head" to="#">
                        {userInfo.name} <i className="fa fa-caret-down"></i>{''} 
                        </Link>
                      <ul className="dropdown-content">
                      <li> <Link to="/orderhistory">Order History</Link> </li>
                        <Link className="head" to="#signout" onClick={signoutHandler}>Sign out</Link>
                      </ul>
                      </div>
                      ) :
                      (
                        <Link className="head" to="/signin">Sign in</Link>
                      )
                    }

                </div>
            </header>
            <main>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/product/:id" component={ProductScreen}></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
              <Route path="/payment" component={PaymentMethodScreen}></Route>
              <Route path="/order/:id" component={OrderScreen}></Route>
              <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="row center">
                All rights reserved
            </footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
