import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route} from "react-router-dom";
import { signout } from "./actions/userActions.js";
import AdminRoute from "./components/AdminRoute.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CartScreen from "./screens/cartScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import OrderHistoryScreen from "./screens/OrderHistoryScreens.js";
import OrderListScreen from "./screens/orderListScreen.js";
import OrderScreen from "./screens/orderScreen.js";
import PaymentMethodScreen from "./screens/PaymentMethod.js";
import PlaceOrderScreen from "./screens/placeOrderScreen.js";
import ProductEditScreen from "./screens/productEditScreen.js";
import ProductListScreen from "./screens/productListScreens.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/profileScreen.js";
import RegisterScreen from "./screens/Register Screen.js";
import SigninScreen from "./screens/signinScreen.js";
import UserListScreen from "./screens/userListScreen.js";

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
                      <li> <Link className="head" to="/profile">User Profile</Link> </li>
                      <li> <Link className="head" to="/orderhistory">Order History</Link> </li>
                      <li><Link className="head" to="#signout" onClick={signoutHandler}>Sign out</Link> </li>
                      </ul>
                      </div>
                      ) :
                      (
                        <Link className="head" to="/signin">Sign in</Link>
                      )}
                    {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link className="head" to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link className="head" to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link className="head" to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link className="head" to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
                </div>
            </header>
            <main>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <AdminRoute path="/product/:id/edit" component={ProductEditScreen} exact></AdminRoute>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <PrivateRoute path="/orderhistory" component={OrderHistoryScreen}></PrivateRoute>
              <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
              <PrivateRoute path="/payment" component={PaymentMethodScreen}></PrivateRoute>
              <PrivateRoute path="/order/:id" component={OrderScreen}></PrivateRoute>
              <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
              <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
              <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
              <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
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
