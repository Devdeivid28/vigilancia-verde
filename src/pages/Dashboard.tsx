import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, Archive, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Pendentes', value: 12, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { title: 'Respondidas', value: 34, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { title: 'Arquivadas', value: 89, icon: Archive, color: 'text-gray-600 bg-gray-50' },
    { title: 'Total', value: 135, icon: FileText, color: 'text-primary bg-primary/10' },
  ];

  const recentNotifications = [
    { id: 1, type: 'Tecnovigilância', sector: 'UTI', date: '2025-10-07', status: 'pending' },
    { id: 2, type: 'Farmacovigilância', sector: 'Pediatria', date: '2025-10-06', status: 'pending' },
    { id: 3, type: 'Hemovigilância', sector: 'Centro Cirúrgico', date: '2025-10-06', status: 'completed' },
    { id: 4, type: 'Tecnovigilância', sector: 'Emergência', date: '2025-10-05', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bem-vindo, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">
          {user?.role === 'admin' ? 'Painel Administrativo' : 'Painel de Controle'}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notificações Recentes</CardTitle>
          <CardDescription>Últimas notificações recebidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{notification.type}</p>
                    <p className="text-sm text-muted-foreground">Setor: {notification.sector}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{notification.date}</p>
                  <p className="text-xs font-medium">
                    {notification.status === 'pending' ? 'Pendente' : 'Respondida'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
