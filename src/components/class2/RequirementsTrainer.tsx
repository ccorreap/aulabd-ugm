'use client';

import React, { useState } from 'react';
import { REQUIREMENTS_PRACTICE_ITEMS, RequirementItem } from '@/data/class2Data';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, HelpCircle, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RequirementsTrainer: React.FC = () => {
  const { addXp, user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'Funcional' | 'No Funcional' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem: RequirementItem = REQUIREMENTS_PRACTICE_ITEMS[currentIndex];

  const handleChoose = (type: 'Funcional' | 'No Funcional') => {
    if (isAnswered) return;
    setSelectedAnswer(type);
    setIsAnswered(true);

    if (type === currentItem.type) {
      setScore((s) => s + 1);
      addXp(25, `req-${currentItem.id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < REQUIREMENTS_PRACTICE_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60 });
      addXp(60, 'req-module-complete');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              <Sparkles className="h-3 w-3" />
              Entrenador Práctico (Láminas 13, 14 y 16)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              Clasificador de Requerimientos: Funcionales vs No Funcionales
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Distingue entre &quot;El QUÉ&quot; (acciones del sistema) y &quot;El CÓMO&quot; (atributos de calidad, seguridad y velocidad).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user?.role === 'teacher' && (
              <span className="hidden sm:inline-block rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-bold border border-purple-200">
                Vista Docente • Pauta: {currentItem.type}
              </span>
            )}
            <div className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
              Pregunta {currentIndex + 1} de {REQUIREMENTS_PRACTICE_ITEMS.length}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentIndex + (isAnswered ? 1 : 0)) / REQUIREMENTS_PRACTICE_ITEMS.length) * 100}%`
            }}
          />
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {!isCompleted ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* The Requirement Statement */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Categoría: {currentItem.category}
                </span>
                <span className="text-[11px] text-slate-400">Análisis para el Modelo de Datos</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                &ldquo;{currentItem.statement}&rdquo;
              </p>
            </div>

            {/* Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Functional Button */}
              <button
                onClick={() => handleChoose('Funcional')}
                disabled={isAnswered}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  isAnswered
                    ? currentItem.type === 'Funcional'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : selectedAnswer === 'Funcional'
                      ? 'border-red-400 bg-red-50 text-red-900'
                      : 'border-slate-200 opacity-50'
                    : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Requerimiento Funcional</span>
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Define el <strong>QUÉ</strong>: una acción, proceso o servicio específico que hace el software.
                </p>
              </button>

              {/* Non-Functional Button */}
              <button
                onClick={() => handleChoose('No Funcional')}
                disabled={isAnswered}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  isAnswered
                    ? currentItem.type === 'No Funcional'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : selectedAnswer === 'No Funcional'
                      ? 'border-red-400 bg-red-50 text-red-900'
                      : 'border-slate-200 opacity-50'
                    : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Requerimiento No Funcional</span>
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Define el <strong>CÓMO</strong>: atributos de calidad (seguridad, velocidad, concurrencia, escala).
                </p>
              </button>
            </div>

            {/* Answer Feedback */}
            {isAnswered && (
              <div
                className={`rounded-xl p-4 text-xs sm:text-sm border animate-fadeIn ${
                  selectedAnswer === currentItem.type
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-amber-200 bg-amber-50 text-amber-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  {selectedAnswer === currentItem.type ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">
                      {selectedAnswer === currentItem.type
                        ? '¡Excelente razonamiento!'
                        : `Respuesta correcta: Requerimiento ${currentItem.type}`}
                    </p>
                    <p className="mt-1 leading-relaxed text-slate-700">
                      {currentItem.justification}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Action */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
                >
                  <span>
                    {currentIndex < REQUIREMENTS_PRACTICE_ITEMS.length - 1
                      ? 'Siguiente Requerimiento'
                      : 'Finalizar Módulo'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion State */
          <div className="text-center py-8 max-w-md mx-auto space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">¡Entrenamiento de Requerimientos Completado!</h4>
            <p className="text-sm text-slate-600">
              Obtuviste <span className="font-bold text-blue-600">{score}</span> de{' '}
              <span className="font-bold">{REQUIREMENTS_PRACTICE_ITEMS.length}</span> aciertos. Ya dominas la distinción entre RF y RNF para el taller evaluativo.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Volver a practicar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
