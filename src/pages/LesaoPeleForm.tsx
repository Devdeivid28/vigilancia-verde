import { Bandage } from 'lucide-react';
import { PatientEventForm } from '@/components/forms/PatientEventForm';
import { tiposLesao } from '@/lib/form-reference';

const LesaoPeleForm = () => (
  <PatientEventForm
    title="Lesão de Pele"
    subtitle="Notificação de Lesão de Pele / Evento Adverso"
    icon={Bandage}
    iconClassName="bg-gradient-to-br from-pink-500 to-rose-500"
    choiceLabel="Tipo de Lesão"
    choices={tiposLesao}
    notifierRequired
    allowImage
  />
);

export default LesaoPeleForm;
