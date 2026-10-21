'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { INITIAL_STUDENTS, StudentUser, TEACHER_OFFICIAL_EMAIL } from '@/data/students';

interface AuthContextType {
  user: UserProfile | null;
  studentsList: StudentUser[];
  login: (email: string) => { success: boolean; error?: string };
  logout: () => void;
  addXp: (points: number, activityId: string) => void;
  loginAsTeacher: () => void;
  loginAsStudent: (studentEmail?: string) => void;
  addStudent: (student: Omit<StudentUser, 'id'>) => void;
  removeStudent: (id: string) => void;
  updateStudent: (student: StudentUser) => void;
}

const DEFAULT_TEACHER: UserProfile = {
  name: 'Mag. Cristian Correa Pacheco',
  email: TEACHER_OFFICIAL_EMAIL.toLowerCase(),
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'teacher',
  career: 'Ingeniería en Computación e Informática',
  university: 'Universidad Gabriela Mistral',
  xp: 1500,
  completedActivities: ['act-excel-complete', 'act-types-complete']
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [studentsList, setStudentsList] = useState<StudentUser[]>(INITIAL_STUDENTS);

  // Load students and active user from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem('aula_bdd_students');
    if (savedStudents) {
      try {
        setStudentsList(JSON.parse(savedStudents));
      } catch {
        setStudentsList(INITIAL_STUDENTS);
      }
    } else {
      localStorage.setItem('aula_bdd_students', JSON.stringify(INITIAL_STUDENTS));
    }

    const savedUser = localStorage.getItem('aula_bdd_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('aula_bdd_user');
      }
    } else {
      // By default start with Professor Cristian Correa logged in for immediate review
      setUser(DEFAULT_TEACHER);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
    }
  }, []);

  const saveStudents = (newStudents: StudentUser[]) => {
    setStudentsList(newStudents);
    localStorage.setItem('aula_bdd_students', JSON.stringify(newStudents));
  };

  const login = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const teacherLower = TEACHER_OFFICIAL_EMAIL.toLowerCase();

    // Check if Teacher
    if (trimmed === teacherLower) {
      setUser(DEFAULT_TEACHER);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
      return { success: true };
    }

    // Check if in student roster
    const student = studentsList.find((s) => s.email.toLowerCase() === trimmed);
    if (!student) {
      return {
        success: false,
        error: `El correo "${email}" no está registrado en la nómina oficial de la asignatura. Contacta al docente Mag. Cristian Correa.`
      };
    }

    const studentProfile: UserProfile = {
      name: student.fullName,
      email: student.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      career: student.career,
      university: 'Universidad Gabriela Mistral',
      xp: 100,
      completedActivities: []
    };

    setUser(studentProfile);
    localStorage.setItem('aula_bdd_user', JSON.stringify(studentProfile));
    return { success: true };
  };

  const loginAsTeacher = () => {
    setUser(DEFAULT_TEACHER);
    localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
  };

  const loginAsStudent = (studentEmail?: string) => {
    const targetEmail = studentEmail || studentsList[0]?.email;
    if (targetEmail) {
      login(targetEmail);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aula_bdd_user');
  };

  const addXp = (points: number, activityId: string) => {
    if (!user) return;
    if (user.completedActivities.includes(activityId)) return;

    const updatedUser: UserProfile = {
      ...user,
      xp: user.xp + points,
      completedActivities: [...user.completedActivities, activityId]
    };
    setUser(updatedUser);
    localStorage.setItem('aula_bdd_user', JSON.stringify(updatedUser));
  };

  const addStudent = (studentData: Omit<StudentUser, 'id'>) => {
    const newStudent: StudentUser = {
      ...studentData,
      id: Date.now().toString()
    };
    const updated = [newStudent, ...studentsList];
    saveStudents(updated);
  };

  const removeStudent = (id: string) => {
    const updated = studentsList.filter((s) => s.id !== id);
    saveStudents(updated);
  };

  const updateStudent = (student: StudentUser) => {
    const updated = studentsList.map((s) => (s.id === student.id ? student : s));
    saveStudents(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentsList,
        login,
        logout,
        addXp,
        loginAsTeacher,
        loginAsStudent,
        addStudent,
        removeStudent,
        updateStudent
      }}
    >
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
