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
  Sparkles,
  Trophy,
  SlidersHorizontal,
  BarChart3,
  AlertTriangle,
  Lightbulb
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

  const [activePanelSection, setActivePanelSection] = useState<'students' | 'classes' | 'analytics'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New student form state
  const [newLastName, setNewLastName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Calculate average XP
  const totalXp = studentsList.reduce((acc, s) => acc + (s.xp || 0), 0);
  const avgXp = Math.round(totalXp / (studentsList.length || 1));

  // Sort students by XP descending
  const sortedStudents = [...studentsList].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  const filteredStudents = sortedStudents.filter(
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
      status: 'Activo',
      xp: 50,
      completedCount: 0
    });

    setNewLastName('');
    setNewFirstName('');
    setNewEmail('');
    setIsAddModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = 'Apellido,Nombre,Nombre de usuario,Estado,Clave Inicial,Puntos XP\n';
    const rows = sortedStudents
      .map((s) => `"${s.lastName}","${s.firstName}","${s.email}","${s.status}","${s.defaultPassword}",${s.xp || 0}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nomina_alumnos_xp_ugm_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Executive Header Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#0F2B5C] via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-200 border border-purple-400/30">
              <GraduationCap className="h-4 w-4" />
              Vista Docente • Universidad Gabriela Mistral
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
              Panel de Control y Analítica de Cátedra
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Profesor: <strong>{user?.name || 'Mag. Cristian Correa Pacheco'}</strong> • {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md transition"
            >
              <UserPlus className="h-4 w-4" />
              <span>Matricular Alumno</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md transition"
            >
              <Download className="h-4 w-4" />
              <span>Exportar Nómina con XP</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <p className="text-xs text-slate-300">Alumnos en Nómina</p>
            <p className="text-2xl font-black text-white mt-0.5">{studentsList.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <p className="text-xs text-slate-300">Clases Liberadas</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">
              {publishedClasses.length} <span className="text-sm font-normal text-slate-400">/ {ALL_COURSE_CLASSES.length}</span>
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <p className="text-xs text-slate-300">Promedio XP del Curso</p>
            <p className="text-2xl font-black text-amber-400 mt-0.5 flex items-center gap-1">
              <Sparkles className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span>{avgXp} XP</span>
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <p className="text-xs text-slate-300">Motor Asignatura</p>
            <p className="text-sm font-bold text-cyan-300 mt-1 font-mono">Microsoft SQL Server</p>
          </div>
        </div>
      </div>

      {/* Internal Navigation: 3 Clean Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActivePanelSection('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activePanelSection === 'students'
              ? 'bg-[#0F2B5C] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Nómina de Alumnos y Puntos XP ({studentsList.length})</span>
        </button>

        <button
          onClick={() => setActivePanelSection('classes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activePanelSection === 'classes'
              ? 'bg-[#0F2B5C] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Gestor de Liberación de Clases ({publishedClasses.length}/{ALL_COURSE_CLASSES.length})</span>
        </button>

        <button
          onClick={() => setActivePanelSection('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
            activePanelSection === 'analytics'
              ? 'bg-[#0F2B5C] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Diagnóstico Pedagógico</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* SECCIÓN 1: NÓMINA DE ALUMNOS & PUNTOS XP                           */}
      {/* =================================================================== */}
      {activePanelSection === 'students' && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fadeIn">
          <div className="border-b border-slate-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span>Ranking y Registro de Estudiantes con Puntos XP</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visualiza el avance práctico de cada estudiante y su clave inicial de acceso.
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
                  <th className="p-3 sm:p-4 text-center">Pos.</th>
                  <th className="p-3 sm:p-4">Estudiante</th>
                  <th className="p-3 sm:p-4">Correo Institucional</th>
                  <th className="p-3 sm:p-4 text-center">Puntos de Experiencia</th>
                  <th className="p-3 sm:p-4">Clave Inicial</th>
                  <th className="p-3 sm:p-4">Estado</th>
                  <th className="p-3 sm:p-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((st, i) => {
                  const isTop1 = i === 0;
                  const isTop2 = i === 1;
                  const isTop3 = i === 2;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 sm:p-4 text-center font-bold">
                        {isTop1 ? '🥇 1' : isTop2 ? '🥈 2' : isTop3 ? '🥉 3' : `#${i + 1}`}
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">
                        {st.fullName}
                      </td>
                      <td className="p-3 sm:p-4 font-mono text-slate-600">{st.email}</td>
                      <td className="p-3 sm:p-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          <span>{st.xp || 0} XP</span>
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-indigo-700 bg-indigo-50/40">
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
                          title="Eliminar alumno"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 2: GESTOR DE PUBLICACIÓN DE CLASES (ORDENADO POR UNIDAD)    */}
      {/* =================================================================== */}
      {activePanelSection === 'classes' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Unidad 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Unidad 1: Fundamentos, Modelado y Normalización
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-0.5">
                  Clases Teórico-Conceptuales (Clases 1 a la 5)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">5 Sesiones</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_COURSE_CLASSES.filter((c) => c.unit === 1).map((cls) => {
                const isPublished = publishedClasses.includes(cls.id);
                const isClase1 = cls.id === 'clase1';

                return (
                  <div
                    key={cls.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isPublished
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400">{cls.catedraNumber}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isPublished ? 'Publicada' : 'Oculta'}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {cls.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {cls.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {isPublished ? 'Visible en menú' : 'Oculta para alumnos'}
                      </span>
                      <button
                        onClick={() => togglePublishClass(cls.id)}
                        disabled={isClase1}
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition flex items-center gap-1 ${
                          isPublished
                            ? isClase1
                              ? 'bg-emerald-100 text-emerald-800 opacity-60 cursor-not-allowed'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-800 text-white hover:bg-slate-900'
                        }`}
                      >
                        {isPublished ? 'Desactivar' : 'Liberar Clase'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unidad 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Unidad 2: Implementación en Microsoft SQL Server
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-0.5">
                  Clases Prácticas DDL, DML, Índices y Vistas (Clases 6 y 7)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">2 Sesiones</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ALL_COURSE_CLASSES.filter((c) => c.unit === 2).map((cls) => {
                const isPublished = publishedClasses.includes(cls.id);

                return (
                  <div
                    key={cls.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isPublished
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400">{cls.catedraNumber}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isPublished ? 'Publicada' : 'Oculta'}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {cls.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {cls.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {isPublished ? 'Visible en menú' : 'Oculta para alumnos'}
                      </span>
                      <button
                        onClick={() => togglePublishClass(cls.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition flex items-center gap-1 ${
                          isPublished
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-800 text-white hover:bg-slate-900'
                        }`}
                      >
                        {isPublished ? 'Desactivar' : 'Liberar Clase'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 3: DIAGNÓSTICO Y ALERTAS PEDAGÓGICAS                       */}
      {/* =================================================================== */}
      {activePanelSection === 'analytics' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Alerta: Tipos Booleanos en SQL Server</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Varios estudiantes confunden la sintaxis general con SQL Server intentando declarar <code>BOOLEAN</code>. Reforzar el uso exclusivo de <code>BIT</code> (0, 1 o NULL).
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Excelente asimilación: DROP vs TRUNCATE</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                La analogía de demolición (DROP) vs limpieza profunda (TRUNCATE) ha tenido un 92% de aciertos en las autoevaluaciones.
              </p>
            </div>
          </div>
        </div>
      )}

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
