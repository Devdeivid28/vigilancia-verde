import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'tecnovigilancia' | 'farmacovigilancia' | 'hemovigilancia';

interface User {
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const USERS = {
  admin: { password: 'admin123', role: 'admin' as UserRole, name: 'Administrador do Sistema' },
  tecnovig: { password: 'tecno123', role: 'tecnovigilancia' as UserRole, name: 'Usuário Tecnovigilância' },
  farmacovig: { password: 'farma123', role: 'farmacovigilancia' as UserRole, name: 'Usuário Farmacovigilância' },
  hemovig: { password: 'hemo123', role: 'hemovigilancia' as UserRole, name: 'Usuário Hemovigilância' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const userDb = USERS[username as keyof typeof USERS];
    
    if (userDb && userDb.password === password) {
      const authenticatedUser = {
        username,
        role: userDb.role,
        name: userDb.name,
      };
      setUser(authenticatedUser);
      localStorage.setItem('hospital_user', JSON.stringify(authenticatedUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
