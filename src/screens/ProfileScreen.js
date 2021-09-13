import React, { useEffect } from 'react'
import { detailsUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const ProfileScreen = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    useEffect(() => { dispatch(detailsUser(userInfo._id)); }
        , [dispatch, userInfo._id]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1>User profile</h1>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control"
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={user.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input className="form-control"
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={user.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Password</label>
                            <input className="form-control"
                                id="password"
                                type="password"
                                placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Confirm Password</label>
                            <input className="form-control"
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}

            </form>
        </div>
    )
}

export default ProfileScreen
