'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ExcelVsDbLab } from '@/components/ExcelVsDbLab';
import { DataTypesTrainer } from '@/components/DataTypesTrainer';
import { FlashcardsQuiz } from '@/components/FlashcardsQuiz';
import { CanvasExplorer } from '@/components/class2/CanvasExplorer';
import { RequirementsTrainer } from '@/components/class2/RequirementsTrainer';
import { SdlcSimulator } from '@/components/class2/SdlcSimulator';
import { WorkshopGuide } from '@/components/class2/WorkshopGuide';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { useAuth } from '@/context/AuthContext';
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
  Award
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState<'clase1' | 'clase2' | 'docente'>('clase1');
  
  // Sub-tabs for Class 1 (Notice point 4 removed as requested)
  const [class1SubTab, setClass1SubTab] = useState<'excel' | 'types' | 'flashcards'>('excel');

  // Sub-tabs for Class 2 (Catedra 3)
  const [class2SubTab, setClass2SubTab] = useState<'canvas' | 'requirements' | 'sdlc' | 'workshop'>('canvas');

  // State explanation popover
  const [showStatusHelp, setShowStatusHelp] = useState(false);

  // Compute progress for class 1
  const class1TotalActivities = 3;
  const class1Completed = user?.completedActivities.filter(a => a.startsWith('act-') || a.startsWith('card-')).length || 0;
  const class1Percentage = Math.min(100, Math.round((class1Completed / class1TotalActivities) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeMainTab} setActiveTab={setActiveMainTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ========================================================= */}
        {/* CLASE 1 VIEW                                              */}
        {/* ========================================================= */}
        {activeMainTab === 'clase1' && (
          <div className="space-y-6">
            {/* Class 1 Hero Header */}
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

                {/* Status Box with clear explanation */}
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
                    <span>{user ? `${user.xp} XP acumulados` : '0 XP'}</span>
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

              {/* Sub-tabs within Class 1 (Points 1, 2, 3 only) */}
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
        {activeMainTab === 'clase2' && (
          <div className="space-y-6">
            {/* Class 2 Hero Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
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
                    el ciclo de vida SDLC de 7 etapas, la diferencia entre Cascada y Scrum, y el levantamiento de Requerimientos Funcionales y No Funcionales para tu taller evaluativo.
                  </p>
                </div>

                {/* Workshop Alert Badge */}
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center min-w-[220px]">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Taller Evaluativo (20%)
                  </span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    Entrega: 28 de Marzo
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    5 Req. Funcionales + 5 No Funcionales
                  </p>
                </div>
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

                <button
                  onClick={() => setClass2SubTab('workshop')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class2SubTab === 'workshop'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>4. Guía Taller Evaluativo (20%) y Rúbrica</span>
                </button>
              </div>
            </div>

            {/* Active Class 2 Sub-module */}
            <div>
              {class2SubTab === 'canvas' && <CanvasExplorer />}
              {class2SubTab === 'requirements' && <RequirementsTrainer />}
              {class2SubTab === 'sdlc' && <SdlcSimulator />}
              {class2SubTab === 'workshop' && <WorkshopGuide />}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PANEL DOCENTE VIEW                                        */}
        {/* ========================================================= */}
        {activeMainTab === 'docente' && <TeacherDashboard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-800">Universidad Gabriela Mistral</span>
            <span>•</span>
            <span>Ingeniería en Computación e Informática</span>
          </div>
          <div>
            <span>Docente Cátedra: <strong>Mag. Cristian Correa Pacheco</strong> ({user?.email})</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
