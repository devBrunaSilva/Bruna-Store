import PageHeader from '../../../components/PageHeader';
import ProductForm from '../../../components/ProductForm';

export default function NewProduct() {
  return (
    <>
      <PageHeader
        title="Novo Produto"
      />

      <ProductForm
        buttomLabel="Cadastrar"
      />
    </>
  );
}
