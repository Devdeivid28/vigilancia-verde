import { z } from 'zod';
import { today } from '@/lib/form-reference';

export const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} é obrigatório.`).max(max, `${label} deve ter no máximo ${max} caracteres.`);

export const optionalText = (max = 200) => z.string().trim().max(max, `O campo deve ter no máximo ${max} caracteres.`);
export const description = z.string().trim().min(30, 'A descrição deve possuir no mínimo 30 caracteres.').max(5000, 'A descrição deve possuir no máximo 5.000 caracteres.');
export const requiredDate = (label: string) => z.string().min(1, `${label} é obrigatória.`).refine((value) => value <= today(), `${label} não pode ser futura.`);
export const optionalEmail = z.union([z.literal(''), z.string().trim().email('Informe um endereço de e-mail válido.').max(255)]);
export const anvisaRegistration = z.string().trim().min(1, 'Registro ANVISA é obrigatório.').refine(
  (value) => value === 'Não informado' || /^\d+$/.test(value),
  'Informe somente números ou selecione “Não informado”.',
);

export const showValidationError = (result: z.SafeParseReturnType<unknown, unknown>) => {
  if (result.success) return false;
  return result.error.issues[0]?.message ?? 'Revise os campos informados.';
};