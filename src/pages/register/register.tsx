import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '@store';
import { clearUserError, fetchRegisterUser, userErrorSelector } from '@slices';
import { useForm } from '@hooks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(userErrorSelector);

  const { inputValues, handleChange } = useForm({
    email: '',
    name: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(inputValues));
  };

  useEffect(() => {
    dispatch(clearUserError());
  });

  return (
    <RegisterUI
      errorText={error?.toString()}
      email={inputValues.email}
      userName={inputValues.name}
      password={inputValues.password}
      onChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
