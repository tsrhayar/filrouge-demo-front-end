import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div>
            <h1>Order History</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">DATE</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">PAID</th>
                            <th scope="col">DELIVERED</th>
                            <th scope="col">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <th scope="row">{order._id}</th>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>$ {order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>{order.isDelivered
                                    ? order.deliveredAt.substring(0, 10)
                                    : 'No'}</td>
                                <td><button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        props.history.push(`/order/${order._id}`);
                                    }}
                                >
                                    Details
                                </button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrderHistoryScreen
