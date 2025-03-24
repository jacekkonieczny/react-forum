import React from 'react';

const Register = () => {
    return (
        <div className="register">
            <form className="register__form">
                <h2 className="register__title">Sign up to React-Forum</h2>
                <input className="register__input" type="text" placeholder="Username"/>
                <input className="register__input" type="email" placeholder="Email"/>
                <input className="register__input" type="password" placeholder="Password"/>
                <button type="submit" className="register__button">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;