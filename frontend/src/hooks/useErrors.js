import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const jaExisteErro = errors.find((error) => error.field === field);

    if (jaExisteErro) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(field) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  }

  function getErrorMessageByFieldNome(fieldNome) {
    return errors.find((error) => error.field === fieldNome)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldNome,
  };
}
