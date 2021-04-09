import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route} from "react-router-dom";
import { listProductCategories } from "./actions/productActions.js";
import { signout } from "./actions/userActions.js";
import AdminRoute from "./components/AdminRoute.js";
import LoadingBox from "./components/LoadingBox.js";
import MessageBox from "./components/MessageBox.js";
import PrivateRoute from "./components/PrivateRoute.js";
import SearchBox from "./components/searchBox.js";
import SellerRoute from "./components/sellerRoute.js";
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
import SellerScreen from "./screens/sellerScreen.js";
import SigninScreen from "./screens/signinScreen.js";
import UserEditScreen from "./screens/userEditScreen.js";
import UserListScreen from "./screens/userListScreen.js";

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="row">
                <div>
                <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
                    <Link className="brand" to="/">Kaihonyo</Link>
                </div>
                <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
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
                      {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link className="head" to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link className="head" to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link className="head" to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
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
            <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
            <main>
            <Route path="/seller/:id" component={SellerScreen}></Route>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <AdminRoute path="/product/:id/edit" component={ProductEditScreen} exact></AdminRoute>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <Route path="/search/name/:name?" component={HomeScreen} exact></Route>
              <Route path="/search/category/:category" component={HomeScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={HomeScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={HomeScreen} exact></Route>
              <PrivateRoute path="/orderhistory" component={OrderHistoryScreen}></PrivateRoute>
              <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
              <PrivateRoute path="/payment" component={PaymentMethodScreen}></PrivateRoute>
              <PrivateRoute path="/order/:id" component={OrderScreen}></PrivateRoute>
              <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
              <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
              <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
              <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
              <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
              <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
              <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
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
