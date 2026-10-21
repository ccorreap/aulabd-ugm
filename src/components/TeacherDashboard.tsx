'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  GraduationCap, 
  Download,
  Lightbulb,
  School
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  const mockStudents = [
    { name: 'Matías Silva Araya', email: 'matias.silva@alumnos.ugm.cl', score: 95, status: 'Completado', time: 'hace 2 horas' },
    { name: 'Francisca Valenzuela', email: 'francisca.v@alumnos.ugm.cl', score: 88, status: 'Completado', time: 'hace 4 horas' },
    { name: 'Joaquín Morales Rojas', email: 'j.morales@alumnos.ugm.cl', score: 72, status: 'En Progreso', time: 'hace 1 día' },
    { name: 'Camila González Soto', email: 'c.gonzalez@alumnos.ugm.cl', score: 90, status: 'Completado', time: 'hace 1 día' },
    { name: 'Sebastián Tapia Vega', email: 's.tapia@alumnos.ugm.cl', score: 65, status: 'En Progreso', time: 'hace 2 días' },
    { name: 'Valentina Muñoz Castro', email: 'v.munoz@alumnos.ugm.cl', score: 100, status: 'Completado', time: 'hace 3 días' }
  ];

  const diagnosticAlerts = [
    {
      title: 'Confusión común: BOOLEAN vs BIT en SQL Server',
      desc: 'El 58% de los alumnos intentó seleccionar BOOLEAN en lugar de BIT para el campo EsActivo.',
      recommendation: 'Reforzar en los primeros 5 minutos de la Clase 2 que Microsoft SQL Server usa BIT (1/0/NULL).',
      severity: 'warning'
    },
    {
      title: 'Excelente dominio en Claves Primarias (PK)',
      desc: 'El 92% de los estudiantes identificó correctamente el campo Código como identificador unívoco en el laboratorio de Excel.',
      recommendation: 'Están listos para avanzar a relaciones 1:N y claves foráneas (FK).',
      severity: 'success'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              <GraduationCap className="h-4 w-4" />
              Vista Exclusiva del Docente
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">
              Panel de Analítica y Diagnóstico de la Cátedra
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Docente: {user?.name || 'Mag. Cristian Correa Pacheco'} • Universidad Gabriela Mistral
            </p>
          </div>

          <button
            onClick={() => alert('Generando informe consolidado en formato CSV / Excel...')}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md transition"
          >
            <Download className="h-4 w-4" />
            <span>Descargar Reporte del Curso</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Alumnos Activos</p>
            <p className="text-2xl font-bold text-white mt-0.5">38 / 42</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Tasa de Finalización Clase 1</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">84%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Promedio de Aciertos Tipos</p>
            <p className="text-2xl font-bold text-indigo-400 mt-0.5">4.2 / 5.0</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Tiempo Medio de Práctica</p>
            <p className="text-2xl font-bold text-amber-400 mt-0.5">18 min</p>
          </div>
        </div>
      </div>

      {/* Pedagogical Insights / Alerts for the Professor */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span>Diagnóstico Pedagógico Automático</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diagnosticAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 text-xs sm:text-sm ${
                alert.severity === 'warning'
                  ? 'border-amber-200 bg-amber-50/70 text-amber-900'
                  : 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {alert.severity === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
                <span>{alert.title}</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-2">{alert.desc}</p>
              <div className="rounded-lg bg-white/70 p-2 text-xs font-medium border border-black/5">
                💡 <strong>Sugerencia para tu próxima clase:</strong> {alert.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Progreso Individual de Alumnos (Correo Institucional)
            </h3>
            <p className="text-xs text-slate-500">
              Estudiantes registrados con dominio @alumnos.ugm.cl
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Total: {mockStudents.length} registros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 sm:p-4">Estudiante</th>
                <th className="p-3 sm:p-4">Correo Institucional</th>
                <th className="p-3 sm:p-4">Puntaje</th>
                <th className="p-3 sm:p-4">Estado</th>
                <th className="p-3 sm:p-4">Última Actividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
              {mockStudents.map((st, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 sm:p-4 font-sans font-semibold text-slate-900">{st.name}</td>
                  <td className="p-3 sm:p-4 text-slate-500">{st.email}</td>
                  <td className="p-3 sm:p-4 font-bold text-indigo-600">{st.score} pts</td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${
                        st.status === 'Completado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-slate-400 font-sans text-[11px]">{st.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
