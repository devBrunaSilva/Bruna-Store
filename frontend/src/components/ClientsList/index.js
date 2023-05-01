import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';
// import Modal from '../Modal';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
// import Loader from '../Loader';

export default function ClientsList() {
  return (
    <Container>

      {/* <Loader /> */}

      {/* <Modal
        danger
      /> */}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome" />
      </InputSearchContainer>

      <Header>
        <strong>3 Clientes</strong>
        <Link to="/newClient">Novo cliente</Link>
      </Header>

      <ListContainer>
        <header>
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </header>

        <Card>
          <div className="info">
            <strong> Maria De Lourdes</strong>
            <span>Av. das Flores</span>
            <span>(73) 99887-9999</span>
            <span>mariazinha@gmail.com</span>
          </div>

          <div className="action">
            <Link to="/editClient/123">
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}
