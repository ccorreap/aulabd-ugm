'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TEACHER_OFFICIAL_EMAIL } from '@/data/students';
import { X, ShieldCheck, Mail, LogIn, School, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, loginAsTeacher, loginAsStudent, studentsList } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Por favor ingresa tu correo institucional.');
      return;
    }

    const res = login(email);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Correo no autorizado.');
    }
  };

  const handleQuickStudent = (studentEmail: string) => {
    loginAsStudent(studentEmail);
    onClose();
  };

  const handleQuickTeacher = () => {
    loginAsTeacher();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <School className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Aula Virtual - Base de Datos</h2>
          <p className="text-sm text-slate-500 mt-1">Universidad Gabriela Mistral</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Acceso institucional controlado
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Correo Institucional (@estudiante.ugm.cl / @academico.ugm.cl)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="nombre.apellido@estudiante.ugm.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Solo tienen acceso los 17 alumnos matriculados y el docente.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            <LogIn className="h-4 w-4" />
            Ingresar al Aula
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium">Accesos Rápidos Demo</span>
          </div>
        </div>

        {/* Teacher access button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleQuickTeacher}
            className="w-full flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/70 p-2.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 transition"
          >
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-indigo-700" />
              <div className="text-left">
                <p>Ingresar como Docente</p>
                <p className="text-[10px] text-indigo-600 font-mono">{TEACHER_OFFICIAL_EMAIL}</p>
              </div>
            </div>
            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
              Docente
            </span>
          </button>

          {/* Quick Select from Student Roster */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>O ingresar como alumno de la nómina:</span>
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) handleQuickStudent(e.target.value);
              }}
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 bg-white py-1.5 px-2 text-xs text-slate-700"
            >
              <option value="" disabled>
                -- Seleccionar Alumno de la Lista ({studentsList.length} alumnos) --
              </option>
              {studentsList.map((st) => (
                <option key={st.id} value={st.email}>
                  {st.fullName} ({st.email})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
