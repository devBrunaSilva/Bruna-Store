CREATE DATABASE palmastore;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categorias (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
  id_produto UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  fabricante VARCHAR(50) NOT NULL,
  estoque INT NOT NULL,
  id_categoria UUID,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS clientes (
  id_cliente UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  endereco TEXT NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  id_cliente UUID,
  data_pedido DATE NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  status VARCHAR NOT NULL,
  CHECK (status in ('pendente', 'aprovado', 'cancelado')),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
  id_itens_pedido UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  id_pedido UUID,
  id_produto UUID,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id_avaliacao UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  id_cliente UUID,
  id_produto UUID,
  pontuacao INT NOT NULL,
  comentario TEXT,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
