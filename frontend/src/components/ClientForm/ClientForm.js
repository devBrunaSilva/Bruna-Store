import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { ButtonContainer, Form } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

export default function ClientForm({ buttomLabel }) {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const {
    setError,
    removeError,
    getErrorMessageByFieldNome,
    errors,
  } = useErrors();

  const handleNomeChange = (event) => {
    setNome(event.target.value);

    if (!event.target.value) {
      setError({ field: 'nome', message: 'O nome é obrigatório' });
    } else {
      removeError('nome');
    }
  };

  const handleEnderecoChange = (event) => {
    setEndereco(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(formatPhone(event.target.value));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  };

  const isFormValid = (nome && errors.length === 0);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log({
    //   nome,
    //   endereco,
    //   telefone,
    //   email,
    // });
  };
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldNome('nome')}>
        <Input
          error={getErrorMessageByFieldNome('nome')}
          placeholder="Nome *"
          value={nome}
          onChange={handleNomeChange}

        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Endereço"
          value={endereco}
          onChange={handleEnderecoChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={handleTelefoneChange}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldNome('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldNome('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttomLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ClientForm.propTypes = {
  buttomLabel: PropTypes.string.isRequired,
};
