import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';

const TecnovigilanciaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dataOcorrencia: '',
    setor: '',
    tipoProduto: 'artigo',
    marca: '',
    registroAnvisa: '',
    lote: '',
    descricao: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Tecnovigilância</CardTitle>
                <CardDescription>Notificação de Evento Adverso</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataOcorrencia">Data da Ocorrência *</Label>
                  <Input
                    id="dataOcorrencia"
                    type="date"
                    value={formData.dataOcorrencia}
                    onChange={(e) => setFormData({ ...formData, dataOcorrencia: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="setor">Setor de Origem *</Label>
                  <Input
                    id="setor"
                    value={formData.setor}
                    onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                    placeholder="Ex: UTI, Centro Cirúrgico..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Produto Motivo da Notificação *</Label>
                <RadioGroup
                  value={formData.tipoProduto}
                  onValueChange={(value) => setFormData({ ...formData, tipoProduto: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="artigo" id="artigo" />
                    <Label htmlFor="artigo" className="font-normal">Artigo Médico Hospitalar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equipamento" id="equipamento" />
                    <Label htmlFor="equipamento" className="font-normal">Equipamento Médico Hospitalar</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registroAnvisa">Registro Anvisa *</Label>
                  <Input
                    id="registroAnvisa"
                    value={formData.registroAnvisa}
                    onChange={(e) => setFormData({ ...formData, registroAnvisa: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lote">Lote *</Label>
                  <Input
                    id="lote"
                    value={formData.lote}
                    onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição Detalhada da Ocorrência *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={6}
                  placeholder="Descreva detalhadamente o evento adverso..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail para Acompanhamento (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
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

export default TecnovigilanciaForm;
