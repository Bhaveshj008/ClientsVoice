import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const GoogleAuthButton = ({ onSuccess, onError, isLoading, buttonText = "Continue with Google" }) => {
    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();
            
            // Return user data to parent component
            onSuccess({
                token: idToken,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            });
        } catch (error) {
            onError(error.message || 'Google authentication failed');
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
            <img src="/icons8-google.svg" alt="Google" className="h-5 w-5 mr-2" />
            {isLoading ? 'Loading...' : buttonText}
        </button>
    );
};

export default GoogleAuthButton;