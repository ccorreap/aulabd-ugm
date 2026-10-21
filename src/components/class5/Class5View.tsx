'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Split, Database, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Class5View: React.FC = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState<'1fn' | '2fn' | '3fn' | 'resumen'>('1fn');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
              Unidad 1 • Cátedra Nº 5 (Parte 2)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Clase 5: Normalización de Bases de Datos (1FN - 2FN - 3FN)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Aprende el proceso paso a paso para simplificar estructuras complejas, eliminar redundancias y evitar anomalías de inserción, actualización y borrado.
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveStep('1fn')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeStep === '1fn'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1FN: Atomicidad (Lámina 6)
          </button>
          <button
            onClick={() => setActiveStep('2fn')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeStep === '2fn'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2FN: Dependencia Total (Láminas 7-8)
          </button>
          <button
            onClick={() => setActiveStep('3fn')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeStep === '3fn'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            3FN: Dependencias Transitivas (Lámina 9)
          </button>
          <button
            onClick={() => setActiveStep('resumen')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeStep === 'resumen'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Resumen y Beneficios (Lámina 14)
          </button>
        </div>
      </div>

      {/* 1FN View */}
      {activeStep === '1fn' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-700 uppercase">Primera Forma Normal (1FN)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Valores Atómicos y Eliminación de Grupos Repetidos</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Ninguna celda puede contener múltiples valores (ej: varios números de teléfono en un mismo campo).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-2">
              <span className="text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">❌ ANTES: No cumple 1FN</span>
              <p className="text-xs text-slate-600">
                La columna <code>Telefonos_alumno</code> almacena 2 o 3 números en una sola tupla.
              </p>
              <div className="bg-white p-3 rounded-lg border border-red-200 text-[11px] font-mono">
                <p><strong>Rut:</strong> 18.346.654-k | <strong>Nombre:</strong> Romina</p>
                <p className="text-red-600"><strong>Telefonos:</strong> 934234567, 943758745, 867345378</p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">✔️ DESPUÉS: Cumple 1FN</span>
              <p className="text-xs text-slate-600">
                Se separa en dos tablas: <code>Alumnos</code> y la tabla de detalle <code>Telefonos_Alumnos</code>.
              </p>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-[11px] font-mono space-y-1">
                <p><strong>Tabla Telefonos_Alumnos:</strong></p>
                <p>• 18.346.654-k $\rightarrow$ 934234567</p>
                <p>• 18.346.654-k $\rightarrow$ 943758745</p>
                <p>• 18.346.654-k $\rightarrow$ 867345378</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FN View */}
      {activeStep === '2fn' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-700 uppercase">Segunda Forma Normal (2FN)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Dependencia Funcional Completa de la Clave</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Estar en 1FN y que ningún atributo no clave dependa solo de una PARTE de la clave primaria compuesta.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 leading-relaxed">
            <p>
              En la lámina 7, la clave compuesta es <code>(Rut + Cod_Curso)</code>.
            </p>
            <p className="mt-1">
              • <code>Fecha_Matricula</code> depende de ambos (del alumno y del curso). ✔️
            </p>
            <p>
              • Pero <code>Nombre_tutor</code> depende únicamente del <code>Curso</code>, no del alumno. ❌
            </p>
            <div className="mt-3 p-3 bg-white rounded-lg border border-amber-200 text-amber-900 font-semibold">
              Solución de la Cátedra (Lámina 8): Crear tabla separada <code>Cursos (Curso, Nombre_tutor)</code> y tabla <code>Matrículas (Rut, Curso, Fecha_Matricula)</code>.
            </div>
          </div>
        </div>
      )}

      {/* 3FN View */}
      {activeStep === '3fn' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-700 uppercase">Tercera Forma Normal (3FN)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Eliminación de Dependencias Transitivas</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Estar en 2FN y que ningún atributo no clave dependa funcionalmente de otro atributo no clave.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 leading-relaxed">
            <p>
              En la lámina 9: <code>Rut $\rightarrow$ Ciudad_alumno $\rightarrow$ Comuna_alumno</code>.
            </p>
            <p className="mt-1">
              La comuna depende de la ciudad, generando redundancia cada vez que se repite la ciudad.
            </p>
            <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200 text-emerald-900 font-semibold">
              Solución: Se extrae a una tabla <code>Ciudades (Ciudad_alumno, Comuna_alumno)</code> y en <code>Alumnos</code> solo se conserva la referencia.
            </div>
          </div>
        </div>
      )}

      {/* Resumen View */}
      {activeStep === 'resumen' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Beneficios Clave de la Normalización (Lámina 4 y 14)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-blue-700">1. Integridad de Datos</span>
              <p className="text-slate-600 mt-1">Previene la redundancia y evita que existan datos contradictorios en distintas tablas.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-emerald-700">2. Ahorro de Almacenamiento</span>
              <p className="text-slate-600 mt-1">Optimiza los bytes ocupados en disco y memoria RAM en SQL Server.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-amber-700">3. Crecimiento Vertical</span>
              <p className="text-slate-600 mt-1">Las tablas crecen verticalmente en filas, evitando columnas infinitas hacia el lado.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
