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
    // 1. Load active user first if exists
    let activeUser: UserProfile | null = null;
    const savedUser = localStorage.getItem('aula_bdd_user');
    if (savedUser) {
      try {
        activeUser = JSON.parse(savedUser);
        setUser(activeUser);
      } catch {
        localStorage.removeItem('aula_bdd_user');
      }
    } else {
      setUser(DEFAULT_TEACHER);
      localStorage.setItem('aula_bdd_user', JSON.stringify(DEFAULT_TEACHER));
      activeUser = DEFAULT_TEACHER;
    }

    // 2. Load and migrate students with real XP synchronization
    const savedStudents = localStorage.getItem('aula_bdd_students');
    let loadedStudents: StudentUser[] = INITIAL_STUDENTS;

    if (savedStudents) {
      try {
        const parsed: StudentUser[] = JSON.parse(savedStudents);
        // Ensure all students have their XP properly populated from INITIAL_STUDENTS or active user
        loadedStudents = INITIAL_STUDENTS.map((initSt) => {
          const found = parsed.find((p) => p.email.toLowerCase() === initSt.email.toLowerCase());
          const currentXp = (found && typeof found.xp === 'number' && found.xp > 0) 
            ? found.xp 
            : initSt.xp;

          // If this student is the active user, take active user's XP
          const finalXp = (activeUser && activeUser.role === 'student' && activeUser.email.toLowerCase() === initSt.email.toLowerCase())
            ? Math.max(activeUser.xp, currentXp)
            : currentXp;

          return {
            ...initSt,
            ...(found || {}),
            xp: finalXp,
            defaultPassword: found?.defaultPassword || initSt.defaultPassword || getFirstName(initSt.firstName),
            status: found?.status || initSt.status || 'Activo'
          };
        });

        // Add any newly created students that weren't in INITIAL_STUDENTS
        parsed.forEach((p) => {
          if (!loadedStudents.some((l) => l.email.toLowerCase() === p.email.toLowerCase())) {
            loadedStudents.push(p);
          }
        });
      } catch {
        loadedStudents = INITIAL_STUDENTS;
      }
    }

    setStudentsList(loadedStudents);
    localStorage.setItem('aula_bdd_students', JSON.stringify(loadedStudents));

    // 3. Load Published Classes
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
  }, []);

  const saveStudents = (newStudents: StudentUser[]) => {
    setStudentsList(newStudents);
    localStorage.setItem('aula_bdd_students', JSON.stringify(newStudents));
  };

  const togglePublishClass = (classId: string) => {
    const isCurrentlyPublished = publishedClasses.includes(classId);
    let updated: string[];
    if (isCurrentlyPublished) {
      if (classId === 'clase1') return; // keep class 1 base
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

    const currentXp = typeof student.xp === 'number' && student.xp > 0 ? student.xp : 100;

    const studentProfile: UserProfile = {
      name: student.fullName,
      email: student.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      career: student.career,
      university: 'Universidad Gabriela Mistral',
      xp: currentXp,
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

    const newXp = (user.xp || 0) + points;
    const newCompleted = [...user.completedActivities, activityId];

    const updatedUser: UserProfile = {
      ...user,
      xp: newXp,
      completedActivities: newCompleted
    };
    setUser(updatedUser);
    localStorage.setItem('aula_bdd_user', JSON.stringify(updatedUser));

    // Real-time synchronization with studentsList in localStorage!
    if (user.role === 'student') {
      const updatedStudents = studentsList.map((st) => {
        if (st.email.toLowerCase() === user.email.toLowerCase()) {
          return {
            ...st,
            xp: newXp,
            completedCount: (st.completedCount || 0) + 1
          };
        }
        return st;
      });
      setStudentsList(updatedStudents);
      localStorage.setItem('aula_bdd_students', JSON.stringify(updatedStudents));
    }
  };

  const addStudent = (studentData: Omit<StudentUser, 'id' | 'defaultPassword'>) => {
    const firstNameClean = studentData.firstName.trim().split(' ')[0].toUpperCase();
    const newStudent: StudentUser = {
      ...studentData,
      id: Date.now().toString(),
      defaultPassword: firstNameClean,
      xp: studentData.xp || 100,
      completedCount: studentData.completedCount || 0
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
