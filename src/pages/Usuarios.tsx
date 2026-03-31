import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { UserPlus, Pencil, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'tecnovigilancia' | 'farmacovigilancia' | 'hemovigilancia';

interface SystemUser {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  active: boolean;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  tecnovigilancia: 'Tecnovigilância',
  farmacovigilancia: 'Farmacovigilância',
  hemovigilancia: 'Hemovigilância',
};

const roleBadgeVariant: Record<UserRole, string> = {
  admin: 'bg-primary/10 text-primary border-primary/20',
  tecnovigilancia: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  farmacovigilancia: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  hemovigilancia: 'bg-red-500/10 text-red-700 border-red-500/20',
};

const initialUsers: SystemUser[] = [
  { id: '1', name: 'Administrador do Sistema', username: 'admin', role: 'admin', active: true },
  { id: '2', name: 'Usuário Tecnovigilância', username: 'tecnovig', role: 'tecnovigilancia', active: true },
  { id: '3', name: 'Usuário Farmacovigilância', username: 'farmacovig', role: 'farmacovigilancia', active: true },
  { id: '4', name: 'Usuário Hemovigilância', username: 'hemovig', role: 'hemovigilancia', active: true },
];

const Usuarios = () => {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState({ name: '', username: '', role: '' as UserRole | '', password: '' });
  const { toast } = useToast();

  const handleSave = () => {
    if (!formData.name || !formData.username || !formData.role) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name: formData.name, username: formData.username, role: formData.role as UserRole } : u));
      toast({ title: 'Usuário atualizado com sucesso' });
    } else {
      const newUser: SystemUser = {
        id: Date.now().toString(),
        name: formData.name,
        username: formData.username,
        role: formData.role as UserRole,
        active: true,
      };
      setUsers(prev => [...prev, newUser]);
      toast({ title: 'Usuário criado com sucesso' });
    }
    setDialogOpen(false);
    setEditingUser(null);
    setFormData({ name: '', username: '', role: '', password: '' });
  };

  const handleEdit = (user: SystemUser) => {
    setEditingUser(user);
    setFormData({ name: user.name, username: user.username, role: user.role, password: '' });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({ title: 'Usuário removido' });
  };

  const handleNewUser = () => {
    setEditingUser(null);
    setFormData({ name: '', username: '', role: '', password: '' });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários e permissões do sistema</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Nome do usuário" />
              </div>
              <div className="space-y-2">
                <Label>Login</Label>
                <Input value={formData.username} onChange={e => setFormData(p => ({ ...p, username: e.target.value }))} placeholder="Nome de usuário para login" />
              </div>
              <div className="space-y-2">
                <Label>{editingUser ? 'Nova senha (deixe vazio para manter)' : 'Senha'}</Label>
                <Input type="password" value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} placeholder="••••••" />
              </div>
              <div className="space-y-2">
                <Label>Perfil de acesso</Label>
                <Select value={formData.role} onValueChange={v => setFormData(p => ({ ...p, role: v as UserRole }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione o perfil" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="tecnovigilancia">Tecnovigilância</SelectItem>
                    <SelectItem value="farmacovigilancia">Farmacovigilância</SelectItem>
                    <SelectItem value="hemovigilancia">Hemovigilância</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuários Cadastrados ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.username}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={roleBadgeVariant[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={user.active ? 'bg-green-500/10 text-green-700 border-green-500/20' : 'bg-muted text-muted-foreground'}>
                      {user.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios;
