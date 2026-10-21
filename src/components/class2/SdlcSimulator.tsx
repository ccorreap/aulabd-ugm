'use client';

import React, { useState } from 'react';
import { SDLC_STAGES } from '@/data/class2Data';
import { Sparkles, Layers, RefreshCw, GitMerge, CheckCircle2, ArrowRight } from 'lucide-react';

export const SdlcSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [viewMode, setViewMode] = useState<'sdlc' | 'methodologies'>('sdlc');

  const selectedStage = SDLC_STAGES.find((s) => s.step === activeStep) || SDLC_STAGES[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3 w-3" />
              Ciclo de Vida y Metodologías (Láminas 5, 7 y 8)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              Ciclo de Vida del Sistema de BD & Modelos de Desarrollo
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Explora las 7 etapas del SDLC y compara la metodología Cascada (Waterfall) con Scrum (Ágil).
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-medium">
            <button
              onClick={() => setViewMode('sdlc')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'sdlc'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Etapas SDLC
            </button>
            <button
              onClick={() => setViewMode('methodologies')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'methodologies'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cascada vs Scrum
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {viewMode === 'sdlc' ? (
          <div className="space-y-6">
            {/* The 7 Steps as an interactive visual track */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SDLC_STAGES.map((st) => {
                const isActive = activeStep === st.step;
                const isPast = activeStep > st.step;

                return (
                  <button
                    key={st.step}
                    onClick={() => setActiveStep(st.step)}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center relative ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : isPast
                        ? 'border-slate-200 bg-slate-50 text-slate-700'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold mb-1.5 ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className="text-xs font-semibold leading-tight line-clamp-1">
                      {st.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Etapa Nº {selectedStage.step} de 7
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedStage.name}
                </h4>
                <p className="text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                  {selectedStage.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeStep > 1 && (
                  <button
                    onClick={() => setActiveStep((s) => s - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Anterior
                  </button>
                )}
                {activeStep < 7 && (
                  <button
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Waterfall vs Scrum Comparison (Slides 7 and 8) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Waterfall */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Metodología Tradicional (Lámina 7)
                </span>
                <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                  Secuencial
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Modelo en Cascada (Waterfall)</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consiste en varias etapas bien definidas que se van desarrollando de manera ordenada, una después de la otra (Análisis $\rightarrow$ Diseño $\rightarrow$ Implementación $\rightarrow$ Pruebas $\rightarrow$ Mantenimiento).
              </p>
              <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Ventaja:</strong> Requerimientos cerrados y etapas muy claras.</p>
                <p><strong>Desventaja en BD:</strong> Si los requerimientos cambian al final, modificar la estructura de la base de datos es muy costoso.</p>
              </div>
            </div>

            {/* Scrum */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Metodología Ágil (Lámina 8)
                </span>
                <span className="rounded-md bg-blue-200 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                  Iterativa e Incremental
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Scrum Process</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Se desarrolla en etapas cortas (Sprints de 2 a 4 semanas) en las que se entregan incrementos funcionales del producto. Dos palabras clave de la cátedra: <strong>interactivo</strong> e <strong>incremental</strong>.
              </p>
              <div className="rounded-xl bg-white p-3 border border-blue-200 text-xs text-slate-600 space-y-1">
                <p><strong>Elementos clave:</strong> Product Backlog, Sprint Backlog, Daily, Sprint Review y Retrospectiva.</p>
                <p><strong>Impacto en BD:</strong> Las tablas se modelan y refactorizan en versiones evolutivas (migraciones).</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
