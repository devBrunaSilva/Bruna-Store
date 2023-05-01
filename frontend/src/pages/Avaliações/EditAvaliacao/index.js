import AvaliacaoForm from '../../../components/AvaliacaoForm';
import PageHeader from '../../../components/PageHeader';

export default function EditAvaliacao() {
  return (
    <>
      <PageHeader
        title="Editar Avaliação"
      />

      <AvaliacaoForm
        buttomLabel="Editar Avaliação"
      />
    </>
  );
}
