import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';

const RegistreScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1 className="text-center">Inscription</h1>
                <div className="d-flex justify-content-center">
                    {loading && <LoadingBox className="m-auto"></LoadingBox>}
                </div>
                {error && (<div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
                )}
                <div className="form-group">
                    <label htmlFor="nameInput">Nom d'utilisateur</label>
                    <input type="text" className="form-control" id="nameInput" autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Mot de passe</label>
                    <input type="password" className="form-control" id="passwordInput" autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInputConfirm">Mot de passe</label>
                    <input type="password" className="form-control" id="passwordInputConfirm" autoComplete="off"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Inscription</button>
                <div>
                    <label className="mt-2" />
                    <small>vous aves pas un compte ?</small>
                    <br />
                    <Link to={`/signin?redirect=${redirect}`}>S'inscrire</Link>
                </div>
            </form>
        </div>
    )
}

export default RegistreScreen
