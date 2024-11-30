import React, { useState } from 'react';
import Modal from 'react-modal';
import api from './api';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set this for accessibility

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
            await api.post('/auth/register', formData);
            setIsSuccess(true);
            setModalMessage('Registration successful! Redirecting...');
            setIsModalOpen(true);

            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/login'); // Redirect to login page after modal closes
            }, 2000);
        } catch (error) {
            setIsSuccess(false);
            setModalMessage(error.response?.data?.message || 'Registration failed. Please try again.');
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Sign up for free 🥳</h2>
                <p className="text-center text-gray-600 mb-8">You will get 2 video and 10 text testimonial credits for FREE!</p>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm text-gray-700">Agree to terms</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm text-gray-700">Subscribe to newsletter</label>
                    </div>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" type="submit">
                        Signup
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account? <a href="#" className="text-indigo-600">Sign in</a>
                        </p>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/google-logo.png" alt="Google logo" className="w-5 h-5" />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </form>
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

export default Signup;
