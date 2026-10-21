'use client';

import React from 'react';
import { CheckCircle2, Clock, PlayCircle, BookOpen, Database, Sparkles } from 'lucide-react';

interface RoadmapViewProps {
  onSelectClass1: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectClass1 }) => {
  const units = [
    {
      unitNumber: 1,
      title: 'Unidad 1: Conceptos Básicos y Diseño de Bases de Datos Relacionales',
      badge: 'Teórico - Conceptual',
      classes: [
        {
          id: 'c1',
          name: 'Clase 1: Introducción, Definiciones, Tipos de Datos y Modelos',
          status: 'active',
          topics: [
            'Dato, Información y Conocimiento',
            'Sistemas de Archivos vs SGBD',
            'Glosario: Entidad, Atributo, Tupla, Clave, Cardinalidad',
            'Tipos de datos simples y complejos (SQL Server)',
            'Comparativa visual Excel vs Base de Datos'
          ]
        },
        {
          id: 'c2',
          name: 'Clase 2: Diseño de DBR - Nivel Conceptual (Modelo Entidad-Relación)',
          status: 'upcoming',
          topics: [
            'Notación Chen y Pata de Gallo (Crow’s Foot)',
            'Identificación de Entidades fuertes y débiles',
            'Relaciones 1:1, 1:N y N:M con casos prácticos'
          ]
        },
        {
          id: 'c3',
          name: 'Clase 3: Diseño Lógico y Lineamientos Informales',
          status: 'upcoming',
          topics: [
            'Paso de Modelo E/R a Tablas Relacionales',
            'Reglas de transformación para claves primarias (PK) y foráneas (FK)',
            'Lineamientos para evitar redundancias y anomalías de actualización'
          ]
        },
        {
          id: 'c4',
          name: 'Clase 4: Normalización para Bases de Datos Relacionales',
          status: 'upcoming',
          topics: [
            'Dependencias Funcionales',
            'Primera Forma Normal (1FN): Atributos atómicos',
            'Segunda Forma Normal (2FN): Dependencia funcional completa',
            'Tercera Forma Normal (3FN): Dependencias transitivas'
          ]
        }
      ]
    },
    {
      unitNumber: 2,
      title: 'Unidad 2: Implementación y Consultas en Microsoft SQL Server',
      badge: 'Práctico - Aplicado',
      classes: [
        {
          id: 'c5',
          name: 'Clase 5: Lenguaje DDL en SQL Server (CREATE, ALTER, DROP)',
          status: 'upcoming',
          topics: [
            'Tipos de datos T-SQL (VARCHAR, INT, BIT, DECIMAL, DATETIME)',
            'Creación de tablas, claves primarias e integridad referencial (FK)',
            'Restricciones CHECK, UNIQUE y DEFAULT'
          ]
        },
        {
          id: 'c6',
          name: 'Clase 6: Lenguaje DML y Consultas Básicas (SELECT, INSERT, UPDATE)',
          status: 'upcoming',
          topics: [
            'Inserción y modificación segura de tuplas',
            'Cláusula SELECT, proyecciones y alias',
            'Filtrado con WHERE, operadores lógicos y LIKE'
          ]
        },
        {
          id: 'c7',
          name: 'Clase 7: Consultas Multitabla y Relaciones (JOINs)',
          status: 'upcoming',
          topics: [
            'INNER JOIN: Intersección exacta de datos',
            'LEFT JOIN y RIGHT JOIN: Manejo de registros no coincidentes',
            'Diagramas de Venn y resolución de consultas de negocio complejas'
          ]
        },
        {
          id: 'c8',
          name: 'Clase 8: Agrupamiento, Funciones de Agregación y Subconsultas',
          status: 'upcoming',
          topics: [
            'Funciones COUNT, SUM, AVG, MIN, MAX',
            'Cláusula GROUP BY y filtrado con HAVING',
            'Subconsultas correlacionadas y optimización con Índices'
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Overview header */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 shadow-lg">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm border border-white/20 mb-3">
          <Database className="h-3.5 w-3.5 text-blue-300" />
          Plan Semestral de Aprendizaje
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Cátedra de Base de Datos
        </h2>
        <p className="text-sm text-blue-100 max-w-2xl mt-2 leading-relaxed">
          Programa oficial de la carrera de Ingeniería en Computación e Informática (Universidad Gabriela Mistral).
          Estructurado en 2 unidades desde los fundamentos conceptuales hasta la implementación en Microsoft SQL Server.
        </p>
      </div>

      {/* Units list */}
      <div className="space-y-8">
        {units.map((unit) => (
          <div key={unit.unitNumber} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {unit.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-800">{unit.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.classes.map((cls) => {
                const isActive = cls.status === 'active';
                return (
                  <div
                    key={cls.id}
                    className={`rounded-2xl border p-5 transition flex flex-col justify-between ${
                      isActive
                        ? 'border-blue-500 bg-white shadow-md ring-2 ring-blue-500/10'
                        : 'border-slate-200 bg-slate-50/70 text-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isActive ? (
                            <>
                              <PlayCircle className="h-3 w-3" />
                              Disponible Ahora
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3" />
                              Próxima Sesión
                            </>
                          )}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                        {cls.name}
                      </h4>

                      <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                        {cls.topics.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100">
                      {isActive ? (
                        <button
                          onClick={onSelectClass1}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 px-4 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>Abrir Módulo de Práctica</span>
                        </button>
                      ) : (
                        <div className="text-center text-xs text-slate-400 font-medium py-1">
                          Se habilitará tras la clase presencial
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
