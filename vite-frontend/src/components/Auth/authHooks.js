import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthModal = (redirectPath = '/dashboard') => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = (token, message = 'Login successful! Redirecting to dashboard...') => {
    localStorage.setItem('token', token);
    setIsSuccess(true);
    setModalMessage(message);
    setIsModalOpen(true);
    
    setTimeout(() => {
      setIsModalOpen(false);
      navigate(redirectPath);
    }, 1500);
  };

  const handleAuthError = (error) => {
    setIsSuccess(false);
    setModalMessage(error.response?.data?.message || 'Authentication failed. Please try again.');
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    modalMessage,
    isSuccess,
    handleAuthSuccess,
    handleAuthError
  };
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    return '';
  };

  const validateName = (name) => {
    if (!name) {
      return 'Name is required';
    }
    return '';
  };

  return {
    errors,
    setErrors,
    validateEmail,
    validatePassword,
    validateName
  };
};