import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import GoogleAuthButton from './GoogleAuthButton';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import AuthModal from './AuthModal';
import AuthDivider from './AuthDivider';
import { useAuthModal, useFormValidation } from './authHooks';
import '../../App.css'

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { errors, setErrors, validateEmail, validatePassword } = useFormValidation();
    const { 
        isModalOpen, 
        setIsModalOpen, 
        modalMessage, 
        isSuccess, 
        handleAuthSuccess, 
        handleAuthError 
    } = useAuthModal();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const { data } = await api.get('/auth/verify-token', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                navigate('/dashboard');
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('token');
        }
    };

    const validateForm = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        
        setErrors({
            email: emailError,
            password: passwordError
        });

        return !emailError && !passwordError;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/login', formData);
            handleAuthSuccess(data.token);
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleLogin = async (googleData) => {
        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/google-login', googleData);
            handleAuthSuccess(data.token, 'Google signup successful! Redirecting to dashboard...');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };
console.log(import.meta.env.VITE_GoogleLoginProjectId);
    return (
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome back 👋</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <AuthInput
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                    />

                    <div>
                        <AuthInput
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="Enter your password"
                        />
                        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </Link>
                    </div>

                    <AuthButton isLoading={isLoading}>
                        Login
                    </AuthButton>
                </form>

                <div className="mt-6">
                    <AuthDivider text="Or continue with" />

                    <div className="mt-6">
                        <GoogleAuthButton
                            onSuccess={handleGoogleLogin}
                            onError={handleAuthError}
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>

                <AuthModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isSuccess={isSuccess}
                    message={modalMessage}
                />
            </div>
        </div>
    );
}

export default Login;