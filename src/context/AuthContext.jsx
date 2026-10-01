import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      console.warn('[Auth] profile fetch failed:', error.message);
      return null;
    }

    if (!data) {
      // fallback: create missing profile row
      const fallback = {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.email,
        avatar: '🙏',
        role: 'member',
        status: 'active',
      };
      await supabase.from('profiles').insert(fallback);
      setProfile(fallback);
      return fallback;
    }

    setProfile(data);
    return data;
  };

  useEffect(() => {
    let active = true;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user);
      }
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };

    const prof = await loadProfile(data.user);
    return { success: true, user: data.user, profile: prof };
  };

  const register = async ({ name, email, phone, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, phone: phone || '' } },
    });

    if (error) return { success: false, error: error.message };

    if (!data.session) {
      return {
        success: true,
        needsConfirmation: true,
        user: data.user,
        message: 'Check your email to confirm your account before signing in.',
      };
    }

    const prof = await loadProfile(data.user);
    return { success: true, user: data.user, profile: prof };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    setProfile(data);
    return { success: true, profile: data };
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
        isAuthenticated: !!user,
        isAdmin: profile?.role === 'admin',
        isLeader: profile?.role === 'admin' || profile?.role === 'leader',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}