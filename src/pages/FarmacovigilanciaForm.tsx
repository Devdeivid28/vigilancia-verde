import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Pill } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { SectorSelect } from '@/components/forms/SectorSelect';
import { descriptionPlaceholder, today } from '@/lib/form-reference';
import { description, optionalEmail, requiredDate, requiredText, showValidationError } from '@/lib/form-validation';

const schema = z.object({ setor: requiredText('Setor'), prontuario: requiredText('Nº do Prontuário'), nomePaciente: requiredText('Nome do Paciente'), sexo: requiredText('Sexo'), dataNascimento: requiredDate('Data de Nascimento'), dataEvento: requiredDate('Data do Evento Adverso'), descricaoEvento: description, medicamentoSuspeito: requiredText('Medicamento Suspeito'), dataNotificacao: requiredDate('Data desta Notificação'), email: optionalEmail }).superRefine((data, ctx) => {
  if (data.dataEvento < data.dataNascimento) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A Data do Evento deve ser igual ou posterior à Data de Nascimento.', path: ['dataEvento'] });
  if (data.dataNotificacao < data.dataEvento) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A Data da Notificação deve ser igual ou posterior à Data do Evento.', path: ['dataNotificacao'] });
});

const FarmacovigilanciaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    setor: '',
    prontuario: '',
    nomePaciente: '',
    sexo: 'masculino',
    dataNascimento: '',
    dataEvento: '',
    descricaoEvento: '',
    medicamentoSuspeito: '',
    dataNotificacao: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = showValidationError(schema.safeParse(formData));
    if (error) { toast.error(error); return; }
    toast.success('Notificação enviada com sucesso!');
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 py-8">
      <div className="container max-w-3xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Farmacovigilância</CardTitle>
                <CardDescription>Notificação de Evento Adverso a Medicamento</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <SectorSelect label="Setor de Origem" value={formData.setor} onChange={(setor) => setFormData({ ...formData, setor })} />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomePaciente">Nome do Paciente *</Label>
                  <Input
                    id="nomePaciente"
                    value={formData.nomePaciente}
                    onChange={(e) => setFormData({ ...formData, nomePaciente: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2"><Label htmlFor="prontuario">Nº do Prontuário *</Label><Input id="prontuario" value={formData.prontuario} onChange={(e) => setFormData({ ...formData, prontuario: e.target.value })} required /></div>

                <div className="space-y-2">
                  <Label>Sexo *</Label>
                  <RadioGroup
                    value={formData.sexo}
                    onValueChange={(value) => setFormData({ ...formData, sexo: value })}
                  >
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="masculino" id="masculino" />
                        <Label htmlFor="masculino" className="font-normal">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feminino" id="feminino" />
                        <Label htmlFor="feminino" className="font-normal">Feminino</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    max={today()}
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataEvento">Data do Evento Adverso *</Label>
                  <Input
                    id="dataEvento"
                    type="date"
                    max={today()}
                    value={formData.dataEvento}
                    onChange={(e) => setFormData({ ...formData, dataEvento: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoEvento">Breve Descrição do Evento Adverso *</Label>
                <Textarea
                  id="descricaoEvento"
                  value={formData.descricaoEvento}
                  onChange={(e) => setFormData({ ...formData, descricaoEvento: e.target.value })}
                  rows={4}
                  placeholder={descriptionPlaceholder}
                  minLength={30}
                  maxLength={5000}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamentoSuspeito">Medicamento Suspeito *</Label>
                <Input
                  id="medicamentoSuspeito"
                  value={formData.medicamentoSuspeito}
                  onChange={(e) => setFormData({ ...formData, medicamentoSuspeito: e.target.value })}
                  placeholder="Nome do medicamento"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNotificacao">Data desta Notificação *</Label>
                <Input
                  id="dataNotificacao"
                  type="date"
                  max={today()}
                  value={formData.dataNotificacao}
                  onChange={(e) => setFormData({ ...formData, dataNotificacao: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail para acompanhamento da notificação (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                <Button type="submit" size="lg" className="flex-1">
                  Enviar Notificação
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => navigate('/')}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmacovigilanciaForm;
