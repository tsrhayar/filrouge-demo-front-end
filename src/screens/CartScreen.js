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
    <div className="cart-page-container">
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty! <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <>
          <div className="cart-image-info-container ">
            {cartItems.map((item,index) =>
              <div className="cart-image-info pb-2" key={index}>
                <div className="part-1">
                  <div className="cart-product-image">
                    <Link to={`/product/${item.product}`} >
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className="cart-product-name">
                    <Link
                      className="cart-product-name text-dark text-decoration-none"
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                </div>
                <div className="part-2">
                  <div className="cart-product-qty">
                    <input
                      className="w-75"
                      type="number"
                      defaultValue={item.qty}
                      min="1"
                      max={item.countInStock}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    />
                  </div>
                  <div className="cart-product-price">{item.price}.00 Dh</div>
                  <div className="cart-delete-btn">
                    <button
                      className="btn btn-danger" type="button"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cart-checkout">
            <h4>SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)})</h4>
            <button className="btn btn-warning" type="button"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0} >
              Poccedd to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
