'use client';

import React, { useState } from 'react';
import { Sparkles, Users, Box, GitBranch, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Class4View: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'use_cases' | 'class_diagrams'>('use_cases');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
              Unidad 1 • Cátedra Nº 5
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Clase 4: Modelos Gráficos UML: Casos de Uso y Diagramas de Clases
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Representación visual del comportamiento del sistema y estructura de entidades mediante el estándar UML para alimentar el diseño de bases de datos.
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('use_cases')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'use_cases'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Diagramas de Casos de Uso (Láminas 6-8)
          </button>
          <button
            onClick={() => setActiveTab('class_diagrams')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'class_diagrams'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Diagramas de Clases para BD (Láminas 9-10)
          </button>
        </div>
      </div>

      {activeTab === 'use_cases' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase">Casos de Uso de la Cátedra</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Actores, Procesos y Relaciones Include/Extend</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
              <span className="text-xs font-bold text-slate-800">Ejemplo 1: Cajero Automático (Lámina 6)</span>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Actor Cliente:</strong> Retirar Dinero, Cambiar PIN, Consultar Saldo.</li>
                <li>• <strong>Actor Empleado:</strong> Agregar Billetes.</li>
                <li className="text-blue-700 font-medium pt-1">
                  💡 Captura la funcionalidad observable sin especificar aún la organización interna de la base de datos.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
              <span className="text-xs font-bold text-slate-800">Ejemplo 2: Portal Estudiantil (Lámina 7)</span>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Actor Estudiante:</strong> Inscribirse en clase, Ver información.</li>
                <li>• <strong>&lt;&lt;include&gt;&gt;:</strong> Inscribirse en clase incluye obligatoriamente &quot;Verificar Identidad&quot;.</li>
                <li>• <strong>&lt;&lt;extend&gt;&gt;:</strong> Inscribirse en clase puede extenderse opcionalmente a &quot;Comprar libro de texto&quot;.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'class_diagrams' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase">Láminas 9 y 10 de la Cátedra</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">De Clases UML a Tablas Relacionales</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 font-mono">
              <div className="font-bold text-slate-900 border-b pb-1 mb-2">Vehículo</div>
              <p>- dueno: string</p>
              <p>- puertas: int</p>
              <p>- ruedas: int</p>
              <div className="border-t pt-1 mt-2 text-slate-500">
                <p>+ vehiculo()</p>
                <p>+ caracteristicas(): void</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 font-mono">
              <div className="font-bold text-slate-900 border-b pb-1 mb-2">Alquiler (1 a N)</div>
              <p>- nro_alquiler (PK)</p>
              <p>- fecha: date</p>
              <p>- monto_total: decimal</p>
              <div className="border-t pt-1 mt-2 text-slate-500">
                <p>+ crear()</p>
                <p>+ modificar()</p>
                <p>+ cancelar()</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
