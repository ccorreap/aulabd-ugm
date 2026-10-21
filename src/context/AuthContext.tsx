'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, name?: string, role?: 'student' | 'teacher') => { success: boolean; error?: string };
  logout: () => void;
  addXp: (points: number, activityId: string) => void;
  loginAsDemo: (type: 'teacher' | 'student') => void;
}

const DEFAULT_TEACHER: UserProfile = {
  name: 'Mag. Cristian Correa Pacheco',
  email: 'cristian.correa@ugm.cl',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'teacher',
  career: 'Ingeniería en Computación e Informática',
  university: 'Universidad Gabriela Mistral',
  xp: 1200,
  completedActivities: ['act-excel-1', 'act-types-1', 'act-flashcards-1']
};

const DEFAULT_STUDENT: UserProfile = {
  name: 'Estudiante UGM',
  email: 'alumno.informatica@alumnos.ugm.cl',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  career: 'Ingeniería en Computación e Informática',
  university: 'Universidad Gabriela Mistral',
  xp: 150,
  completedActivities: []
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aula_bdd_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('aula_bdd_user');
      }
    } else {
      // By default start with demo student logged in for easy review
      setUser(DEFAULT_STUDENT);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_STUDENT));
    }
  }, []);

  const login = (email: string, name?: string, role: 'student' | 'teacher' = 'student') => {
    const lowerEmail = email.trim().toLowerCase();
    
    // Check institutional email domains or permit common test email
    const isUgm = lowerEmail.endsWith('@ugm.cl') || lowerEmail.endsWith('@alumnos.ugm.cl') || lowerEmail.includes('ugm');
    
    if (!isUgm && !lowerEmail.endsWith('@gmail.com') && !lowerEmail.includes('@')) {
      return { 
        success: false, 
        error: 'Por favor ingresa un correo institucional válido (@ugm.cl o @alumnos.ugm.cl)' 
      };
    }

    const calculatedRole = lowerEmail.includes('alumnos') ? 'student' : (role || 'student');
    const profileName = name || (lowerEmail.split('@')[0].replace('.', ' ').toUpperCase());

    const newUser: UserProfile = {
      name: profileName,
      email: lowerEmail,
      avatar: calculatedRole === 'teacher' ? DEFAULT_TEACHER.avatar : DEFAULT_STUDENT.avatar,
      role: calculatedRole,
      career: 'Ingeniería en Computación e Informática',
      university: 'Universidad Gabriela Mistral',
      xp: 50,
      completedActivities: []
    };

    setUser(newUser);
    localStorage.setItem('aula_bdd_user', JSON.stringify(newUser));
    return { success: true };
  };

  const loginAsDemo = (type: 'teacher' | 'student') => {
    const selected = type === 'teacher' ? DEFAULT_TEACHER : DEFAULT_STUDENT;
    setUser(selected);
    localStorage.setItem('aula_bdd_user', JSON.stringify(selected));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aula_bdd_user');
  };

  const addXp = (points: number, activityId: string) => {
    if (!user) return;
    if (user.completedActivities.includes(activityId)) return; // Already completed

    const updatedUser: UserProfile = {
      ...user,
      xp: user.xp + points,
      completedActivities: [...user.completedActivities, activityId]
    };
    setUser(updatedUser);
    localStorage.setItem('aula_bdd_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addXp, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
