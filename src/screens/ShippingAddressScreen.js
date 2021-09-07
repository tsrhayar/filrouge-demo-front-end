import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, address, city, postalCode, country })
        );
        props.history.push('/payment');
    };

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form onSubmit={submitHandler}>
                <h1>Shipping Adress</h1>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="city ">City</label>
                    <input type="text" className="form-control"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode ">Postal Code</label>
                    <input type="text" className="form-control"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Continue</button>
            </form>
        </div>
    )
}

export default ShippingAddressScreen
