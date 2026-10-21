'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { 
  INITIAL_STUDENTS, 
  StudentUser, 
  TEACHER_OFFICIAL_EMAIL, 
  TEACHER_DEFAULT_PASSWORD,
  getFirstName 
} from '@/data/students';
import { ALL_COURSE_CLASSES } from '@/data/courseConfig';

interface AuthContextType {
  user: UserProfile | null;
  studentsList: StudentUser[];
  publishedClasses: string[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  addXp: (points: number, activityId: string) => void;
  loginAsTeacher: () => void;
  loginAsStudent: (studentEmail: string) => void;
  addStudent: (student: Omit<StudentUser, 'id' | 'defaultPassword'>) => void;
  removeStudent: (id: string) => void;
  updateStudent: (student: StudentUser) => void;
  togglePublishClass: (classId: string) => void;
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
  const [publishedClasses, setPublishedClasses] = useState<string[]>(['clase1', 'clase2']);

  useEffect(() => {
    // 1. Load Students
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

    // 2. Load Published Classes (Teacher release controller)
    const savedPublished = localStorage.getItem('aula_bdd_published_classes');
    if (savedPublished) {
      try {
        setPublishedClasses(JSON.parse(savedPublished));
      } catch {
        setPublishedClasses(['clase1', 'clase2']);
      }
    } else {
      localStorage.setItem('aula_bdd_published_classes', JSON.stringify(['clase1', 'clase2']));
    }

    // 3. Load Active User
    const savedUser = localStorage.getItem('aula_bdd_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('aula_bdd_user');
      }
    } else {
      setUser(DEFAULT_TEACHER);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
    }
  }, []);

  const saveStudents = (newStudents: StudentUser[]) => {
    setStudentsList(newStudents);
    localStorage.setItem('aula_bdd_students', JSON.stringify(newStudents));
  };

  const togglePublishClass = (classId: string) => {
    const isCurrentlyPublished = publishedClasses.includes(classId);
    let updated: string[];
    if (isCurrentlyPublished) {
      // Don't unpublish clase1 as base
      if (classId === 'clase1') return;
      updated = publishedClasses.filter((id) => id !== classId);
    } else {
      updated = [...publishedClasses, classId];
    }
    setPublishedClasses(updated);
    localStorage.setItem('aula_bdd_published_classes', JSON.stringify(updated));
  };

  const login = (email: string, passwordInput: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = passwordInput.trim();
    const teacherLower = TEACHER_OFFICIAL_EMAIL.toLowerCase();

    // Check if Teacher
    if (trimmedEmail === teacherLower) {
      const isTeacherPassValid = 
        trimmedPass === TEACHER_DEFAULT_PASSWORD || 
        trimmedPass.toLowerCase() === 'cristian' ||
        trimmedPass.toLowerCase() === 'docente';
      
      if (!isTeacherPassValid) {
        return {
          success: false,
          error: 'Contraseña de docente incorrecta. (Clave por defecto: "Docente2026!" o "cristian")'
        };
      }

      setUser(DEFAULT_TEACHER);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
      return { success: true };
    }

    // Check if Student in Roster
    const student = studentsList.find((s) => s.email.toLowerCase() === trimmedEmail);
    if (!student) {
      return {
        success: false,
        error: `El correo "${email}" no está en la nómina de la cátedra. Contacta al docente Mag. Cristian Correa.`
      };
    }

    // Student password is their first name (clean uppercase or lowercase)
    const expectedFirstName = getFirstName(student.firstName);
    const enteredPassClean = getFirstName(trimmedPass);

    if (expectedFirstName !== enteredPassClean) {
      return {
        success: false,
        error: 'Contraseña incorrecta. Recuerda que para alumnos tu clave es tu primer nombre (ej: ' + student.firstName.split(' ')[0] + ').'
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

  const loginAsStudent = (studentEmail: string) => {
    const student = studentsList.find((s) => s.email.toLowerCase() === studentEmail.toLowerCase());
    if (student) {
      login(student.email, student.firstName.split(' ')[0]);
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

  const addStudent = (studentData: Omit<StudentUser, 'id' | 'defaultPassword'>) => {
    const firstNameClean = studentData.firstName.trim().split(' ')[0].toUpperCase();
    const newStudent: StudentUser = {
      ...studentData,
      id: Date.now().toString(),
      defaultPassword: firstNameClean
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
        publishedClasses,
        login,
        logout,
        addXp,
        loginAsTeacher,
        loginAsStudent,
        addStudent,
        removeStudent,
        updateStudent,
        togglePublishClass
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
