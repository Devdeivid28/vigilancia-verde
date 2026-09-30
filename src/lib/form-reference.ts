export const today = () => new Date().toISOString().slice(0, 10);

export const setoresHospitalares = [
  'UTI Materna',
  'UTI Neonatal',
  'UCI Neonatal',
  'UCINCA',
  'ACCR',
  'Pré-parto',
  'Centro Cirúrgico',
  'Unidade 1',
  'Unidade 2',
  'Mães Acompanhantes',
] as const;

export const hemocomponentes = [
  'Concentrado de Hemácias',
  'Concentrado de Plaquetas',
  'Plasma Fresco Congelado',
  'Crioprecipitado',
] as const;

export const sinaisSintomas = [
  'Febre', 'Calafrios', 'Tremores', 'Dispneia', 'Prurido', 'Urticária',
  'Hipotensão', 'Hipertensão', 'Náuseas', 'Vômitos', 'Dor', 'Cianose', 'Outro',
] as const;

export const tiposQueda = [
  'Queda do leito',
  'Queda da própria altura',
  'Queda da cadeira/poltrona',
  'Queda durante a deambulação',
  'Queda no banheiro',
  'Queda da maca',
  'Outro',
] as const;

export const tiposLesao = [
  'Deiscência de Ferida Operatória',
  'Lesão por Pressão',
  'Queimadura',
  'Extravasamento/Infiltração',
  'Flebite',
  'Outro',
] as const;

export const eventosCirurgicos = [
  'Paciente Incorreto',
  'Parte Incorreta do Corpo',
  'Falha na Anestesia',
  'Broncoaspiração',
  'Não aplicação do Check List de Cirurgia Segura',
  'Outro',
] as const;

export const eventosIdentificacao = [
  'Paciente sem pulseira de identificação',
  'Dados de identificação incorretos na pulseira',
  'Paciente sem placa de identificação no leito',
  'Dados de identificação incorretos na placa',
] as const;

export const descriptionPlaceholder =
  'Descreva o que ocorreu, quando foi identificado, as condições observadas e as medidas adotadas (mínimo de 30 caracteres).';