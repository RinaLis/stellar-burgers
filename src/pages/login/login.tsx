import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { clearUserError, fetchLoginUser, userErrorSelector } from '@slices';
import { useForm } from '@hooks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(userErrorSelector);

  const { inputValues, handleChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(clearUserError());
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser(inputValues));
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={inputValues.email}
      password={inputValues.password}
      onChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
