import { TrendingDown } from 'lucide-react';
import { PatientEventForm } from '@/components/forms/PatientEventForm';
import { tiposQueda } from '@/lib/form-reference';

const QuedasForm = () => (
  <PatientEventForm
    title="Quedas"
    subtitle="Notificação de Queda de Paciente"
    icon={TrendingDown}
    iconClassName="bg-gradient-to-br from-orange-500 to-red-500"
    choiceLabel="Tipo de Queda"
    choices={tiposQueda}
    extraField={{ label: 'Houve lesão?', options: [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }, { value: 'naosei', label: 'Não sei' }] }}
  />
);

export default QuedasForm;
