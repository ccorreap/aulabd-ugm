'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StudentUser } from '@/data/students';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Search, 
  GraduationCap, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Mail, 
  School,
  X
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user, studentsList, addStudent, removeStudent } = useAuth();
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
    const headers = 'Apellido,Nombre,Nombre de usuario,Estado\n';
    const rows = studentsList
      .map((s) => `"${s.lastName}","${s.firstName}","${s.email}","${s.status}"`)
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
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              <GraduationCap className="h-4 w-4" />
              Gestión Docente Exclusiva
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">
              Panel de Control y Mantenedor de Alumnos
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
              <span>Exportar Nómina CSV</span>
            </button>
          </div>
        </div>

        {/* Course Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Total Alumnos Nómina</p>
            <p className="text-2xl font-bold text-white mt-0.5">{studentsList.length} Estudiantes</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Dominio Permitido</p>
            <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">@estudiante.ugm.cl</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Cátedras Habilitadas</p>
            <p className="text-2xl font-bold text-indigo-400 mt-0.5">Clase 1 y 2</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Taller Evaluativo</p>
            <p className="text-sm font-bold text-amber-400 mt-1">20% (Entrega 28/03)</p>
          </div>
        </div>
      </div>

      {/* Main Student Mantainer (Table + Search + Delete) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Mantenedor de Alumnos Matriculados ({studentsList.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Solo los alumnos en este listado tienen acceso habilitado para ingresar con su correo institucional.
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
                <th className="p-3 sm:p-4">Correo Institucional (@estudiante.ugm.cl)</th>
                <th className="p-3 sm:p-4">Carrera</th>
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
                  <td className="p-3 sm:p-4 text-slate-500">{st.career}</td>
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
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No se encontraron alumnos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
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
