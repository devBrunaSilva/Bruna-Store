import ReactDOM from 'react-dom';
import { Overlay } from './styles';

export default function Loader() {
  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    container,
  );
}
