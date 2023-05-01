import { Route, Routes } from 'react-router-dom';

import Home from './pages/Clientes/Home';
import EditClient from './pages/Clientes/EditClient';
import NewClient from './pages/Clientes/NewClient';

import EditProduct from './pages/Produtos/EditProduct';
import NewProduct from './pages/Produtos/NewProduct';

import NewAvaliacao from './pages/Avaliações/NewAvaliacao';
import EditAvaliacao from './pages/Avaliações/EditAvaliacao';

export default function Router() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/newClient" element={<NewClient />} />
      <Route path="/editClient/:id" element={<EditClient />} />

      <Route path="/newProduct" element={<NewProduct />} />
      <Route path="/editProduct/123" element={<EditProduct />} />

      <Route path="/newAvaliacao" element={<NewAvaliacao />} />
      <Route path="/EditAvaliacao/123" element={<EditAvaliacao />} />
    </Routes>
  );
}
