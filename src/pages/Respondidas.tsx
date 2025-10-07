import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Archive } from 'lucide-react';
import { toast } from 'sonner';

const Respondidas = () => {
  const notifications = [
    { id: 1, type: 'Hemovigilância', sector: 'Centro Cirúrgico', date: '2025-10-06', respondedDate: '2025-10-07' },
    { id: 2, type: 'Tecnovigilância', sector: 'UTI', date: '2025-10-05', respondedDate: '2025-10-06' },
    { id: 3, type: 'Farmacovigilância', sector: 'Clínica Médica', date: '2025-10-04', respondedDate: '2025-10-05' },
  ];

  const archiveNotification = (id: number) => {
    toast.success('Notificação arquivada');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notificações Respondidas</h1>
        <p className="text-muted-foreground mt-1">
          {notifications.length} notificações já foram respondidas
        </p>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-lg">{notification.type}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Setor: {notification.sector}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Notificação: {notification.date} • Resposta: {notification.respondedDate}
                  </p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  Respondida
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline">Ver Detalhes</Button>
                <Button
                  variant="outline"
                  onClick={() => archiveNotification(notification.id)}
                  className="gap-2"
                >
                  <Archive className="h-4 w-4" />
                  Arquivar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Respondidas;
