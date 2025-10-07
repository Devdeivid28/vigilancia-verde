import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Archive } from 'lucide-react';

const Arquivadas = () => {
  const notifications = [
    { id: 1, type: 'Tecnovigilância', sector: 'Ortopedia', date: '2025-09-28', archivedDate: '2025-10-05' },
    { id: 2, type: 'Farmacovigilância', sector: 'Cardiologia', date: '2025-09-25', archivedDate: '2025-10-03' },
    { id: 3, type: 'Hemovigilância', sector: 'UTI', date: '2025-09-20', archivedDate: '2025-09-30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notificações Arquivadas</h1>
        <p className="text-muted-foreground mt-1">
          {notifications.length} notificações arquivadas
        </p>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="opacity-80 hover:opacity-100 transition-opacity">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Archive className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg">{notification.type}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Setor: {notification.sector}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Notificação: {notification.date} • Arquivada: {notification.archivedDate}
                  </p>
                </div>
                <Badge variant="outline" className="bg-gray-100">
                  Arquivada
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">Ver Detalhes</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Arquivadas;
