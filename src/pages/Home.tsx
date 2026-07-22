import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Pill, Droplet, LogIn, SprayCan, TrendingDown, BadgeCheck, Bandage, Stethoscope } from 'lucide-react';

const Home = () => {
  const sectors = [
    {
      id: 'tecnovigilancia',
      title: 'Tecnovigilância',
      description: 'Notificações de eventos adversos relacionados a artigos e equipamentos médicos',
      icon: FileText,
      path: '/tecnovigilancia/form',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'farmacovigilancia',
      title: 'Farmacovigilância',
      description: 'Notificações de eventos adversos relacionados a medicamentos',
      icon: Pill,
      path: '/farmacovigilancia/form',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'hemovigilancia',
      title: 'Hemovigilância',
      description: 'Notificações de incidentes transfusionais',
      icon: Droplet,
      path: '/hemovigilancia/form',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'saneantes',
      title: 'Saneantes',
      description: 'Notificações de ocorrências com produtos saneantes',
      icon: SprayCan,
      path: '/saneantes/form',
      color: 'from-lime-500 to-emerald-500',
    },
    {
      id: 'quedas',
      title: 'Quedas',
      description: 'Notificações de quedas de pacientes',
      icon: TrendingDown,
      path: '/quedas/form',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'identificacao',
      title: 'Identificação',
      description: 'Notificações de falha de identificação do paciente',
      icon: BadgeCheck,
      path: '/identificacao/form',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'lesao-pele',
      title: 'Lesão de Pele',
      description: 'Notificações de lesões de pele e eventos adversos',
      icon: Bandage,
      path: '/lesao-pele/form',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'cirurgia-segura',
      title: 'Cirurgia Segura',
      description: 'Notificações de eventos adversos cirúrgicos',
      icon: Stethoscope,
      path: '/cirurgia-segura/form',
      color: 'from-sky-500 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Sistema de Notificações
            </h1>
            <p className="text-lg text-muted-foreground">
              Portal de registro de eventos adversos e incidentes
            </p>
          </div>
          <Link to="/login">
            <Button size="lg" className="gap-2">
              <LogIn className="h-5 w-5" />
              Login Interno
            </Button>
          </Link>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <Link key={sector.id} to={sector.path} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{sector.title}</CardTitle>
                    <CardDescription className="text-base">
                      {sector.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Fazer Notificação
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Notificação Anônima</h3>
              <p className="text-muted-foreground">
                As notificações podem ser feitas de forma anônima. O e-mail para acompanhamento é opcional.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
