'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UgmLogo } from './UgmLogo';
import { TEACHER_OFFICIAL_EMAIL } from '@/data/students';
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck, GraduationCap, School } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAsTeacher, loginAsStudent, studentsList } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemoHelper, setShowDemoHelper] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Por favor ingresa tu correo institucional y contraseña.');
      return;
    }

    const res = login(email, password);
    if (!res.success) {
      setError(res.error || 'Credenciales no autorizadas.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-[#0F2B5C] to-slate-950 p-4 sm:p-6 text-slate-800">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl border border-white/20 z-10 animate-fadeIn">
        {/* University Header with Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex justify-center">
            <UgmLogo variant="shield" size={68} />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
            UNIVERSIDAD GABRIELA MISTRAL
          </span>
          <h1 className="text-2xl font-black text-[#0F2B5C] tracking-tight mt-1">
            Aula Virtual Base de Datos
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Ingeniería en Computación e Informática • Cátedras
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60">
            <ShieldCheck className="h-3.5 w-3.5" />
            Acceso Institucional Controlado
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200 animate-fadeIn flex items-start gap-2">
            <span className="font-bold shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Correo Institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="nombre.apellido@estudiante.ugm.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Contraseña
              </label>
              <span className="text-[11px] text-blue-600 font-medium">
                Alumnos: Primer Nombre (ej. CHRISTOPHER)
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 text-xs sm:text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 py-3 text-sm font-bold text-white hover:from-blue-800 hover:to-indigo-700 transition shadow-lg shadow-blue-600/30 active:scale-[0.99]"
          >
            <LogIn className="h-4 w-4" />
            <span>Ingresar al Aula</span>
          </button>
        </form>

        {/* Quick Demo Accordion for testing */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowDemoHelper(!showDemoHelper)}
            className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-700 transition flex items-center justify-center gap-1"
          >
            <span>{showDemoHelper ? 'Ocultar accesos rápidos' : '⚙️ Accesos rápidos de prueba'}</span>
          </button>

          {showDemoHelper && (
            <div className="mt-3 space-y-2.5 animate-fadeIn">
              <button
                type="button"
                onClick={loginAsTeacher}
                className="w-full flex items-center justify-between rounded-xl border border-purple-200 bg-purple-50/70 p-2.5 text-xs font-semibold text-purple-900 hover:bg-purple-100 transition"
              >
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-purple-700" />
                  <div className="text-left">
                    <p>Ingreso como Docente</p>
                    <p className="text-[10px] text-purple-600 font-mono">{TEACHER_OFFICIAL_EMAIL}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                  Docente
                </span>
              </button>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Autocompletar credenciales de alumno ({studentsList.length}):
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const [em, pass] = e.target.value.split('|');
                      setEmail(em);
                      setPassword(pass);
                    }
                  }}
                  defaultValue=""
                  className="w-full rounded-lg border border-slate-300 bg-white py-1.5 px-2 text-xs text-slate-700"
                >
                  <option value="" disabled>-- Selecciona un alumno --</option>
                  {studentsList.map((st) => (
                    <option key={st.id} value={`${st.email}|${st.defaultPassword}`}>
                      {st.fullName} (Clave: {st.defaultPassword})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* University Footer */}
      <footer className="mt-6 text-center text-xs text-slate-400 z-10 font-sans">
        Docente: <strong>Mag. Cristian Correa Pacheco</strong> • Universidad Gabriela Mistral
      </footer>
    </div>
  );
};
