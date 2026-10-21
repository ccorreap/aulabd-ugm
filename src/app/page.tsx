'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ExcelVsDbLab } from '@/components/ExcelVsDbLab';
import { DataTypesTrainer } from '@/components/DataTypesTrainer';
import { FlashcardsQuiz } from '@/components/FlashcardsQuiz';
import { ErDiagramExplorer } from '@/components/ErDiagramExplorer';
import { RoadmapView } from '@/components/RoadmapView';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { useAuth } from '@/context/AuthContext';
import { 
  Sparkles, 
  Grid, 
  Binary, 
  BookOpen, 
  GitFork, 
  CheckCircle2, 
  School,
  FileText,
  HelpCircle
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState<'clase1' | 'roadmap' | 'docente'>('clase1');
  const [class1SubTab, setClass1SubTab] = useState<'excel' | 'types' | 'flashcards' | 'diagrams'>('excel');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeMainTab} setActiveTab={setActiveMainTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeMainTab === 'clase1' && (
          <div className="space-y-6">
            {/* Class 1 Hero Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                      Unidad 1 • Sesión 1
                    </span>
                    <span className="text-xs text-slate-400">Semana 1</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Conceptos Básicos, Glosario y Tipos de Datos (SQL Server)
                  </h1>
                  <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Bienvenidos al entorno interactivo de la primera clase de Base de Datos. Aquí podrás poner en práctica
                    lo visto en cátedra: la relación entre Excel y tablas relacionales, la selección precisa de tipos en SQL Server
                    y el análisis del modelo conceptual.
                  </p>
                </div>

                {/* Status Box */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 p-4 text-center min-w-[200px]">
                  <p className="text-xs font-semibold text-blue-700">Tu Estado en Clase 1</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {user?.completedActivities.length ? `${user.completedActivities.length * 20}%` : '0%'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {user ? `${user.xp} puntos acumulados` : 'Inicia sesión para guardar'}
                  </p>
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
                  <span>1. Hoja de Cálculo vs BD</span>
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
                  <span>2. Tipos de Datos (SQL Server)</span>
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
                  <span>3. Tarjetas de Glosario</span>
                </button>

                <button
                  onClick={() => setClass1SubTab('diagrams')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                    class1SubTab === 'diagrams'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <GitFork className="h-4 w-4" />
                  <span>4. Caso Hotel E/R a Físico</span>
                </button>
              </div>
            </div>

            {/* Active Class 1 Sub-module */}
            <div>
              {class1SubTab === 'excel' && <ExcelVsDbLab />}
              {class1SubTab === 'types' && <DataTypesTrainer />}
              {class1SubTab === 'flashcards' && <FlashcardsQuiz />}
              {class1SubTab === 'diagrams' && <ErDiagramExplorer />}
            </div>
          </div>
        )}

        {activeMainTab === 'roadmap' && (
          <RoadmapView onSelectClass1={() => setActiveMainTab('clase1')} />
        )}

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
            <span>Docente Cátedra Nº 2: <strong>Mag. Cristian Correa Pacheco</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
