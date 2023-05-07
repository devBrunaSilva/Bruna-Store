const express = require('express');
const xmlParser = require('express-xml-bodyparser');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(xmlParser());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
