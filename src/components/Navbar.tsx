'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { ALL_COURSE_CLASSES } from '@/data/courseConfig';
import { 
  Database, 
  GraduationCap, 
  LogOut, 
  Sparkles, 
  UserCircle2, 
  BookOpen,
  HelpCircle,
  EyeOff
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, publishedClasses } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showXpHelp, setShowXpHelp] = useState(false);

  // For students: ONLY classes in publishedClasses are visible
  // For teacher: can see all classes or published ones
  const visibleClasses = ALL_COURSE_CLASSES.filter((cls) => {
    if (user?.role === 'teacher') return true; // Teacher can see all
    return publishedClasses.includes(cls.id); // Student only sees published
  });

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Course Info */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                    AulaBD <span className="text-blue-600">UGM</span>
                  </span>
                  <span className="hidden sm:inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200/60">
                    Cátedra de Base de Datos
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block">
                  Ing. en Computación e Informática • Docente: Mag. Cristian Correa Pacheco
                </p>
              </div>
            </div>

            {/* Navigation Tabs (Dynamic based on teacher's publication status) */}
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              {visibleClasses.map((cls) => {
                const isActive = activeTab === cls.id;
                const isPublished = publishedClasses.includes(cls.id);

                return (
                  <button
                    key={cls.id}
                    onClick={() => setActiveTab(cls.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cls.shortTitle}</span>
                    {user?.role === 'teacher' && !isPublished && (
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-mono">
                        Oculta
                      </span>
                    )}
                  </button>
                );
              })}

              {user?.role === 'teacher' && (
                <button
                  onClick={() => setActiveTab('docente')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                    activeTab === 'docente'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Panel Docente</span>
                </button>
              )}
            </nav>

            {/* User Profile / Auth */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* XP Badge with Help Explanation */}
                  <div className="relative">
                    <button
                      onClick={() => setShowXpHelp(!showXpHelp)}
                      className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200 hover:bg-amber-100 transition"
                      title="Haz clic para ver qué son los puntos XP"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      <span>{user.xp} XP</span>
                      <HelpCircle className="h-3 w-3 text-amber-600 opacity-60" />
                    </button>

                    {showXpHelp && (
                      <div className="absolute right-0 top-9 z-50 w-64 rounded-xl bg-slate-900 text-white p-3 text-xs shadow-xl border border-slate-700 animate-fadeIn">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-700">
                          <span className="font-bold text-amber-400">¿Qué son los XP?</span>
                          <button onClick={() => setShowXpHelp(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <p className="mt-1.5 text-slate-300 leading-relaxed">
                          <strong>XP = Puntos de Experiencia.</strong> Es un indicador lúdico: cada vez que completas un ejercicio práctico o aciertas preguntas, sumas puntos para validar tu constancia de estudio.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Profile info with distinct role styling */}
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center justify-end gap-1.5">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {user.name}
                      </p>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                          user.role === 'teacher'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {user.role === 'teacher' ? 'Docente' : 'Alumno'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      title="Cambiar usuario o perfil"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition"
                    >
                      <UserCircle2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={logout}
                      title="Cerrar sesión"
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
                >
                  <UserCircle2 className="h-4 w-4" />
                  <span>Ingreso Institucional</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
