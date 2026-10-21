'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, Database, ArrowRight, Table, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Class3View: React.FC = () => {
  const { user } = useAuth();
  const [levelTab, setLevelTab] = useState<'conceptual' | 'logico' | 'fisico' | 'cardinalidades'>('conceptual');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
              Unidad 1 • Cátedra Nº 4
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Clase 3: Modelos de Datos: Conceptual, Lógico y Físico (MER)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              Estudio de los 3 niveles de abstracción del modelado de datos: desde la identificación conceptual de entidades del negocio hasta la implementación física en Microsoft SQL Server.
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setLevelTab('conceptual')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              levelTab === 'conceptual'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Modelo Conceptual (Láminas 4-6)
          </button>
          <button
            onClick={() => setLevelTab('logico')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              levelTab === 'logico'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Modelo Lógico: PK y FK (Lámina 7)
          </button>
          <button
            onClick={() => setLevelTab('fisico')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              levelTab === 'fisico'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            3. Modelo Físico: SQL Server (Láminas 8-9)
          </button>
          <button
            onClick={() => setLevelTab('cardinalidades')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              levelTab === 'cardinalidades'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            4. Cardinalidades N:M y 1:N (Lámina 11)
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Modelo Conceptual */}
      {levelTab === 'conceptual' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-blue-600 uppercase">Nivel 1 de Abstracción</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">El Modelo Conceptual de la Cátedra</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Representa el mundo real como una colección de <strong>entidades</strong> (rectángulos) y <strong>relaciones</strong> (rombos), con sus respectivos <strong>atributos</strong> (óvalos/elipses).
            </p>
          </div>

          {/* Interactive diagram visualization of slide 6 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col md:flex-row items-center justify-center gap-6 overflow-x-auto">
            {/* Entity 1 */}
            <div className="flex flex-col items-center">
              <div className="flex gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Rut</span>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Nombre</span>
              </div>
              <div className="bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md">
                CLIENTE
              </div>
            </div>

            {/* Relationship 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-purple-600 text-white text-xs font-bold px-4 py-2 transform rotate-45 rounded shadow-sm">
                <span className="block transform -rotate-45">COMPRA</span>
              </div>
            </div>

            {/* Entity 2 */}
            <div className="flex flex-col items-center">
              <div className="flex gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Código</span>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Descripción</span>
              </div>
              <div className="bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md">
                PRODUCTO
              </div>
            </div>

            {/* Relationship 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-purple-600 text-white text-xs font-bold px-4 py-2 transform rotate-45 rounded shadow-sm">
                <span className="block transform -rotate-45">ABASTECE</span>
              </div>
            </div>

            {/* Entity 3 */}
            <div className="flex flex-col items-center">
              <div className="flex gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Rut</span>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono px-2 py-0.5 rounded-full border border-indigo-200">Nombre</span>
              </div>
              <div className="bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md">
                PROVEEDOR
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Modelo Lógico */}
      {levelTab === 'logico' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase">Nivel 2 de Abstracción (Lámina 7)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Definición de Atributos, PK y FK</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              En el modelo lógico se especifican todas las claves primarias (PK) y las claves externas/foráneas (FK) para garantizar la integridad referencial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="font-bold text-sm text-slate-800 mb-2">Entidad CLIENTE</h4>
              <ul className="text-xs space-y-1 font-mono">
                <li className="text-yellow-800 font-bold bg-yellow-50 px-2 py-0.5 rounded">🔑 Rut (PK)</li>
                <li>• Nombre</li>
                <li>• Apellido</li>
                <li>• Dirección</li>
                <li>• Contacto</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="font-bold text-sm text-slate-800 mb-2">Entidad PRODUCTO</h4>
              <ul className="text-xs space-y-1 font-mono">
                <li className="text-yellow-800 font-bold bg-yellow-50 px-2 py-0.5 rounded">🔑 Código (PK)</li>
                <li>• Descripción</li>
                <li>• Valor Venta</li>
                <li>• Valor Compra</li>
                <li>• Unidad Medida</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="font-bold text-sm text-slate-800 mb-2">Entidad PROVEEDOR</h4>
              <ul className="text-xs space-y-1 font-mono">
                <li className="text-yellow-800 font-bold bg-yellow-50 px-2 py-0.5 rounded">🔑 Rut (PK)</li>
                <li>• Nombre</li>
                <li>• Apellidos</li>
                <li>• Dirección</li>
                <li>• Contacto</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Modelo Físico */}
      {levelTab === 'fisico' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-emerald-600 uppercase">Nivel 3: Implementación en SQL Server (Láminas 8-9)</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Tablas, Columnas y Tipos de Datos T-SQL</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              El modelo físico traduce las entidades a tablas con tipos de datos exactos (`int`, `nvarchar(50)`, `bit`, `datetime`).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-200 p-4 text-xs font-mono">
              <div className="text-emerald-400 font-bold pb-2 border-b border-slate-800">
                USUARIOS (SQL Server)
              </div>
              <pre className="mt-2 text-slate-300">
{`CREATE TABLE USUARIOS (
  idUsuario INT PRIMARY KEY IDENTITY(1,1),
  Correo_Usuario NVARCHAR(50) NOT NULL,
  Nombre_Usuario NVARCHAR(50) NOT NULL,
  fk_idRol INT FOREIGN KEY REFERENCES ROL(idRol),
  Estado BIT DEFAULT 1,
  Pass NVARCHAR(50) NOT NULL
);`}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-200 p-4 text-xs font-mono">
              <div className="text-emerald-400 font-bold pb-2 border-b border-slate-800">
                SOLICITUDES (SQL Server)
              </div>
              <pre className="mt-2 text-slate-300">
{`CREATE TABLE SOLICITUDES (
  idSolic INT PRIMARY KEY IDENTITY(1,1),
  fkUsuario INT FOREIGN KEY REFERENCES USUARIOS(idUsuario),
  Fecha_Solic DATETIME DEFAULT GETDATE(),
  Desc_Solic NVARCHAR(500),
  fkDpto INT,
  fkCate INT,
  Estado NVARCHAR(12),
  FechaSolucion DATETIME
);`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 4: Cardinalidades */}
      {levelTab === 'cardinalidades' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-indigo-600 uppercase">Lámina 11 de la Cátedra</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Reglas de Cardinalidad: 1:N y N:M</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-blue-900">Relación Muchos a Muchos (N:M): Alumno - Clase</span>
              <p className="text-xs text-blue-800 leading-relaxed">
                Un alumno puede pertenecer a muchas clases, y una clase tiene muchos alumnos.
              </p>
              <div className="rounded-lg bg-white p-3 border border-blue-200 text-xs text-slate-700">
                💡 <strong>Regla de oro:</strong> Una relación N:M siempre se convierte en una **tercera tabla intermedia** que guarda ambas claves foráneas (`idAlumno` y `idClase`).
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-900">Relación Uno a Muchos (1:N): Cliente - Pedido</span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Un cliente realiza muchos pedidos, pero cada pedido pertenece a un solo cliente.
              </p>
              <div className="rounded-lg bg-white p-3 border border-emerald-200 text-xs text-slate-700">
                💡 <strong>Regla de oro:</strong> La clave primaria del lado 1 (`Rut_Cliente`) viaja como **clave foránea (FK)** a la tabla del lado N (`Pedidos`).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
