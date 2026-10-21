'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SQL_SERVER_DATA_TYPES_QUESTIONS } from '@/data/class1Data';
import { 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DataTypesTrainer: React.FC = () => {
  const { addXp, user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = SQL_SERVER_DATA_TYPES_QUESTIONS[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleVerify = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      addXp(25, `act-types-${currentQ.id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < SQL_SERVER_DATA_TYPES_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 80, spread: 60 });
      addXp(50, 'act-types-complete');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
              <Sparkles className="h-3 w-3" />
              Simulador Práctico (Láminas 7 y 8)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              Selección de Tipos de Datos en Microsoft SQL Server
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Analiza los requerimientos de la cátedra y escoge el tipo de dato óptimo en T-SQL.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user?.role === 'teacher' && (
              <span className="hidden sm:inline-block rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-bold border border-purple-200">
                Vista Docente • Pauta: {currentQ.correctAnswer}
              </span>
            )}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Pregunta {currentIndex + 1} de {SQL_SERVER_DATA_TYPES_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{
              width: `${((currentIndex + (isAnswered ? 1 : 0)) / SQL_SERVER_DATA_TYPES_QUESTIONS.length) * 100}%`
            }}
          />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!isCompleted ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Scenario Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Categoría: {currentQ.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400">SQL Server 2022/Azure</span>
              </div>
              <h4 className="text-base font-bold text-slate-800">{currentQ.title}</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{currentQ.scenario}</p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQ.correctAnswer;

                let buttonStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700';

                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'border-red-400 bg-red-50 text-red-700 ring-2 ring-red-400/20';
                  } else {
                    buttonStyle = 'border-slate-200 opacity-50 text-slate-400';
                  }
                } else if (isSelected) {
                  buttonStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-mono transition text-left ${buttonStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback / SQL Server Tip */}
            {isAnswered && (
              <div className="space-y-3 animate-fadeIn">
                <div
                  className={`rounded-xl p-4 text-xs sm:text-sm border ${
                    selectedOption === currentQ.correctAnswer
                      ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                      : 'border-amber-200 bg-amber-50/80 text-amber-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {selectedOption === currentQ.correctAnswer ? '¡Excelente elección!' : 'Revisión técnica:'}
                      </p>
                      <p className="mt-1 leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* SQL Server specific tip */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-200 p-3.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-indigo-400 mb-1 font-sans font-semibold">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Nota para la Cátedra (SQL Server)</span>
                  </div>
                  <p className="text-slate-300 font-sans">{currentQ.sqlServerNote}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {!isAnswered ? (
                <button
                  onClick={handleVerify}
                  disabled={!selectedOption}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
                >
                  Comprobar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition shadow-md shadow-indigo-500/20"
                >
                  <span>
                    {currentIndex < SQL_SERVER_DATA_TYPES_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion State */
          <div className="text-center py-8 max-w-md mx-auto space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">¡Módulo de Tipos de Datos Completado!</h4>
            <p className="text-sm text-slate-600">
              Obtuviste <span className="font-bold text-indigo-600">{score}</span> de{' '}
              <span className="font-bold">{SQL_SERVER_DATA_TYPES_QUESTIONS.length}</span> aciertos en SQL Server.
            </p>
            <div className="pt-2">
              <button
                onClick={handleRestart}
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
