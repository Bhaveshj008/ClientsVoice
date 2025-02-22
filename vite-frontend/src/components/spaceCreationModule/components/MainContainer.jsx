import React, { useContext } from "react";
import FeedbackForm from './FeedbackForm';
import TestimonialForm from './TestimonialForm';
import ThankYouPage from './ThankYouPage';
import { FormContext } from '../utils/FormContext';

const formComponents = {
    feedback: FeedbackForm,
    testimonial: TestimonialForm,
    thankYou: ThankYouPage,
};

function MainContainer() {
    const { activeForm, initializeForm, isGenerating } = useContext(FormContext);
    const ActiveFormComponent = formComponents[activeForm] || null;

    const buttons = [
        { type: 'feedback', label: 'Feedback Form' },
        { type: 'testimonial', label: 'Testimonial Form' },
        { type: 'thankYou', label: 'Thank You Page' }
    ];

    return (
        <div className="flex-1  p-6  shadow-xl">
            <div className="flex border-b border-gray-700 mb-6">
                {buttons.map(({ type, label }) => (
                    <button
                        key={type}
                        className={`flex-grow px-6 py-3 text-sm font-semibold text-center text-white transition duration-200  ${
                            activeForm === type
                                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
                                : 'bg-gray-800 hover:bg-gray-600'
                        }`}
                        onClick={() => initializeForm(type)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="flex justify-center items-center text-gray-400">
                {isGenerating ? (
                     <div className="flex flex-col items-center">
                  <div className="text-5xl font-extrabold text-white mb-4">Generating form, please wait...</div>
                   
                </div>
                ) : (
                    ActiveFormComponent && <ActiveFormComponent />
                )}
            </div>
        </div>
    );
}

export default MainContainer;
