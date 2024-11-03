import React, { useState } from 'react';
import api from '../api';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert('Registration successful');
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
