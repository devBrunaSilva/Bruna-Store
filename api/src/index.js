const express = require('express');
const xmlParser = require('express-xml-bodyparser');

const routes = require('./routes');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(xmlParser());

app.use(routes);

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
