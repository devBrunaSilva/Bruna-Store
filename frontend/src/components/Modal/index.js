import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({ danger }) {
  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do Modal</h1>
        <p>
          Corpo do Modal
        </p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button" danger={danger}>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
