import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

const Configuracoes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as preferências do sistema
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como você deseja receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas de novas notificações por e-mail
                </p>
              </div>
              <Switch id="email-notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="priority-alerts">Alertas de Prioridade</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas para notificações de alta prioridade
                </p>
              </div>
              <Switch id="priority-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências do Sistema</CardTitle>
            <CardDescription>
              Personalize a experiência do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-archive">Arquivamento Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Arquivar automaticamente notificações após 30 dias
                </p>
              </div>
              <Switch id="auto-archive" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Visualização Compacta</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar mais notificações em uma única tela
                </p>
              </div>
              <Switch id="compact-view" />
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          onClick={() => toast.success('Configurações salvas com sucesso!')}
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default Configuracoes;
