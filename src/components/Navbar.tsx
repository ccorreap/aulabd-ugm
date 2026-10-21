'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { UgmLogo } from './UgmLogo';
import { ALL_COURSE_CLASSES } from '@/data/courseConfig';
import { 
  GraduationCap, 
  LogOut, 
  Sparkles, 
  UserCircle2, 
  HelpCircle,
  ChevronDown,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, publishedClasses } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showXpHelp, setShowXpHelp] = useState(false);
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);

  // Filter classes according to role
  const visibleClasses = ALL_COURSE_CLASSES.filter((cls) => {
    if (user?.role === 'teacher') return true;
    return publishedClasses.includes(cls.id);
  });

  const currentClassObj = ALL_COURSE_CLASSES.find((c) => c.id === activeTab);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Official UGM Logo & Platform Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <UgmLogo variant="shield" size={38} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0F2B5C] tracking-tight text-base sm:text-lg">
                    AulaBD <span className="text-[#00A3E0]">UGM</span>
                  </span>
                  <span className="hidden md:inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200/60">
                    Cátedra Base de Datos
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block leading-tight">
                  Ing. en Computación e Informática • Mag. Cristian Correa
                </p>
              </div>
            </div>

            {/* Center Navigation: Clean, elegant, and ordered */}
            <nav className="flex items-center gap-2">
              {/* If Teacher: Show Panel Docente prominently as FIRST control */}
              {user?.role === 'teacher' && (
                <button
                  onClick={() => setActiveTab('docente')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                    activeTab === 'docente'
                      ? 'bg-purple-700 text-white shadow-purple-500/20'
                      : 'border border-purple-200 bg-purple-50/70 text-purple-900 hover:bg-purple-100'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Panel y Control Docente</span>
                </button>
              )}

              {/* Class Selector: Dropdown for clean space & no clutter */}
              <div className="relative">
                <button
                  onClick={() => setIsClassMenuOpen(!isClassMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    activeTab.startsWith('clase')
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>
                    {activeTab.startsWith('clase') && currentClassObj
                      ? `${currentClassObj.shortTitle}: ${currentClassObj.catedraNumber}`
                      : 'Seleccionar Clase'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-80" />
                </button>

                {isClassMenuOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                      Clases del Semestre ({visibleClasses.length})
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-1">
                      {visibleClasses.map((cls) => {
                        const isSelected = activeTab === cls.id;
                        const isPublished = publishedClasses.includes(cls.id);

                        return (
                          <button
                            key={cls.id}
                            onClick={() => {
                              setActiveTab(cls.id);
                              setIsClassMenuOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-50 font-bold text-blue-900 border border-blue-200'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">{cls.shortTitle}</span>
                                <span className="text-[10px] text-slate-400">({cls.catedraNumber})</span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-normal line-clamp-1">
                                {cls.description}
                              </p>
                            </div>
                            {user?.role === 'teacher' && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                  isPublished
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {isPublished ? 'Visible' : 'Oculta'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right: User Profile & Logout */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* XP Badge */}
                  <div className="relative">
                    <button
                      onClick={() => setShowXpHelp(!showXpHelp)}
                      className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200 hover:bg-amber-100 transition"
                      title="Ver qué son los XP"
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
                          <strong>XP = Puntos de Experiencia.</strong> Indicador formativo que premia a los alumnos por resolver los retos y repasar los contenidos clase a clase.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Profile info */}
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center justify-end gap-1.5">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {user.name}
                      </p>
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${
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

                  <button
                    onClick={logout}
                    title="Cerrar sesión e ir al login"
                    className="flex items-center gap-1 p-2 text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 border border-slate-200 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-xs font-semibold hidden md:inline">Salir</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
