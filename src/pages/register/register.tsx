import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { clearUserError, fetchRegisterUser, userErrorSelector } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(userErrorSelector);
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, name, password }));
  };

  useEffect(() => {
    dispatch(clearUserError());
  });

  return (
    <RegisterUI
      errorText={error?.toString()}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
