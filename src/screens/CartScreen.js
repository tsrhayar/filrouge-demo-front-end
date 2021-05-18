import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty! <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img className="small" src={item.image} alt={item.name} />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <input
                      type="number"
                      defaultValue={item.qty}
                      min="1"
                      max={item.countInStock}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    />
                  </div>
                  <div>$ {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)})</h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
