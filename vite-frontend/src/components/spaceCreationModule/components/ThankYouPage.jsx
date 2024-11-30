import React, {useContext} from 'react';
import { FormContext } from '../utils/FormContext';

function ThankYouPage() {
  const { formConfig } = useContext(FormContext);
  return (
    <div className="flex-1 bg-white p-4 border border-gray-300 rounded-lg shadow-md text-center">
    <h2 className="text-lg font-semibold mb-4">{formConfig.spaceName}</h2>
      <h1 className="text-3xl font-bold text-gray-700">Thank You!</h1>
      <p className="text-gray-500 mt-4">We appreciate your feedback.</p>
    </div>
  );
}

export default ThankYouPage;
