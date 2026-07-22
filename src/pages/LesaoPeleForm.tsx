import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Bandage } from 'lucide-react';
import { toast } from 'sonner';

const setores = ['UTI Materna', 'UTI Neonatal', 'UCI Neonatal', 'UCINCA', 'ACCR', 'Pré-parto', 'Centro Cirúrgico', 'Unidade 1', 'Unidade 2', 'Mães Acompanhantes'];
const tiposLesao = ['Deiscência de F.O.', 'Lesão por Pressão', 'Queimadura', 'Extravasamento/Infiltração', 'Flebite'];

const LesaoPeleForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    registro: '',
    dataEvento: '',
    setor: '',
    leito: '',
    tipoLesao: '',
    outroTipo: '',
    descricao: '',
    anexo: '',
    notificante: '',
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Bandage className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Lesão de Pele</CardTitle>
                <CardDescription>Notificação de Lesão de Pele / Evento Adverso</CardDescription>
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

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataEvento">Data do Evento *</Label>
                  <Input id="dataEvento" type="date" value={formData.dataEvento} onChange={(e) => setFormData({ ...formData, dataEvento: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leito">Leito *</Label>
                  <Input id="leito" value={formData.leito} onChange={(e) => setFormData({ ...formData, leito: e.target.value })} required />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Setor *</Label>
                <RadioGroup value={formData.setor} onValueChange={(v) => setFormData({ ...formData, setor: v })}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/30">
                    {setores.map((s) => (
                      <div key={s} className="flex items-center space-x-2">
                        <RadioGroupItem value={s} id={`setor-${s}`} />
                        <Label htmlFor={`setor-${s}`} className="font-normal text-sm cursor-pointer">{s}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Tipo de Lesão *</Label>
                <RadioGroup value={formData.tipoLesao} onValueChange={(v) => setFormData({ ...formData, tipoLesao: v })}>
                  <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/30">
                    {tiposLesao.map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <RadioGroupItem value={t} id={`tipo-${t}`} />
                        <Label htmlFor={`tipo-${t}`} className="font-normal text-sm cursor-pointer">{t}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outro" id="tipo-outro" />
                      <Label htmlFor="tipo-outro" className="font-normal text-sm cursor-pointer">Outro</Label>
                    </div>
                  </div>
                </RadioGroup>
                {formData.tipoLesao === 'outro' && (
                  <Input placeholder="Especifique" value={formData.outroTipo} onChange={(e) => setFormData({ ...formData, outroTipo: e.target.value })} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descreva o evento *</Label>
                <Textarea id="descricao" rows={5} value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anexo">Anexar imagem da Lesão / Evento Adverso</Label>
                <Input id="anexo" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, anexo: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificante">Servidor Notificante *</Label>
                <Input id="notificante" value={formData.notificante} onChange={(e) => setFormData({ ...formData, notificante: e.target.value })} required />
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

export default LesaoPeleForm;