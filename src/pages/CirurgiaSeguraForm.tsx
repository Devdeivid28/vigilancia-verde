import { Stethoscope } from 'lucide-react';
import { PatientEventForm } from '@/components/forms/PatientEventForm';
import { eventosCirurgicos } from '@/lib/form-reference';

const CirurgiaSeguraForm = () => (
  <PatientEventForm
    title="Cirurgia Segura"
    subtitle="Notificação de Evento Adverso Cirúrgico"
    icon={Stethoscope}
    iconClassName="bg-gradient-to-br from-sky-500 to-indigo-500"
    choiceLabel="Evento Adverso"
    choices={eventosCirurgicos}
  />
);

export default CirurgiaSeguraForm;
