import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Droplet } from 'lucide-react';
import { toast } from 'sonner';

const HemovigilanciaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    prontuario: '',
    setorLeito: '',
    tipoIncidente: 'imediato',
    dataOcorrencia: '',
    historiaPrevia: 'nao',
    hemocomponente: '',
    numeroHemocomponente: '',
    dataAdministracao: '',
    sintomas: [] as string[],
    outroSintoma: '',
    email: '',
  });

  const sintomas = [
    'Ansiedade', 'Calafrio', 'Choque', 'Cianose de extremidades', 'Cianose labial',
    'Dispnéia', 'Dor abdominal', 'Dor lombar', 'Dor torácica', 'Edema agudo de pulmão',
    'Eritema', 'Febre', 'Hemoglobinúria', 'Hipertensão arterial', 'Hipotensão arterial',
    'Icterícia', 'Náuseas', 'Pápulas', 'Rouquidão', 'Soroconversão',
    'Taquicardia', 'Taquipnéia', 'Tosse', 'Tremores', 'Urticária', 'Vômitos'
  ];

  const toggleSintoma = (sintoma: string) => {
    setFormData(prev => ({
      ...prev,
      sintomas: prev.sintomas.includes(sintoma)
        ? prev.sintomas.filter(s => s !== sintoma)
        : [...prev.sintomas, sintoma]
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
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-2">
                  <Label htmlFor="prontuario">Nº de Prontuário *</Label>
                  <Input
                    id="prontuario"
                    value={formData.prontuario}
                    onChange={(e) => setFormData({ ...formData, prontuario: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="setorLeito">Setor/Leito *</Label>
                <Input
                  id="setorLeito"
                  value={formData.setorLeito}
                  onChange={(e) => setFormData({ ...formData, setorLeito: e.target.value })}
                  placeholder="Ex: UTI - Leito 5"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Incidente *</Label>
                  <RadioGroup
                    value={formData.tipoIncidente}
                    onValueChange={(value) => setFormData({ ...formData, tipoIncidente: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="imediato" id="imediato" />
                      <Label htmlFor="imediato" className="font-normal">Imediato</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tardio" id="tardio" />
                      <Label htmlFor="tardio" className="font-normal">Tardio</Label>
                    </div>
                  </RadioGroup>
                </div>

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
              </div>

              <div className="space-y-2">
                <Label>História de Incidentes Transfusionais Prévios *</Label>
                <RadioGroup
                  value={formData.historiaPrevia}
                  onValueChange={(value) => setFormData({ ...formData, historiaPrevia: value })}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="sim" />
                      <Label htmlFor="sim" className="font-normal">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="nao" />
                      <Label htmlFor="nao" className="font-normal">Não</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hemocomponente">Hemocomponente *</Label>
                  <Input
                    id="hemocomponente"
                    value={formData.hemocomponente}
                    onChange={(e) => setFormData({ ...formData, hemocomponente: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroHemocomponente">Nº do Hemocomponente *</Label>
                  <Input
                    id="numeroHemocomponente"
                    value={formData.numeroHemocomponente}
                    onChange={(e) => setFormData({ ...formData, numeroHemocomponente: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataAdministracao">Data da Administração *</Label>
                  <Input
                    id="dataAdministracao"
                    type="date"
                    value={formData.dataAdministracao}
                    onChange={(e) => setFormData({ ...formData, dataAdministracao: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sinais e Sintomas Apresentados *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/30">
                  {sintomas.map((sintoma) => (
                    <div key={sintoma} className="flex items-center space-x-2">
                      <Checkbox
                        id={sintoma}
                        checked={formData.sintomas.includes(sintoma)}
                        onCheckedChange={() => toggleSintoma(sintoma)}
                      />
                      <Label htmlFor={sintoma} className="font-normal text-sm cursor-pointer">
                        {sintoma}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outroSintoma">Outro Sintoma (especificar)</Label>
                <Input
                  id="outroSintoma"
                  value={formData.outroSintoma}
                  onChange={(e) => setFormData({ ...formData, outroSintoma: e.target.value })}
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

export default HemovigilanciaForm;
