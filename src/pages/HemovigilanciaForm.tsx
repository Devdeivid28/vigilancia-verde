import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectorSelect } from '@/components/forms/SectorSelect';
import { descriptionPlaceholder, hemocomponentes, sinaisSintomas, today } from '@/lib/form-reference';
import { description as descriptionSchema, optionalEmail, requiredDate, requiredText, showValidationError } from '@/lib/form-validation';

const schema = z.object({
  nomePaciente: requiredText('Nome do Paciente'),
  prontuario: requiredText('Nº do Prontuário', 50),
  setor: requiredText('Setor'),
  leito: requiredText('Leito', 30),
  tipoIncidente: z.string().min(1, 'Tipo de Reação é obrigatório.'),
  dataOcorrencia: requiredDate('Data da Ocorrência'),
  historiaPrevia: z.string().min(1, 'Informe a história de incidentes prévios.'),
  hemocomponente: requiredText('Hemocomponente'),
  numeroHemocomponente: requiredText('Nº do Hemocomponente', 50),
  dataAdministracao: requiredDate('Data da Administração'),
  sintomas: z.array(z.string()).min(1, 'Selecione ao menos um sinal ou sintoma.'),
  outroSintoma: z.string().trim().max(200),
  descricao: descriptionSchema,
  notificante: requiredText('Servidor Notificante'),
  email: optionalEmail,
})
  .refine((d) => !d.sintomas.includes('Outro') || d.outroSintoma.length > 0, 'Especifique o sintoma “Outro”.')
  .refine((d) => !d.dataAdministracao || !d.dataOcorrencia || d.dataAdministracao <= d.dataOcorrencia, 'A data da administração não pode ser posterior à ocorrência.');

const HemovigilanciaForm = () => {
  const navigate = useNavigate();
  const [f, setF] = useState({
    nomePaciente: '', prontuario: '', setor: '', leito: '', tipoIncidente: '', dataOcorrencia: '', historiaPrevia: '',
    hemocomponente: '', numeroHemocomponente: '', dataAdministracao: '', sintomas: [] as string[], outroSintoma: '',
    descricao: '', notificante: '', email: '',
  });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (s: string) => setF((p) => ({ ...p, sintomas: p.sintomas.includes(s) ? p.sintomas.filter((x) => x !== s) : [...p.sintomas, s] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = showValidationError(schema.safeParse(f));
    if (error) return toast.error(error);
    toast.success('Notificação enviada com sucesso!');
    setTimeout(() => navigate('/'), 1500);
  };

  const text = (id: keyof typeof f, label: string) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} *</Label>
      <Input id={id} value={f[id] as string} onChange={(e) => set(id)(e.target.value)} />
    </div>
  );
  const radio = (id: keyof typeof f, label: string, opts: [string, string][]) => (
    <div className="space-y-2">
      <Label>{label} *</Label>
      <RadioGroup value={f[id] as string} onValueChange={set(id)} className="flex gap-4">
        {opts.map(([v, l]) => (
          <div key={v} className="flex items-center space-x-2">
            <RadioGroupItem value={v} id={`${id}-${v}`} />
            <Label htmlFor={`${id}-${v}`} className="font-normal">{l}</Label>
          </div>
        ))}
      </RadioGroup>
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Droplet className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Hemovigilância</CardTitle>
                <CardDescription>Notificação de Incidente Transfusional</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-4">
                {text('nomePaciente', 'Nome do Paciente')}
                {text('prontuario', 'Nº do Prontuário')}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <SectorSelect value={f.setor} onChange={set('setor')} />
                {text('leito', 'Leito')}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {radio('tipoIncidente', 'Tipo de Reação', [['imediato', 'Imediata'], ['tardio', 'Tardia']])}
                <div className="space-y-2">
                  <Label htmlFor="dataOcorrencia">Data da Ocorrência *</Label>
                  <Input id="dataOcorrencia" type="date" max={today()} value={f.dataOcorrencia} onChange={(e) => set('dataOcorrencia')(e.target.value)} />
                </div>
              </div>
              {radio('historiaPrevia', 'História de Incidentes Transfusionais Prévios', [['sim', 'Sim'], ['nao', 'Não'], ['naosei', 'Não sei']])}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Hemocomponente *</Label>
                  <Select value={f.hemocomponente} onValueChange={set('hemocomponente')}>
                    <SelectTrigger aria-label="Hemocomponente"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>{hemocomponentes.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {text('numeroHemocomponente', 'Nº do Hemocomponente')}
                <div className="space-y-2">
                  <Label htmlFor="dataAdministracao">Data da Administração *</Label>
                  <Input id="dataAdministracao" type="date" max={today()} value={f.dataAdministracao} onChange={(e) => set('dataAdministracao')(e.target.value)} />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Sinais e Sintomas Apresentados *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/30">
                  {sinaisSintomas.map((s) => (
                    <div key={s} className="flex items-center space-x-2">
                      <Checkbox id={`s-${s}`} checked={f.sintomas.includes(s)} onCheckedChange={() => toggle(s)} />
                      <Label htmlFor={`s-${s}`} className="font-normal text-sm cursor-pointer">{s}</Label>
                    </div>
                  ))}
                </div>
                {f.sintomas.includes('Outro') && (
                  <Input aria-label="Especificar outro sintoma" placeholder="Especifique o sintoma *" maxLength={200} value={f.outroSintoma} onChange={(e) => set('outroSintoma')(e.target.value)} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descreva o incidente *</Label>
                <Textarea id="descricao" rows={5} placeholder={descriptionPlaceholder} maxLength={5000} value={f.descricao} onChange={(e) => set('descricao')(e.target.value)} />
                <p className="text-xs text-muted-foreground">{f.descricao.trim().length}/30 caracteres mínimos</p>
              </div>
              {text('notificante', 'Servidor Notificante')}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail para acompanhamento (Opcional)</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={f.email} onChange={(e) => set('email')(e.target.value)} />
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

export default HemovigilanciaForm;
