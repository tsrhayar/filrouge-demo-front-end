import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import "./style.css"
// import "./index.css"
import AdminRoute from './components/AdminRoute';
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from './screens/ProductEditScreen';
import RegistreScreen from "./screens/RegistreScreen";
import { signout } from "./actions/userActions";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from './screens/ProductListScreen';
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
        <header className="bg-light mb-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light container">
            <Link className="navbar-brand" to="/">
              Fakhar Asfi
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <Link className="nav-item nav-link mx-1" to="/cart">
                  Panier  {cartItems.length > 0 && <span className="badge badge-dark">{cartItems.length}</span>}
                </Link>
                {
                  userInfo ? (

                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {userInfo.name}
                      </Link>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: "auto", right: 0 }}>
                        <Link className="dropdown-item" to="/profile">User Profile</Link>
                        <Link className="dropdown-item" to="/orderhistory">Order History</Link>
                        <Link className="dropdown-item" to="/" onClick={signoutHandler}>D??connexion</Link>
                      </div>
                    </li>
                  ) : (
                    <Link className="nav-item nav-link mx-1" to="/signin">Connectez</Link>
                  )
                }
                {userInfo && userInfo.isAdmin && (
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Admin
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: "auto", right: 0 }}>
                      <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                      <Link className="dropdown-item" to="/productlist">Products</Link>
                      <Link className="dropdown-item" to="/orderlist">Orders</Link>
                      <Link className="dropdown-item" to="/userlist">Users </Link>
                    </div>
                  </li>
                )}

              </div>
            </div>
          </nav>
        </header>
        <main className="container " >
          <Route path="/cart/:id?" component={CartScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/registre" component={RegistreScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>

          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="bg-light text-dark text-center">
          footer
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
