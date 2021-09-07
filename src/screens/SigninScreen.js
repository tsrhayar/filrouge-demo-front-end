import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';

const SigninScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const redirect = props.location.search ?
        props.location.search.split("=")[1] : "/";

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1 className="text-center">Connexion</h1>
                <div className="d-flex justify-content-center">
                    {loading && <LoadingBox className="m-auto"></LoadingBox>}
                </div>
                {error && (<div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
                )}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Mot de passe</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
                <div>
                    <label className="mt-2" />
                    <small>vous aves pas un compte ?</small>
                    <br />
                    <Link to={`/registre?redirect=${redirect}`}>S'inscrire</Link>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
