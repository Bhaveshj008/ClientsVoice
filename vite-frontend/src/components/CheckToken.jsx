import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const CheckToken = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                console.warn('No token found, redirecting to login.');
                localStorage.removeItem('token'); // Remove token if somehow it exists in an invalid state
                window.location.href = '/'; // Redirect to login page
                return; 
            }

            try {
                const { data } = await api.get('/auth/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.success) {
                  
                } else {
                    console.warn('Token is invalid. Redirecting to login.');
                    localStorage.removeItem('token'); // Remove invalid token
                    window.location.href = '/'; // Redirect to login page
                }
            } catch (error) {
                console.error('Error during token verification:', error.response?.data || error.message);
                localStorage.removeItem('token'); // Handle invalid or expired token
                window.location.href = '/'; // Redirect to login page
            }
        };

        verifyToken();
    }, [token, navigate]);

    return ;
};

export default CheckToken;
