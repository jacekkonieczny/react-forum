import React from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <form className="login__form">
                <h2 className="login__title">Login to React-Forum</h2>
                <input className="login__input" type="email" placeholder="Email"/>
                <input className="login__input" type="password" placeholder="Password"/>
                <button type="submit" className="login__button">Login</button>
                <Link className="login__link" to="/register">
                    Don't have an account?
                    <span> Sign Up</span>
                </Link>
            </form>
        </div>
    );
};

export default Login;