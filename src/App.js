import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import "./style.css"
// import "./index.css"

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegistreScreen from "./screens/RegistreScreen";
import { signout } from "./actions/userActions";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

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
                      <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {userInfo.name}
                      </Link>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: "auto", right: 0 }}>
                        <Link className="dropdown-item" to="#" onClick={signoutHandler}>Déconnexion</Link>
                      </div>
                    </li>
                  ) : (
                    <Link className="nav-item nav-link mx-1" to="/signin">Connectez</Link>
                  )
                }

              </div>
            </div>
          </nav>
        </header>
        <main className="container " >
          <Route path="/cart/:id?" component={CartScreen} exact></Route>
          <Route path="/product/:id?" component={ProductScreen}></Route>
          <Route path="/registre" component={RegistreScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
        </main>

        <footer className="bg-light text-dark text-center">
footer        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
