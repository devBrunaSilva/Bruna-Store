/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundCliente,
} from './styles';
// import Modal from '../Modal';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../Loader';
import Button from '../Button';

import ClientesService from '../../services/ClientesService';

export default function ClientsList() {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [hasError, setHasError] = useState(false);

  const clientesBuscado = useMemo(() => clientes.filter((cliente) => (
    cliente.nome.toLowerCase().includes(search.toLowerCase())
  )), [clientes, search]);

  const loadClientes = useCallback(async () => {
    try {
      setIsLoader(true);

      const clienteList = await ClientesService.listClientes();

      // const clienteList = []; await ClientesService.listClientes();
      setHasError(false);
      setClientes(clienteList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoader(false);
    }
  }, []);

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleTryAgain = () => {
    loadClientes();
  };
  return (
    <Container>

      {isLoader && <Loader />}

      {/* <Modal
        danger
      /> */}

      {clientes.length > 0 && (
        <InputSearchContainer>
          <input
            placeholder="Pesquise pelo nome"
            value={search}
            onChange={handleChangeSearch}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              clientes.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >

        {(!hasError && clientes.length > 0) && (
          <strong>
            {clientesBuscado.length}
            {clientesBuscado.length === 1 ? ' cliente' : ' clientes'}
          </strong>
        )}
        <Link to="/newClient">Novo cliente</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus clientes</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(clientes.length < 1 && !isLoader) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>&ldquo;Novo contato&rdquo;</strong>   à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(clientes.length > 0 && clientesBuscado.length < 1) && (
            <SearchNotFoundCliente>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <span>
                Nenhum resultado foi encontrado para <strong>`{search}`</strong>.
              </span>
            </SearchNotFoundCliente>
          )}

          {(clientesBuscado.length > 0) && (
          <ListContainer>
            <header>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </header>

            {clientesBuscado.map((cliente) => (
              <Card key={cliente.id_cliente}>
                <div className="info">
                  <strong>{cliente.nome}</strong>
                  <span>{cliente.endereco}</span>
                  <span>{cliente.telefone}</span>
                  <span>{cliente.email}</span>
                </div>

                <div className="action">
                  <Link to={`/edit/${cliente.id_cliente}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                </div>
              </Card>
            ))}
          </ListContainer>
          )}
        </>
      )}
    </Container>
  );
}
