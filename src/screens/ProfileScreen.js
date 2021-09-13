import React, { useEffect, useState } from 'react'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }
        , [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
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
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && (
                            <MessageBox variant="danger">{errorUpdate}</MessageBox>
                        )}
                        {successUpdate && (
                            <MessageBox variant="success">
                                Profile Updated Successfully
                            </MessageBox>
                        )}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control"
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input className="form-control"
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Password</label>
                            <input className="form-control"
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Confirm Password</label>
                            <input className="form-control"
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)} />
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
