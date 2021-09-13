import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order) {
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady]);

    const successPaymentHnadler = () => {
        // TODO: dispatch pay order
    };
    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row">
                <div className="col-8">
                    <div className="mb-1 bg-light border border-secondary rounded p-2">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Address: </strong> {order.shippingAddress.address},
                            {order.shippingAddress.city},{' '}
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <MessageBox variant="success">
                                Delivered at {order.deliveredAt}
                            </MessageBox>
                        ) : (
                            <MessageBox variant="danger">Not Delivered</MessageBox>
                        )}
                    </div>
                    <div className="mb-1 bg-light border border-secondary rounded p-2">
                        <h2>Payment</h2>
                        <p>
                            <strong>Method:</strong> {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <MessageBox variant="success">
                                Paid at {order.paidAt}
                            </MessageBox>
                        ) : (
                            <MessageBox variant="danger">Not Paid</MessageBox>
                        )}
                    </div>
                    <div className="mb-1 bg-light border border-secondary rounded p-2">
                        <h2>Order Items</h2>
                        {order.orderItems.map((item) => (
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
                    <h2>Order Summary</h2>
                    <div className="d-flex">
                        <div className="w-50">Items</div>
                        <div className="w-50 text-right">${order.itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">Shipping</div>
                        <div className="w-50 text-right">${order.shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">Tax</div>
                        <div className="w-50 text-right">${order.taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div className="w-50">
                            <strong> Order Total</strong>
                        </div>
                        <div className="w-50 text-right">
                            <strong>${order.totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                    {!order.isPaid && (
                        <div>
                            {!sdkReady ? (
                                <LoadingBox></LoadingBox>
                            ) : (
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHnadler}
                                ></PayPalButton>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// import Axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { PayPalButton } from 'react-paypal-button-v2';
// import { detailsOrder } from '../actions/orderActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

// const OrderScreen = (props) => {

//     const orderId = props.match.params.id;
//     const [sdkReady, setSdkReady] = useState(false);
//     const orderDetails = useSelector((state) => state.orderDetails);
//     const { order, loading, error } = orderDetails;
//     const dispatch = useDispatch();
//     useEffect(() => {
//         const addPayPalScript = async () => {
//             const { data } = await Axios.get('/api/config/paypal');
//             const script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
//             script.async = true;
//             script.onload = () => {
//                 setSdkReady(true);
//             };
//             document.body.appendChild(script);
//         };
//         if (!order) {
//             dispatch(detailsOrder(orderId));
//         } else {
//             if (!order.isPaid) {
//                 if (!window.paypal) {
//                     addPayPalScript();
//                 } else {
//                     setSdkReady(true);
//                 }
//             }
//         }
//     }, [dispatch, order, orderId, sdkReady]);

//     const successPaymentHnadler = () => {
//         // TODO: dispatch pay order
//     };


//     return loading ? (
//         <LoadingBox></LoadingBox>
//     ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//     ) : (
//         <div>
//             <h1>Order {order._id}</h1>
//             <div className="row">
//                 <div className="col-md-8 ">
//                     <div className="mb-1 bg-light border border-secondary rounded p-2">
//                         {/* <h4> <b> shipping</b></h4> */}
//                         <h2>Shipping</h2>
//                         <strong>Name:</strong> {order.shippingAddress.fullName} <br />
//                         <strong>Address: </strong> {order.shippingAddress.address},
//                         {order.shippingAddress.city},
//                         {order.shippingAddress.postalCode},
//                         {order.shippingAddress.country}
//                         {order.isDelivered ? (
//                             <MessageBox variant="success">
//                                 Delivered at {order.deliveredAt}
//                             </MessageBox>
//                         ) : (
//                             <MessageBox variant="danger">Not Delivered</MessageBox>
//                         )}
//                     </div>
//                     <div className="mb-1 bg-light border border-secondary rounded p-2">
//                         {/* <h4> <b> Payment</b></h4> */}
//                         <h2>Payment</h2>
//                         <strong>Method:</strong> {order.paymentMethod}
//                         {order.isPaid ? (
//                             <MessageBox variant="success">
//                                 Paid at {order.paidAt}
//                             </MessageBox>
//                         ) : (
//                             <MessageBox variant="danger">Not Paid</MessageBox>
//                         )}
//                     </div>
//                     <div className="bg-light border border-secondary rounded p-2">
//                         {/* <h4> <b> shipping</b></h4> */}
//                         <h2>Order Items</h2>
//                         {order.orderItems.map((item) => (
//                             <div className="d-flex mb-1" key={item.product}>
//                                 <div className="w-25 d-flex justify-content-center" style={{ height: "100px" }}>
//                                     <img src={item.image}
//                                         alt={item.name} className="h-100" />
//                                 </div>
//                                 <div className="w-50 d-flex justify-content-center align-items-center"><Link to={`/product/${item.product}`}>
//                                     {item.name}
//                                 </Link></div>
//                                 <div className="w-25 d-flex justify-content-center align-items-center"> {item.qty} x ${item.price} = ${item.qty * item.price}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="col-md-4 bg-light border border-secondary rounded p-2" style={{ height: "fit-content" }}>
//                     {/* <h3>Order Summary</h3> */}
//                     <h2>Order Summary</h2>
//                     <div className="d-flex">
//                         <div className="w-50">Items.</div>
//                         <div className="w-50 text-right">${order.itemsPrice.toFixed(2)}</div>
//                     </div>
//                     <div className="d-flex">
//                         <div className="w-50">Shipping</div>
//                         <div className="w-50 text-right">${order.shippingPrice.toFixed(2)}</div>
//                     </div>
//                     <div className="d-flex">
//                         <div className="w-50">Tax</div>
//                         <div className="w-50 text-right">${order.taxPrice.toFixed(2)}</div>
//                     </div>
//                     <div className="d-flex">
//                         <div className="w-50">
//                             <strong>Order Total</strong>
//                         </div>
//                         <div className="w-50 text-right">
//                             <strong>${order.totalPrice.toFixed(2)}</strong>
//                         </div>
//                     </div>
//                     {!order.isPaid && (
//                         <div>
//                             {!sdkReady ? (
//                                 <LoadingBox></LoadingBox>
//                             ) : (
//                                 <PayPalButton
//                                     amount={order.totalPrice}
//                                     onSuccess={successPaymentHnadler}
//                                 ></PayPalButton>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )



// }

// export default OrderScreen;
