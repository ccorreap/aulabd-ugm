'use client';

import React, { useState } from 'react';
import { Terminal, Database, Trash2, Edit3, PlusCircle, AlertOctagon, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Class6View: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ddl_intro' | 'commands' | 'drop_vs_truncate'>('ddl_intro');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
              Unidad 2 • Cátedra Nº 7
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Clase 6: SQL DDL en Microsoft SQL Server (CREATE, ALTER, DROP, TRUNCATE)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              El Lenguaje de Definición de Datos (DDL) es la construcción y modificación de estructuras de objetos en la base de datos.
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('ddl_intro')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'ddl_intro'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. ¿Qué es DDL? (Lámina 4)
          </button>
          <button
            onClick={() => setActiveTab('commands')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'commands'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Comandos en Acción: UGM (Láminas 5-7)
          </button>
          <button
            onClick={() => setActiveTab('drop_vs_truncate')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'drop_vs_truncate'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            3. DROP vs TRUNCATE vs DELETE (Láminas 8-10)
          </button>
        </div>
      </div>

      {/* Tab 1: Intro */}
      {activeTab === 'ddl_intro' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase">Definición de Cátedra</span>
            <h3 className="text-lg font-bold text-slate-900">DDL = Construcción de Objetos</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              DDL (Data Definition Language) permite crear, modificar y eliminar la estructura de los objetos dentro del gestor de base de datos (tablas, bases de datos, índices, vistas).
            </p>
            <div className="space-y-2 pt-2">
              <div className="p-2.5 rounded-lg border border-slate-200 text-xs">
                <strong>CREATE:</strong> Crea una nueva tabla, base de datos, índice o vista.
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 text-xs">
                <strong>ALTER:</strong> Modifica la estructura de un objeto existente (agrega o altera columnas).
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 text-xs">
                <strong>DROP:</strong> Elimina un objeto de raíz (tanto su estructura como sus datos).
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 text-xs">
                <strong>TRUNCATE:</strong> Vacía por completo una tabla conservando su estructura intacta.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 p-6 shadow-lg font-mono text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
              <Terminal className="h-4 w-4" />
              <span>Consola SQL Server Management Studio</span>
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`-- Crear base de datos de la cátedra
CREATE DATABASE UGM;
GO

USE UGM;
GO

-- Crear tabla Docente
CREATE TABLE DOCENTE (
    ID_DOCENTE INT PRIMARY KEY,
    NOM_DOCENTE CHAR(50),
    APE_DOCENTE CHAR(100),
    INGRESO_DOCENTE INT
);
GO`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: Commands */}
      {activeTab === 'commands' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-emerald-600 uppercase">Lámina 7 de la Cátedra</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Modificación de Tablas con ALTER TABLE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-blue-900">1. Agregar Columna</span>
              <pre className="bg-white p-2.5 rounded border border-blue-200 text-[11px] font-mono text-blue-800">
{`ALTER TABLE ALUMNO
ADD CORREO VARCHAR(255);`}
              </pre>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-purple-900">2. Modificar Tipo de Columna</span>
              <pre className="bg-white p-2.5 rounded border border-purple-200 text-[11px] font-mono text-purple-800">
{`ALTER TABLE ALUMNO
ALTER COLUMN CORREO INT;`}
              </pre>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-red-900">3. Eliminar Columna</span>
              <pre className="bg-white p-2.5 rounded border border-red-200 text-[11px] font-mono text-red-800">
{`ALTER TABLE ALUMNO
DROP COLUMN CORREO;`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: DROP vs TRUNCATE vs DELETE */}
      {activeTab === 'drop_vs_truncate' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-red-600 uppercase">La Gran Diferencia (Láminas 8, 9 y 10)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">DROP vs TRUNCATE vs DELETE</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Comando</th>
                  <th className="p-3">Metáfora de Cátedra</th>
                  <th className="p-3">Tipo Lenguaje</th>
                  <th className="p-3">¿Mantiene Estructura?</th>
                  <th className="p-3">¿Admite WHERE?</th>
                  <th className="p-3">Rendimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-sans">
                <tr className="hover:bg-red-50/40">
                  <td className="p-3 font-bold text-red-700 font-mono">DROP</td>
                  <td className="p-3 font-semibold text-red-900">🔨 Demolición</td>
                  <td className="p-3">DDL</td>
                  <td className="p-3 text-red-600 font-bold">❌ No (desaparece todo)</td>
                  <td className="p-3">No</td>
                  <td className="p-3 font-bold text-emerald-600">Muy Rápido</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-amber-700 font-mono">TRUNCATE</td>
                  <td className="p-3 font-semibold text-amber-900">🧹 Limpieza Profunda</td>
                  <td className="p-3">DDL</td>
                  <td className="p-3 text-emerald-600 font-bold">✔️ Sí (se queda vacía)</td>
                  <td className="p-3">No</td>
                  <td className="p-3 font-bold text-emerald-600">Rápido (mínimo log)</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-blue-700 font-mono">DELETE</td>
                  <td className="p-3 font-semibold text-blue-900">📝 Borrado Selectivo</td>
                  <td className="p-3">DML</td>
                  <td className="p-3 text-emerald-600 font-bold">✔️ Sí</td>
                  <td className="p-3 font-bold text-blue-700">✔️ Sí (con filtro)</td>
                  <td className="p-3 text-slate-500">Más Lento (fila a fila)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
