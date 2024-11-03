import React, { useState } from 'react';
import api from '../api';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
