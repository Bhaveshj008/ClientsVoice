import React from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider } from '../../utils/FormContext';
import FormContent from './FormContent';

const FormPage = () => {
  const { spaceName } = useParams();
  return (
    <FormProvider spaceName={spaceName}>
      <FormContent />
    </FormProvider>
  );
};

export default FormPage;