import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import GoogleAuthButton from './GoogleAuthButton';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import AuthModal from './AuthModal';
import AuthDivider from './AuthDivider';
import { useAuthModal, useFormValidation } from './authHooks';
import '../../App.css'

function Signup() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '',
        agreeToTerms: false,
        subscribeNewsletter: false 
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { errors, setErrors, validateEmail, validatePassword, validateName } = useFormValidation();
    const { 
        isModalOpen, 
        setIsModalOpen, 
        modalMessage, 
        isSuccess, 
        handleAuthSuccess, 
        handleAuthError 
    } = useAuthModal('/login');

    const validateForm = () => {
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const termsError = !formData.agreeToTerms ? 'You must agree to the terms' : '';
        
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
            terms: termsError
        });

        return !nameError && !emailError && !passwordError && !termsError;
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await api.post('/auth/register', formData);
            handleAuthSuccess(null, 'Registration successful! Redirecting to login...');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async (googleData) => {
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Sign up for free 🥳</h2>
                <p className="text-center text-gray-600 mb-8">
                    You will get 2 video and 10 text testimonial credits for FREE!
                </p>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <AuthInput
                        type="text"
                        name="name"
                        label="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Name"
                        required
                    />

                    <AuthInput
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Email"
                        required
                    />

                    <AuthInput
                        type="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Password"
                        required
                    />

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mr-2" 
                            />
                            <label className="text-sm text-gray-700">
                                I agree to the{' '}
                                <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="text-sm text-red-600">{errors.terms}</p>
                        )}
                        
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                name="subscribeNewsletter"
                                checked={formData.subscribeNewsletter}
                                onChange={handleChange}
                                className="mr-2" 
                            />
                            <label className="text-sm text-gray-700">
                                Subscribe to our newsletter for updates and tips
                            </label>
                        </div>
                    </div>

                    <AuthButton isLoading={isLoading}>
                        Sign up
                    </AuthButton>

                    <AuthDivider text="Or sign up with" />

                    <div className="mt-6">
                        <GoogleAuthButton
                            onSuccess={handleGoogleSignup}
                            onError={handleAuthError}
                            isLoading={isLoading}
                        />
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </form>

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

export default Signup;