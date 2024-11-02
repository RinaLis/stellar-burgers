import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '@hooks';

export const ForgotPassword: FC = () => {
  const [error, setError] = useState<Error | null>(null);

  const { inputValues, handleChange } = useForm({
    email: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi(inputValues)
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={inputValues.email}
      onChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
