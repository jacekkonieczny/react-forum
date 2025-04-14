import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:7777/auth/login", formData);
            const {message, token, user} = res.data;
            login(user, token);
            navigate("/");
            alert(`${message} token: ${token} user: ${JSON.stringify(user)}`);
        } catch (err: any) {
            alert(err.response?.data?.message || "blad przzy logowaniu");
        }
    };

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Login to React-Forum</h2>
                <input
                    className="login__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className="login__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
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