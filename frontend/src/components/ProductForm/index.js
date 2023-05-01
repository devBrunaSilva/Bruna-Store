import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';

export default function ProductForm({ buttomLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Descrição" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Preco" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Fabricante" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Estoque" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="default" disabled>Selecione</option>
          <option value="alimentosebebidas">Alimentos e Bebidas</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">
          {buttomLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ProductForm.propTypes = {
  buttomLabel: PropTypes.string.isRequired,
};
