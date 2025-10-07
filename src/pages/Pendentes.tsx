import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Pendentes = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Tecnovigilância', sector: 'UTI', date: '2025-10-07', priority: 'high' },
    { id: 2, type: 'Farmacovigilância', sector: 'Pediatria', date: '2025-10-06', priority: 'medium' },
    { id: 3, type: 'Tecnovigilância', sector: 'Emergência', date: '2025-10-05', priority: 'low' },
    { id: 4, type: 'Hemovigilância', sector: 'Centro Cirúrgico', date: '2025-10-04', priority: 'high' },
  ]);

  const markAsResponded = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notificação marcada como respondida');
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const priorityLabels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notificações Pendentes</h1>
        <p className="text-muted-foreground mt-1">
          {notifications.length} notificações aguardando resposta
        </p>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg">{notification.type}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Setor: {notification.sector} • Data: {notification.date}
                  </p>
                </div>
                <Badge variant="outline" className={`${priorityColors[notification.priority]} text-white border-0`}>
                  {priorityLabels[notification.priority]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => markAsResponded(notification.id)}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Marcar como Respondida
                </Button>
                <Button variant="outline">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-medium">Nenhuma notificação pendente</p>
              <p className="text-sm text-muted-foreground">Todas as notificações foram respondidas!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pendentes;
