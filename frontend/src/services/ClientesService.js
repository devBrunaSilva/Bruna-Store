import HttpClient from './utils/HttpClient';

class ClientesServive {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listClientes() {
    return this.httpClient.get('/clientes');
  }

  async createCliente(cliente) {
    return this.httpClient.post('/clientes', cliente);
  }
}

export default new ClientesServive();
