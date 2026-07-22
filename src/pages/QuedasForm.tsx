import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const tiposQueda = ['Leito', 'Cadeira', 'Maca', 'Banheiro/Chuveiro', 'Mesmo nível'];

const QuedasForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    registro: '',
    dataEvento: '',
    setor: '',
    leito: '',
    tiposQueda: [] as string[],
    houveLesao: 'nao',
    descricao: '',
    notificante: '',
  });

  const toggleTipo = (tipo: string) => {
    setFormData(prev => ({
      ...prev,
      tiposQueda: prev.tiposQueda.includes(tipo)
        ? prev.tiposQueda.filter(t => t !== tipo)
        : [...prev.tiposQueda, tipo],
    }));
  };

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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quedas</CardTitle>
                <CardDescription>Notificação de Queda de Paciente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomePaciente">Nome do Paciente *</Label>
                  <Input id="nomePaciente" value={formData.nomePaciente} onChange={(e) => setFormData({ ...formData, nomePaciente: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registro">Registro *</Label>
                  <Input id="registro" value={formData.registro} onChange={(e) => setFormData({ ...formData, registro: e.target.value })} required />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataEvento">Data do Evento *</Label>
                  <Input id="dataEvento" type="date" value={formData.dataEvento} onChange={(e) => setFormData({ ...formData, dataEvento: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setor">Setor *</Label>
                  <Input id="setor" value={formData.setor} onChange={(e) => setFormData({ ...formData, setor: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leito">Leito *</Label>
                  <Input id="leito" value={formData.leito} onChange={(e) => setFormData({ ...formData, leito: e.target.value })} required />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tipo de Queda *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/30">
                  {tiposQueda.map((tipo) => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox id={tipo} checked={formData.tiposQueda.includes(tipo)} onCheckedChange={() => toggleTipo(tipo)} />
                      <Label htmlFor={tipo} className="font-normal text-sm cursor-pointer">{tipo}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Houve lesão? *</Label>
                <RadioGroup value={formData.houveLesao} onValueChange={(v) => setFormData({ ...formData, houveLesao: v })}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="lesao-sim" /><Label htmlFor="lesao-sim" className="font-normal">Sim</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="lesao-nao" /><Label htmlFor="lesao-nao" className="font-normal">Não</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="naosei" id="lesao-naosei" /><Label htmlFor="lesao-naosei" className="font-normal">Não sei</Label></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descreva o evento *</Label>
                <Textarea id="descricao" rows={5} value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificante">Servidor Notificante (Opcional)</Label>
                <Input id="notificante" value={formData.notificante} onChange={(e) => setFormData({ ...formData, notificante: e.target.value })} />
              </div>

              <div className="flex gap-3 pt-4">
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

export default QuedasForm;