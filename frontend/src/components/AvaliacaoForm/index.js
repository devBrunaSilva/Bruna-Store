import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import Button from '../Button';
import Input from '../Input';

export default function AvaliacaoForm({ buttomLabel }) {
  return (
    <Form>
      <FormGroup>
        <Select>
          <option value="default" disabled>Selecione</option>
          <option value="cliente">José da Silva</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Select>
          <option value="default" disabled>Produto</option>
          <option value="produtos">Coca Cola</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Pontuação"
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Comentário"
        />
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">
          {buttomLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

AvaliacaoForm.propTypes = {
  buttomLabel: PropTypes.string.isRequired,
};
