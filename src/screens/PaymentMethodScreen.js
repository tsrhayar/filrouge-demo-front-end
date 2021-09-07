import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'
// import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

const PaymentMethodScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
      }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal" className="form-check-label">PayPal</label>
                    </div>
                </div>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe" className="form-check-label">Stripe</label>
                    </div>
                </div>
                <div>
                    <label />
                    <button className="btn btn-primary mt-2" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodScreen
