import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, SprayCan } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { SectorSelect } from '@/components/forms/SectorSelect';
import { descriptionPlaceholder, today } from '@/lib/form-reference';
import { anvisaRegistration, description, optionalEmail, requiredDate, requiredText, showValidationError } from '@/lib/form-validation';

const schema = z.object({ dataOcorrencia: requiredDate('Data da Ocorrência'), setor: requiredText('Setor'), produto: requiredText('Produto Envolvido'), marca: requiredText('Marca'), registroAnvisa: anvisaRegistration, lote: requiredText('Lote'), descricao, email: optionalEmail });

const SaneantesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dataOcorrencia: '',
    setor: '',
    produto: '',
    marca: '',
    registroAnvisa: '',
    lote: '',
    descricao: '',
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 flex items-center justify-center">
                <SprayCan className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Saneantes</CardTitle>
                <CardDescription>Notificação de Ocorrência com Saneantes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="dataOcorrencia">Data da Ocorrência *</Label><Input id="dataOcorrencia" type="date" max={today()} value={formData.dataOcorrencia} onChange={(e) => setFormData({ ...formData, dataOcorrencia: e.target.value })} required /></div>
                <SectorSelect label="Setor de Origem" value={formData.setor} onChange={(setor) => setFormData({ ...formData, setor })} />
              </div>

              <div className="space-y-2"><Label htmlFor="produto">Produto Envolvido *</Label><Input id="produto" value={formData.produto} onChange={(e) => setFormData({ ...formData, produto: e.target.value })} required /></div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input id="marca" value={formData.marca} onChange={(e) => setFormData({ ...formData, marca: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registroAnvisa">Registro ANVISA *</Label>
                  <Input id="registroAnvisa" inputMode="numeric" placeholder="Somente números" value={formData.registroAnvisa} onChange={(e) => setFormData({ ...formData, registroAnvisa: e.target.value.replace(/[^\d]/g, '') })} required />
                  <Button type="button" variant="link" className="h-auto p-0 text-xs" onClick={() => setFormData({ ...formData, registroAnvisa: 'Não informado' })}>Usar “Não informado”</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lote">Lote *</Label>
                  <Input id="lote" value={formData.lote} onChange={(e) => setFormData({ ...formData, lote: e.target.value })} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição detalhada da ocorrência *</Label>
                <Textarea id="descricao" rows={6} minLength={30} maxLength={5000} placeholder={descriptionPlaceholder} value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail para acompanhamento da notificação (Opcional)</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="seu@email.com" />
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

export default SaneantesForm;