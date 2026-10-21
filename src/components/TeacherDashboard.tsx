'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StudentUser } from '@/data/students';
import { ALL_COURSE_CLASSES } from '@/data/courseConfig';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Search, 
  GraduationCap, 
  Download, 
  CheckCircle, 
  School,
  X,
  Eye,
  EyeOff,
  BookOpen,
  ToggleLeft,
  ToggleRight,
  Sparkles
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { 
    user, 
    studentsList, 
    addStudent, 
    removeStudent, 
    publishedClasses, 
    togglePublishClass 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New student form state
  const [newLastName, setNewLastName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const filteredStudents = studentsList.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLastName || !newFirstName || !newEmail) return;

    addStudent({
      lastName: newLastName.toUpperCase(),
      firstName: newFirstName.toUpperCase(),
      fullName: `${newFirstName.toUpperCase()} ${newLastName.toUpperCase()}`,
      email: newEmail.toLowerCase().trim(),
      career: 'Ingeniería en Computación e Informática',
      enrolledAt: new Date().toISOString().split('T')[0],
      status: 'Activo'
    });

    setNewLastName('');
    setNewFirstName('');
    setNewEmail('');
    setIsAddModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = 'Apellido,Nombre,Nombre de usuario,Estado,Clave Inicial\n';
    const rows = studentsList
      .map((s) => `"${s.lastName}","${s.firstName}","${s.email}","${s.status}","${s.defaultPassword}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nomina_alumnos_ugm_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              <GraduationCap className="h-4 w-4" />
              Gestión Docente Exclusiva
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">
              Panel de Control de la Cátedra
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Docente: <strong>{user?.name || 'Mag. Cristian Correa Pacheco'}</strong> • {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-md transition"
            >
              <UserPlus className="h-4 w-4" />
              <span>Matricular Alumno</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md transition"
            >
              <Download className="h-4 w-4" />
              <span>Exportar Nómina con Claves</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Total Alumnos Nómina</p>
            <p className="text-2xl font-bold text-white mt-0.5">{studentsList.length} Alumnos</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Clases Publicadas</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">{publishedClasses.length} de {ALL_COURSE_CLASSES.length}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Regla de Contraseñas</p>
            <p className="text-xs font-bold text-indigo-300 mt-1 font-mono">Primer Nombre del alumno</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Motor de Base de Datos</p>
            <p className="text-sm font-bold text-amber-300 mt-1">Microsoft SQL Server</p>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* GESTOR DE PUBLICACIÓN DE CLASES (CONTROL DOCENTE)                  */}
      {/* =================================================================== */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
              <BookOpen className="h-3.5 w-3.5" />
              Liberación Gradual de Clases
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Control de Publicación de Clases para los Alumnos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Activa o desactiva las clases según el avance semestral. Los alumnos <strong>solo verán en la barra superior</strong> las clases que marques como &quot;Publicada&quot;.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            {publishedClasses.length} clases visibles para los estudiantes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_COURSE_CLASSES.map((cls) => {
            const isPublished = publishedClasses.includes(cls.id);
            const isClase1 = cls.id === 'clase1';

            return (
              <div
                key={cls.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isPublished
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Unidad {cls.unit} • {cls.catedraNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPublished
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {isPublished ? 'Publicada' : 'Oculta'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {cls.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cls.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    {isPublished ? 'Visible para alumnos' : 'Oculta para alumnos'}
                  </span>
                  <button
                    onClick={() => togglePublishClass(cls.id)}
                    disabled={isClase1}
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                      isPublished
                        ? isClase1
                          ? 'bg-emerald-100 text-emerald-800 opacity-60 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-800 text-white hover:bg-slate-900'
                    }`}
                  >
                    {isPublished ? (
                      <>
                        <ToggleRight className="h-4 w-4" />
                        <span>Publicada</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-4 w-4" />
                        <span>Liberar Clase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* MANTENEDOR DE ALUMNOS (TABLE + SEARCH + DELETE)                    */}
      {/* =================================================================== */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Mantenedor de Alumnos Matriculados ({studentsList.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cada estudiante ingresa con su correo <code>@estudiante.ugm.cl</code> y su <strong>primer nombre</strong> como contraseña.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 sm:p-4">#</th>
                <th className="p-3 sm:p-4">Apellidos y Nombres</th>
                <th className="p-3 sm:p-4">Correo Institucional</th>
                <th className="p-3 sm:p-4">Clave Inicial (Primer Nombre)</th>
                <th className="p-3 sm:p-4">Estado</th>
                <th className="p-3 sm:p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((st, i) => (
                <tr key={st.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 sm:p-4 text-slate-400 font-mono text-[11px]">{i + 1}</td>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900">{st.fullName}</td>
                  <td className="p-3 sm:p-4 font-mono text-slate-600">{st.email}</td>
                  <td className="p-3 sm:p-4 font-mono font-bold text-indigo-700 bg-indigo-50/50">
                    {st.defaultPassword}
                  </td>
                  <td className="p-3 sm:p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {st.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`¿Estás seguro de desmatricular a ${st.fullName}?`)) {
                          removeStudent(st.id);
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition"
                      title="Eliminar de la nómina"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <span>Matricular Nuevo Alumno</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Apellidos</label>
                <input
                  type="text"
                  placeholder="Ej: PÉREZ ROJAS"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombres</label>
                <input
                  type="text"
                  placeholder="Ej: JUAN PABLO"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Su contraseña será automáticamente: {newFirstName ? newFirstName.trim().split(' ')[0].toUpperCase() : 'PRIMER NOMBRE'}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Correo Institucional (@estudiante.ugm.cl)
                </label>
                <input
                  type="email"
                  placeholder="juan.perez@estudiante.ugm.cl"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
                >
                  Guardar en Nómina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
