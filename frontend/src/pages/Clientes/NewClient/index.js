import PageHeader from '../../../components/PageHeader';

import ClientForm from '../../../components/ClientForm/ClientForm';

export default function NewClient() {
  return (
    <>
      <PageHeader
        title="Novo Cliente"
      />

      <ClientForm
        buttomLabel="Cadastrar"
      />
    </>
  );
}
