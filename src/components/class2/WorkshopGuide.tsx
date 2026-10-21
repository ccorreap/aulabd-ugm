'use client';

import React, { useState } from 'react';
import { WORKSHOP_DETAILS } from '@/data/class2Data';
import { Sparkles, Calendar, CheckSquare, Award, Video, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export const WorkshopGuide: React.FC = () => {
  const [showRubric, setShowRubric] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const checklist = [
    'Propuesta de Negocio Sistémico: Definir Entradas, Procesos, Salidas y Retroalimentación.',
    'Lienzo Canvas: Completar los 9 bloques con coherencia entre Propuesta de Valor y Clientes.',
    '5 Requerimientos Funcionales (RF): Redactados como acciones claras del sistema ("El qué").',
    '5 Requerimientos No Funcionales (RNF): Definidos con métricas claras (seguridad, velocidad, escala).',
    'Presentación PPT: Visualmente atractiva y estructurada con el contenido del equipo.',
    'Grabación / Video: Exposición clara, fluida y con buen audio de todos los integrantes.'
  ];

  const toggleCheck = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i) => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              Evaluación Oficial de la Cátedra (Láminas 19 y 20)
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {WORKSHOP_DETAILS.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Ponderación: <strong className="text-amber-700">{WORKSHOP_DETAILS.weight}</strong> • Fecha límite: <strong className="text-slate-800">{WORKSHOP_DETAILS.deadline}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Sábado 28/03 (23:59 hrs)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* The 3 Pillars */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Los 3 Pilares Fundamentales del Taller
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WORKSHOP_DETAILS.pillars.map((pillar, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <span className="text-xs font-bold text-blue-600">{pillar.title}</span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {pillar.requirement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Success Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Entregables Obligatorios</span>
            </div>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Presentación (PPT) detallada y profesional.</li>
              <li>• Video / Grabación de la exposición del equipo con buen audio.</li>
              <li>• Carga en la sección habilitada de la plataforma antes del plazo.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-2">
              <Award className="h-4 w-4 text-emerald-600" />
              <span>Criterio de Éxito de la Cátedra</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed font-sans">
              &ldquo;Se valorará la coherencia entre el modelo Canvas y los requerimientos técnicos presentados.&rdquo;
            </p>
          </div>
        </div>

        {/* Interactive Pre-flight Checklist */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-blue-600" />
              <span>Checklist de Preparación para el Grupo ({checkedItems.length}/{checklist.length})</span>
            </h4>
          </div>

          <div className="space-y-2">
            {checklist.map((item, idx) => {
              const isChecked = checkedItems.includes(item);
              return (
                <button
                  key={idx}
                  onClick={() => toggleCheck(item)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50/60 text-emerald-900 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{item}</span>
                  <span
                    className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ml-3 ${
                      isChecked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isChecked && '✓'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Official Rubric Toggle (Slide 20) */}
        <div>
          <button
            onClick={() => setShowRubric(!showRubric)}
            className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <span>Ver Rúbrica Oficial de Calificación (100 puntos en total)</span>
            {showRubric ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showRubric && (
            <div className="mt-3 overflow-x-auto border border-slate-200 rounded-xl animate-fadeIn">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Criterio</th>
                    <th className="p-3 text-center">Puntaje Máx</th>
                    <th className="p-3">Descripción para Logrado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {WORKSHOP_DETAILS.rubric.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{r.criterion}</td>
                      <td className="p-3 text-center font-bold text-amber-600">{r.maxPts} pts</td>
                      <td className="p-3">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
