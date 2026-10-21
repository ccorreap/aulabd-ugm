'use client';

import React, { useState } from 'react';
import { HOTEL_ER_SAMPLE } from '@/data/class1Data';
import { Sparkles, Database, Layers, ArrowRight, Code } from 'lucide-react';

export const ErDiagramExplorer: React.FC = () => {
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(0);
  const activeEntity = HOTEL_ER_SAMPLE.entities[selectedEntityIndex];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/50 p-4 sm:p-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
          <Sparkles className="h-3 w-3" />
          Del Modelo Conceptual al Físico (Láminas 9 y 11)
        </div>
        <h3 className="text-lg font-bold text-slate-800 mt-1">
          {HOTEL_ER_SAMPLE.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          {HOTEL_ER_SAMPLE.description}
        </p>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Entity Selector */}
        <div className="lg:col-span-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Entidades del Caso de Estudio
          </h4>
          <div className="space-y-1.5">
            {HOTEL_ER_SAMPLE.entities.map((entity, idx) => (
              <button
                key={entity.name}
                onClick={() => setSelectedEntityIndex(idx)}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${
                  selectedEntityIndex === idx
                    ? 'border-emerald-500 bg-emerald-50/80 font-bold text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-600" />
                  <span>{entity.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">
                  {entity.attributes.length} atributos
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-200">
            💡 <strong>Regla de diseño:</strong> En el modelo conceptual de la diapositiva 9, las cardinalidades 1 a N determinan en qué tabla se colocará la Clave Foránea (FK).
          </div>
        </div>

        {/* Detailed Transformation View */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                1. Atributos Conceptuales (Óvalos del Diagrama)
              </span>
              <span className="text-xs text-slate-400">Modelo E/R</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeEntity.attributes.map((attr) => {
                const isPk = attr.includes('(PK)');
                const isFk = attr.includes('(FK)');
                return (
                  <span
                    key={attr}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-mono font-medium border ${
                      isPk
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-800 font-bold'
                        : isFk
                        ? 'border-blue-300 bg-blue-50 text-blue-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {attr}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-400 py-1">
            <ArrowRight className="h-5 w-5" />
            <span className="text-xs font-medium ml-1">Traducción a SQL Server (T-SQL)</span>
          </div>

          {/* SQL Server Code Block */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-200 p-4 font-mono text-xs shadow-lg">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-3 font-sans">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <Code className="h-4 w-4" />
                <span>Script DDL Generado</span>
              </div>
              <span className="text-[11px]">SQL Server Management Studio (SSMS)</span>
            </div>
            <pre className="overflow-x-auto text-emerald-300 leading-relaxed font-mono">
              {activeEntity.sqlServerTable}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
