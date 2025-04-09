import React, {useState} from 'react';
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:7777/auth/register", formData);
            alert(res.data.message);
        } catch (err: any) {
            alert(err.response?.data?.message || "blad przzy rejestracji");
        }
    };

    return (
        <div className="register">
            <form className="register__form" onSubmit={handleSubmit}>
                <h2 className="register__title">Sign up to React-Forum</h2>
                <input
                    className="register__input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    className="register__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className="register__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="register__button">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;