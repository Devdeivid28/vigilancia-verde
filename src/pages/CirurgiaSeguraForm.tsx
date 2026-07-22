import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

const eventos = [
  'Paciente Incorreto',
  'Parte Incorreta do Corpo',
  'Falha na Anestesia',
  'Broncoaspiração',
  'Não aplicação do Check List de Cirurgia Segura',
];

const CirurgiaSeguraForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    registro: '',
    dataEvento: '',
    setor: '',
    leito: '',
    eventos: [] as string[],
    outroEvento: '',
    descricao: '',
    notificante: '',
  });

  const toggleEvento = (ev: string) => {
    setFormData(prev => ({
      ...prev,
      eventos: prev.eventos.includes(ev) ? prev.eventos.filter(e => e !== ev) : [...prev.eventos, ev],
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Cirurgia Segura</CardTitle>
                <CardDescription>Notificação de Evento Adverso Cirúrgico</CardDescription>
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
                <Label>Evento Adverso *</Label>
                <div className="grid gap-3 p-4 border rounded-lg bg-muted/30">
                  {eventos.map((ev) => (
                    <div key={ev} className="flex items-center space-x-2">
                      <Checkbox id={ev} checked={formData.eventos.includes(ev)} onCheckedChange={() => toggleEvento(ev)} />
                      <Label htmlFor={ev} className="font-normal text-sm cursor-pointer">{ev}</Label>
                    </div>
                  ))}
                </div>
                <Input placeholder="Outro (especificar)" value={formData.outroEvento} onChange={(e) => setFormData({ ...formData, outroEvento: e.target.value })} />
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

export default CirurgiaSeguraForm;