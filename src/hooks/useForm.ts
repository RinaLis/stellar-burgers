import React, { Dispatch, SetStateAction, useState } from 'react';

export function useForm<S>(initialValues: S | (() => S)): {
  inputValues: S;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<S>>;
} {
  const [inputValues, setValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...inputValues, [name]: value });
  };

  return { inputValues, handleChange, setValues };
}
