import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('church-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo credentials
    if (email === 'admin@gracechapel.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@gracechapel.com',
        role: 'admin',
        avatar: '👑',
      };
      setUser(adminUser);
      localStorage.setItem('church-user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    if (email && password.length >= 6) {
      const memberUser = {
        id: 'member-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: 'member',
        avatar: '🙏',
      };
      setUser(memberUser);
      localStorage.setItem('church-user', JSON.stringify(memberUser));
      return { success: true, user: memberUser };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: 'member-' + Date.now(),
      ...userData,
      role: 'member',
      avatar: '🙏',
      joinedAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('church-user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('church-user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('church-user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}