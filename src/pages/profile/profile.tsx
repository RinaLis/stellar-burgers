import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { fetchUpdateUser, userDataSelector } from '@slices';
import { useDispatch, useSelector } from '@store';
import { TUser } from '@utils-types';
import { useForm } from '@hooks';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector) as TUser;

  const { inputValues, handleChange, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    inputValues.name !== user?.name ||
    inputValues.email !== user?.email ||
    !!inputValues.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchUpdateUser(inputValues));
    setValues({
      ...user,
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={inputValues}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
