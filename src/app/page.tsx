'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LoginPage } from '@/components/LoginPage';
import { ExcelVsDbLab } from '@/components/ExcelVsDbLab';
import { DataTypesTrainer } from '@/components/DataTypesTrainer';
import { FlashcardsQuiz } from '@/components/FlashcardsQuiz';
import { CanvasExplorer } from '@/components/class2/CanvasExplorer';
import { RequirementsTrainer } from '@/components/class2/RequirementsTrainer';
import { SdlcSimulator } from '@/components/class2/SdlcSimulator';
import { Class3View } from '@/components/class3/Class3View';
import { Class4View } from '@/components/class4/Class4View';
import { Class5View } from '@/components/class5/Class5View';
import { Class6View } from '@/components/class6/Class6View';
import { Class7View } from '@/components/class7/Class7View';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { useAuth } from '@/context/AuthContext';
import { UgmLogo } from '@/components/UgmLogo';
import { 
  Grid, 
  Binary, 
  BookOpen, 
  School,
  Sparkles,
  HelpCircle,
  Tv,
  CheckCircle,
  Layers,
  Lock,
  EyeOff
} from 'lucide-react';

export default function Home() {
  const { user, publishedClasses, isLoading } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState<string>('clase1');
  
  // Sub-tabs for Class 1
  const [class1SubTab, setClass1SubTab] = useState<'excel' | 'types' | 'flashcards'>('excel');

  // Sub-tabs for Class 2
  const [class2SubTab, setClass2SubTab] = useState<'canvas' | 'requirements' | 'sdlc'>('canvas');

  // State explanation popover
  const [showStatusHelp, setShowStatusHelp] = useState(false);

  // Loading state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-[#0F2B5C] to-slate-950 text-white">
        <UgmLogo variant="shield" size={64} />
        <p className="mt-4 text-xs font-semibold text-slate-300 animate-pulse">
          Cargando Aula Virtual UGM...
        </p>
      </div>
    );
  }

  // If user is not logged in, immediately show the dedicated Login Page!
  if (!user) {
    return <LoginPage />;
  }

  // Compute progress for class 1
  const class1TotalActivities = 3;
  const class1Completed = user.completedActivities.filter(a => a.startsWith('act-') || a.startsWith('card-')).length || 0;
  const class1Percentage = Math.min(100, Math.round((class1Completed / class1TotalActivities) * 100));

  const isCurrentClassPublished = publishedClasses.includes(activeMainTab);
  const isTeacher = user.role === 'teacher';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeMainTab} setActiveTab={setActiveMainTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If student tries to see an unpublished class */}
        {activeMainTab !== 'docente' && !isCurrentClassPublished && !isTeacher && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center max-w-md mx-auto space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Clase aún no liberada</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              El docente <strong>Mag. Cristian Correa Pacheco</strong> habilitará esta clase una vez realizada la sesión presencial de la cátedra.
            </p>
            <button
              onClick={() => setActiveMainTab('clase1')}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
            >
              Ir a Clase 1
            </button>
          </div>
        )}

        {/* Banner if teacher is previewing an unpublished class */}
        {activeMainTab !== 'docente' && !isCurrentClassPublished && isTeacher && (
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-amber-700" />
              <span>
                <strong>Modo Vista Previa Docente:</strong> Esta clase está oculta actualmente para los alumnos. Puedes liberarla en cualquier momento desde el Panel Docente.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CLASE 1 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase1' && (isCurrentClassPublished || isTeacher) && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                      Unidad 1 • Cátedra Nº 2
                    </span>
                    <span className="text-xs text-slate-400">Semana 1</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Clase 1: Conceptos Básicos, Glosario y Tipos de Datos (SQL Server)
                  </h1>
                  <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Repaso interactivo de los fundamentos de bases de datos: equivalencia entre hojas de cálculo (Excel) y tablas relacionales, selección de tipos de datos en Microsoft SQL Server y glosario teórico de términos clave.
                  </p>
                </div>

                {/* Status Box */}
                <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 p-4 text-center min-w-[220px]">
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-blue-700">
                    <span>Tu Progreso en Clase 1</span>
                    <button
                      onClick={() => setShowStatusHelp(!showStatusHelp)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Haz clic para ver qué significa"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {class1Percentage}%
                  </p>

                  <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-100/70 rounded-full px-2 py-0.5">
                    <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>{user.xp} XP acumulados</span>
                  </div>

                  {showStatusHelp && (
                    <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl bg-slate-900 text-white p-3 text-xs shadow-2xl border border-slate-700 text-left animate-fadeIn">
                      <div className="flex justify-between items-center pb-1 border-b border-slate-700 font-bold text-blue-300">
                        <span>¿Qué significan estos datos?</span>
                        <button onClick={() => setShowStatusHelp(false)} className="text-slate-400">✕</button>
                      </div>
                      <p className="mt-2 text-slate-300 leading-relaxed">
                        • <strong>Porcentaje (%):</strong> Mide cuántas de las 3 actividades prácticas de esta clase has completado.
                      </p>
                      <p className="mt-1 text-slate-300 leading-relaxed">
                        • <strong>XP (Puntos de Experiencia):</strong> Puntos que ganas al resolver preguntas de SQL Server y estudiar tarjetas de glosario.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-tabs within Class 1 */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
                <button
                  onClick={() => setClass1SubTab('excel')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class1SubTab === 'excel'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  <span>1. Hoja de Cálculo vs BD (Lámina 10)</span>
                </button>

                <button
                  onClick={() => setClass1SubTab('types')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class1SubTab === 'types'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Binary className="h-4 w-4" />
                  <span>2. Tipos de Datos SQL Server (Láminas 7 y 8)</span>
                </button>

                <button
                  onClick={() => setClass1SubTab('flashcards')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class1SubTab === 'flashcards'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>3. Tarjetas de Glosario (Láminas 4, 5 y 6)</span>
                </button>
              </div>
            </div>

            {/* Active Class 1 Sub-module */}
            <div>
              {class1SubTab === 'excel' && <ExcelVsDbLab />}
              {class1SubTab === 'types' && <DataTypesTrainer />}
              {class1SubTab === 'flashcards' && <FlashcardsQuiz />}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CLASE 2 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase2' && (isCurrentClassPublished || isTeacher) && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                    Unidad 1 • Cátedra Nº 3
                  </span>
                  <span className="text-xs text-slate-400">Semana 2</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Clase 2: Fundamentos de Sistemas de Información, Modelos y Requerimientos TI
                </h1>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Aprende a conectar el modelo de negocio con la arquitectura de datos: los 9 bloques del Canvas (Caso Netflix),
                  el ciclo de vida SDLC de 7 etapas, la diferencia entre Cascada y Scrum, y el levantamiento de Requerimientos Funcionales y No Funcionales.
                </p>
              </div>

              {/* Sub-tabs within Class 2 */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
                <button
                  onClick={() => setClass2SubTab('canvas')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class2SubTab === 'canvas'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Tv className="h-4 w-4" />
                  <span>1. Modelo Canvas (Caso Netflix)</span>
                </button>

                <button
                  onClick={() => setClass2SubTab('requirements')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class2SubTab === 'requirements'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>2. Requerimientos: Funcionales vs No Funcionales</span>
                </button>

                <button
                  onClick={() => setClass2SubTab('sdlc')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class2SubTab === 'sdlc'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>3. Ciclo de Vida (SDLC) & Cascada vs Scrum</span>
                </button>
              </div>
            </div>

            {/* Active Class 2 Sub-module */}
            <div>
              {class2SubTab === 'canvas' && <CanvasExplorer />}
              {class2SubTab === 'requirements' && <RequirementsTrainer />}
              {class2SubTab === 'sdlc' && <SdlcSimulator />}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CLASE 3 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase3' && (isCurrentClassPublished || isTeacher) && (
          <Class3View />
        )}

        {/* ========================================================= */}
        {/* CLASE 4 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase4' && (isCurrentClassPublished || isTeacher) && (
          <Class4View />
        )}

        {/* ========================================================= */}
        {/* CLASE 5 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase5' && (isCurrentClassPublished || isTeacher) && (
          <Class5View />
        )}

        {/* ========================================================= */}
        {/* CLASE 6 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase6' && (isCurrentClassPublished || isTeacher) && (
          <Class6View />
        )}

        {/* ========================================================= */}
        {/* CLASE 7 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase7' && (isCurrentClassPublished || isTeacher) && (
          <Class7View />
        )}

        {/* ========================================================= */}
        {/* PANEL DOCENTE VIEW (Con perfilamiento estricto)           */}
        {/* ========================================================= */}
        {activeMainTab === 'docente' && (
          isTeacher ? (
            <TeacherDashboard />
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center max-w-lg mx-auto space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <School className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-red-900">Acceso Restringido</h3>
              <p className="text-xs text-red-700 leading-relaxed">
                Esta sección es de uso exclusivo para el docente de la cátedra (<strong>Mag. Cristian Correa Pacheco</strong>). Tu cuenta actual ({user.email}) tiene perfil de <strong>Alumno</strong>.
              </p>
              <button
                onClick={() => setActiveMainTab('clase1')}
                className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
              >
                Volver a la Clase 1
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer with UGM branding */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <UgmLogo variant="shield" size={24} />
            <span className="font-bold text-[#0F2B5C]">Universidad Gabriela Mistral</span>
            <span>•</span>
            <span>Ingeniería en Computación e Informática</span>
          </div>
          <div>
            <span>Docente Cátedra: <strong>Mag. Cristian Correa Pacheco</strong> ({user.email})</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
