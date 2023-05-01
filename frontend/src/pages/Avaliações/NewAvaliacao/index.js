import AvaliacaoForm from '../../../components/AvaliacaoForm';
import PageHeader from '../../../components/PageHeader';

export default function NewClient() {
  return (
    <>
      <PageHeader
        title="Nova Avaliação"
      />

      <AvaliacaoForm
        buttomLabel="Cadastrar"
      />
    </>
  );
}
