import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from './api';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router
Modal.setAppElement('#root'); // Add this line to avoid accessibility warnings

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            setIsSuccess(true);
            setModalMessage('Login successful! Redirecting to the dashboard...');
            setIsModalOpen(true);

            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/dashboard'); 
            }, 1000);
        } catch (error) {
            setIsSuccess(false);
            setModalMessage(error.response?.data?.message || 'Login failed. Please try again.');
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) return; // If no token, skip validation

            try {
                const { data } = await api.get('/auth/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.success) {
                    navigate('/dashboard');
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.log('Token validation error:', error.response?.data?.message || error.message);
                localStorage.removeItem('token');
            }
        };

        validateToken();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-semibold text-center mb-6">Welcome back 👋</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-gray-700">Remember me</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
                </p>
                <div className="mt-4 text-center">
                    <button
                        className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <span className="flex items-center justify-center">
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="h-5 mr-2"
                            />
                            Login with Google
                        </span>
                    </button>
                </div>
            </div>

            {/* Modal for success/failure message */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="bg-white rounded-lg shadow-lg p-8 w-80 mx-auto mt-20 text-center"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            >
                <h2 className={`text-2xl font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {isSuccess ? 'Success!' : 'Error'}
                </h2>
                <p className="mt-4 text-gray-700">{modalMessage}</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
}

export default Login;
