const { Router } = require('express');

const AvaliacaoController = require('./app/controllers/AvaliacaoController');
const CategoriaController = require('./app/controllers/CategoriaController');
const ClienteController = require('./app/controllers/ClienteController');
const PedidoController = require('./app/controllers/PedidoController');
const ProdutoController = require('./app/controllers/ProdutoController');

const router = Router();

// Adicionar cliente
router.post('/clientes', ClienteController.store); // OK

// Listar clientes
router.get('/clientes', ClienteController.index); // OK

// Listar UM cliente por ID
router.get('/clientes/:id', ClienteController.show); // OK

// Listar UM cliente por Nome
router.get('/clientes/nome/:nome', ClienteController.showByNome); // OK

// Editar cliente
router.put('/clientes/:id', ClienteController.update); // OK

/** ---------------------------------------------- */

// adicionar pedido
router.post('/pedidos', PedidoController.store); // OK

// Listar pedidos
router.get('/pedidos', PedidoController.index); // OK

// Listar UM pedido
router.get('/pedidos/:id', PedidoController.show); // OK

/** --------------------------------------------- */

// Adicionar produtos
router.post('/produtos', ProdutoController.store);

// Listar produtos
router.get('/produtos', ProdutoController.index);

// Listar produtos por id
router.get('/produtos/:id', ProdutoController.show);

// Listar produtos por nome
router.get('/produtos/nome/:nome', ProdutoController.showByNome);

// Editar produtos
router.patch('/produtos/:pedidoId', ProdutoController.update); // ok

/** ------------------------------------------- */

// Adicionar categoria
router.post('/categorias', CategoriaController.store); // Ok

// Listar categorias
router.get('/categorias', CategoriaController.index); // Ok

// Listar categoria por nome
router.get('/categorias/nome/:nome', CategoriaController.showByNome);// Ok

// Editar categoria
router.put('/categorias/:id', CategoriaController.update);// Ok

/** ----------------------------------------- */

// Adicionar avaliações
router.post('/avaliacoes', AvaliacaoController.store); // OK

// Listar avaliações
router.get('/avaliacoes', AvaliacaoController.index); // OK

// Editar avaliações
router.put('/avaliacoes/:id', AvaliacaoController.update); // OK

// Excluir avaliações
router.delete('/avaliacoes/:id', AvaliacaoController.delete); // OK

module.exports = router;
