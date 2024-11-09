import React, { useContext } from "react";
import FeedbackForm from './FeedbackForm'; // Import FeedbackForm component
import TestimonialForm from './TestimonialForm';
import ThankYouPage from './ThankYouPage';
import { FormContext } from '../utils/FormContext';

function MainContainer() {
    const { activeForm, initializeForm } = useContext(FormContext);

    const handleFormChange = (formType) => {
        initializeForm(formType); // Initialize form config based on the selected form type
    };

    return (
        <div className="flex-1 bg-white p-4">
           <div className="flex border-b border-gray-300 mb-4">
    <button
        className={`flex-grow px-4 py-2 text-sm font-semibold transition duration-200 text-center ${activeForm === 'feedback' ? 'bg-gray-200' : ''}`}
        onClick={() => handleFormChange('feedback')}
    >
        Feedback Form
    </button>
    <button
        className={`flex-grow px-4 py-2 text-sm font-semibold transition duration-200 text-center ${activeForm === 'testimonial' ? 'bg-gray-200' : ''}`}
        onClick={() => handleFormChange('testimonial')}
    >
        Testimonial Form
    </button>
    <button
        className={`flex-grow px-4 py-2 text-sm font-semibold transition duration-200 text-center ${activeForm === 'thankYou' ? 'bg-gray-200' : ''}`}
        onClick={() => handleFormChange('thankYou')}
    >
        Thank You Page
    </button>
</div>


            <div className="flex justify-center text-gray-500">
                {activeForm === 'feedback' && <FeedbackForm />}
                {activeForm === 'testimonial' && <TestimonialForm />}
                {activeForm === 'thankYou' && <ThankYouPage />}
            </div>
        </div>
    );
}

export default MainContainer;
