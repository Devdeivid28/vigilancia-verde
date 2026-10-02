import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SectorSelect } from '@/components/forms/SectorSelect';
import { descriptionPlaceholder, today } from '@/lib/form-reference';
import { description as descriptionSchema, optionalText, requiredDate, requiredText, showValidationError } from '@/lib/form-validation';

const ALLOWED_IMAGE = ['image/jpeg', 'image/png'];

type Props = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconClassName: string;
  choiceLabel: string;
  choices: readonly string[];
  notifierRequired?: boolean;
  allowImage?: boolean;
  extraField?: { label: string; options: { value: string; label: string }[] };
};

export const PatientEventForm = ({ title, subtitle, icon: Icon, iconClassName, choiceLabel, choices, notifierRequired, allowImage, extraField }: Props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ nomePaciente: '', prontuario: '', dataEvento: '', setor: '', leito: '', evento: '', outro: '', extra: '', descricao: '', notificante: '' });
  const [file, setFile] = useState<File | null>(null);
  const set = (k: keyof typeof data) => (v: string) => setData((p) => ({ ...p, [k]: v }));
  const hasOutro = choices.includes('Outro');

  const schema = z.object({
    nomePaciente: requiredText('Nome do Paciente'),
    prontuario: requiredText('Nº do Prontuário', 50),
    dataEvento: requiredDate('Data do Evento'),
    setor: requiredText('Setor'),
    leito: requiredText('Leito', 30),
    evento: z.string().min(1, `${choiceLabel} é obrigatório.`),
    outro: optionalText(),
    extra: extraField ? z.string().min(1, `${extraField.label} é obrigatório.`) : z.string(),
    descricao: descriptionSchema,
    notificante: notifierRequired ? requiredText('Servidor Notificante') : optionalText(),
  }).refine((d) => d.evento !== 'Outro' || d.outro.trim().length > 0, 'Especifique a opção “Outro”.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = showValidationError(schema.safeParse(data));
    if (error) return toast.error(error);
    if (file && !ALLOWED_IMAGE.includes(file.type)) return toast.error('Anexe somente imagens JPG, JPEG ou PNG.');
    toast.success('Notificação enviada com sucesso!');
    setTimeout(() => navigate('/'), 1500);
  };

  const field = (id: keyof typeof data, label: string, extra?: ReactNode) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} *</Label>
      {extra ?? <Input id={id} value={data[id]} onChange={(e) => set(id)(e.target.value)} required />}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 py-8">
      <div className="container max-w-3xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClassName}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-4">
                {field('nomePaciente', 'Nome do Paciente')}
                {field('prontuario', 'Nº do Prontuário')}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {field('dataEvento', 'Data do Evento', <Input id="dataEvento" type="date" max={today()} value={data.dataEvento} onChange={(e) => set('dataEvento')(e.target.value)} required />)}
                <SectorSelect value={data.setor} onChange={set('setor')} />
                {field('leito', 'Leito')}
              </div>

              <div className="space-y-3">
                <Label>{choiceLabel} *</Label>
                <RadioGroup value={data.evento} onValueChange={set('evento')} className="grid gap-3 p-4 border rounded-lg bg-muted/30">
                  {choices.map((c) => (
                    <div key={c} className="flex items-center space-x-2">
                      <RadioGroupItem value={c} id={`ev-${c}`} />
                      <Label htmlFor={`ev-${c}`} className="font-normal text-sm cursor-pointer">{c}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {hasOutro && data.evento === 'Outro' && (
                  <Input aria-label="Especificar outro" placeholder="Especifique *" value={data.outro} onChange={(e) => set('outro')(e.target.value)} maxLength={200} />
                )}
              </div>

              {extraField && (
                <div className="space-y-2">
                  <Label>{extraField.label} *</Label>
                  <RadioGroup value={data.extra} onValueChange={set('extra')} className="flex flex-wrap gap-4">
                    {extraField.options.map((o) => (
                      <div key={o.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={o.value} id={`extra-${o.value}`} />
                        <Label htmlFor={`extra-${o.value}`} className="font-normal">{o.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="descricao">Descreva o evento *</Label>
                <Textarea id="descricao" rows={5} placeholder={descriptionPlaceholder} minLength={30} maxLength={5000} value={data.descricao} onChange={(e) => set('descricao')(e.target.value)} />
                <p className="text-xs text-muted-foreground">{data.descricao.trim().length}/30 caracteres mínimos</p>
              </div>

              {allowImage && (
                <div className="space-y-2">
                  <Label htmlFor="anexo">Anexar imagem da Lesão / Evento Adverso (JPG, JPEG ou PNG)</Label>
                  <Input id="anexo" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notificante">Servidor Notificante {notifierRequired ? '*' : '(Opcional)'}</Label>
                <Input id="notificante" value={data.notificante} onChange={(e) => set('notificante')(e.target.value)} />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                <Button type="submit" size="lg" className="flex-1">Enviar Notificação</Button>
                <Button type="button" variant="outline" size="lg" onClick={() => navigate('/')}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
