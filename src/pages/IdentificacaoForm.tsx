import { BadgeCheck } from 'lucide-react';
import { PatientEventForm } from '@/components/forms/PatientEventForm';
import { eventosIdentificacao } from '@/lib/form-reference';

const IdentificacaoForm = () => (
  <PatientEventForm
    title="Identificação"
    subtitle="Notificação de Falha de Identificação do Paciente"
    icon={BadgeCheck}
    iconClassName="bg-gradient-to-br from-indigo-500 to-purple-500"
    choiceLabel="Evento de Identificação"
    choices={eventosIdentificacao}
  />
);

export default IdentificacaoForm;
