import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from "react-router-dom";
import { createOrder } from '../actions/orderActions';
import { useEffect } from 'react';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
//
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import "../index.css";

const PlaceOrderScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row">
                <div className="col-md-8 ">
                    <div className="mb-1 bg-light border border-secondary rounded p-2">
                        <h4> <b> shipping</b></h4>
                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {cart.shippingAddress.address},
                        {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                        ,{cart.shippingAddress.country}
                    </div>
                    <div className="mb-1 bg-light border border-secondary rounded p-2">
                        <h4> <b> Payment</b></h4>
                        <strong>Method:</strong> {cart.paymentMethod}
                    </div>
                    <div className="bg-light border border-secondary rounded p-2">
                        <h4> <b> shipping</b></h4>
                        {cart.cartItems.map((item) => (
                            <div className="d-flex mb-1" key={item.product}>
                                <div className="w-25 d-flex justify-content-center" style={{ height: "100px" }}>
                                    <img src={item.image} alt={item.name} className="h-100" />
                                </div>
                                <div className="w-50 d-flex justify-content-center align-items-center"><Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link></div>
                                <div className="w-25 d-flex justify-content-center align-items-center"> {item.qty} x ${item.price} = ${item.qty * item.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4 bg-light border border-secondary rounded p-2" style={{ height: "fit-content" }}>
                    <h3>Order Summary</h3>
                    <div className="d-flex">
                        <div className="w-50">Items.</div>
                        <div className="w-50 text-right">${cart.itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">Shipping adress</div>
                        <div className="w-50 text-right">${cart.shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">Tax</div>
                        <div className="w-50 text-right">${cart.taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">
                            <strong>Order Total</strong>
                        </div>
                        <div className="w-50 text-right">
                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                    <button className="btn btn-warning btn-lg btn-block my-2"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}>Place Order</button>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>} 
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen;
