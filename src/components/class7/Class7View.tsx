'use client';

import React, { useState } from 'react';
import { Database, Search, Shield, Zap, Terminal, Code } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Class7View: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'indices' | 'vistas' | 'dml' | 'consultas'>('indices');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
              Unidad 2 • Cátedra Nº 8
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Clase 7: DML, Consultas SELECT, Índices y Vistas en SQL Server
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Manipulación de datos, consultas con filtros avanzados y estructuras esenciales de optimización (Índices) y seguridad (Vistas).
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('indices')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'indices'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Índices: El Atajo del Motor (Lámina 4)
          </button>
          <button
            onClick={() => setActiveTab('vistas')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'vistas'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Vistas: Ventana de Seguridad (Lámina 5)
          </button>
          <button
            onClick={() => setActiveTab('dml')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'dml'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            3. DML: INSERT, UPDATE y DELETE (Láminas 6-7)
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'consultas'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            4. Consultas SELECT y Filtros (Láminas 7-8)
          </button>
        </div>
      </div>

      {/* Índices */}
      {activeTab === 'indices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold text-amber-600 uppercase">Optimización de Rendimiento</span>
            <h3 className="text-lg font-bold text-slate-900">¿Qué es un Índice en SQL Server?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Es una estructura que permite al motor de base de datos localizar datos rápidamente sin tener que leer toda la tabla fila por fila (evita un costoso <strong>Full Table Scan</strong>).
            </p>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 space-y-1">
              <p>✔️ <strong>Acelera drásticamente:</strong> Consultas con <code>SELECT ... WHERE</code>.</p>
              <p>⚠️ <strong>¡Ojo de Cátedra!</strong> Ralentiza los <code>INSERT</code> y <code>UPDATE</code> porque el índice debe reconstruirse en cada escritura.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 p-6 shadow-lg font-mono text-xs space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
              <Terminal className="h-4 w-4" />
              <span>Sintaxis T-SQL (Lámina 4)</span>
            </div>
            <pre className="text-cyan-300 leading-relaxed overflow-x-auto">
{`-- Crear índice sobre la columna Id_cliente en Pedidos
CREATE INDEX IDX_CLIENTE 
ON Pedidos (Id_cliente);

-- Crear índice compuesto para acelerar búsquedas
CREATE INDEX IDX_ALUMNO_CARRERA 
ON Alumno (ape_alumno, id_carrera);`}
            </pre>
          </div>
        </div>
      )}

      {/* Vistas */}
      {activeTab === 'vistas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase">Seguridad y Abstracción</span>
            <h3 className="text-lg font-bold text-slate-900">Vistas: La Ventana de Seguridad</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Una vista es una <strong>tabla virtual</strong> basada en el resultado de una consulta SQL. No almacena datos físicos en disco; consulta los datos en tiempo real al ejecutarse.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <strong>🔒 Seguridad:</strong> Oculta columnas confidenciales (como sueldos o claves) permitiendo que ciertos usuarios solo vean lo necesario.
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <strong>⚡ Simplicidad:</strong> Resume JOINs complejos de 4 tablas en una sola vista simple.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 p-6 shadow-lg font-mono text-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-slate-800 pb-2">
              <Terminal className="h-4 w-4" />
              <span>Sintaxis T-SQL (Lámina 5)</span>
            </div>
            <pre className="text-purple-300 leading-relaxed overflow-x-auto">
{`CREATE VIEW VW_ALUMNOS_PUBLICOS AS
SELECT 
    nom_alumno, 
    ape_alumno, 
    c.desc_carrera
FROM Alumno a
INNER JOIN Carrera c 
    ON a.id_carrera = c.id_carrera;
GO

-- Los usuarios consultan la vista como si fuera una tabla:
SELECT * FROM VW_ALUMNOS_PUBLICOS;`}
            </pre>
          </div>
        </div>
      )}

      {/* DML */}
      {activeTab === 'dml' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Operaciones DML en la Cátedra (Láminas 6-7)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <span className="font-bold text-emerald-800">INSERT INTO</span>
              <pre className="mt-2 text-slate-800">
{`INSERT INTO carrera 
(ID_CARRERA, DESC_CARRERA)
VALUES (10, 'Ingenieria Informatica');`}
              </pre>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <span className="font-bold text-amber-800">UPDATE ... WHERE</span>
              <pre className="mt-2 text-slate-800">
{`UPDATE notas
SET nota_final = nota_final * 0.9
WHERE id_alumno = 10;`}
              </pre>
            </div>

            <div className="p-4 rounded-xl border border-red-200 bg-red-50/40">
              <span className="font-bold text-red-800">DELETE FROM ... WHERE</span>
              <pre className="mt-2 text-slate-800">
{`DELETE FROM notas 
WHERE id_alumno = 10;`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Consultas */}
      {activeTab === 'consultas' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Filtros y Agrupaciones en SQL Server (Lámina 7-8)</h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b">
                <tr>
                  <th className="p-3">Operador</th>
                  <th className="p-3">Significado</th>
                  <th className="p-3 font-mono">Ejemplo de Cátedra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">BETWEEN</td>
                  <td className="p-3">Contenido en el rango</td>
                  <td className="p-3 font-mono">WHERE edad_alumno BETWEEN 20 AND 25</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">LIKE</td>
                  <td className="p-3">Coincidencia de patrones</td>
                  <td className="p-3 font-mono">WHERE desc_carrera LIKE 'Analista%'</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">GROUP BY</td>
                  <td className="p-3">Agrupa filas por criterio</td>
                  <td className="p-3 font-mono">SELECT desc_carrera, COUNT(*) ... GROUP BY desc_carrera</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">IS NULL</td>
                  <td className="p-3">Comprueba valores nulos</td>
                  <td className="p-3 font-mono">WHERE sueldo IS NULL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
