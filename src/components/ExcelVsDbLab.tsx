'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { EXCEL_VS_DB_PARTS } from '@/data/class1Data';
import { CheckCircle2, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExcelVsDbLab: React.FC = () => {
  const { addXp, user } = useAuth();
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [identifiedParts, setIdentifiedParts] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>({
    message: 'Selecciona un concepto del panel izquierdo y luego haz clic sobre la zona que le corresponde en la tabla.',
    type: 'info'
  });

  const handleSelectPart = (id: string) => {
    setSelectedPartId(id);
    const item = EXCEL_VS_DB_PARTS.find((p) => p.id === id);
    if (item) {
      setFeedback({
        message: `Ahora haz clic en la hoja de cálculo donde se ubica: "${item.name}"`,
        type: 'info'
      });
    }
  };

  const handleHotspotClick = (targetId: string) => {
    if (!selectedPartId) {
      // Direct click on hotspot shows info
      const item = EXCEL_VS_DB_PARTS.find((p) => p.id === targetId);
      if (item) {
        setFeedback({
          message: `Has pulsado en: ${item.name}. ${item.concept}`,
          type: 'info'
        });
      }
      return;
    }

    if (selectedPartId === targetId) {
      if (!identifiedParts.includes(targetId)) {
        const next = [...identifiedParts, targetId];
        setIdentifiedParts(next);
        addXp(30, `act-excel-${targetId}`);

        if (next.length === EXCEL_VS_DB_PARTS.length) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          addXp(100, 'act-excel-complete');
          setFeedback({
            message: '🎉 ¡Excelente! Has identificado todos los componentes del modelo relacional comparados con Excel.',
            type: 'success'
          });
        } else {
          setFeedback({
            message: `¡Correcto! Identificaste correctamente "${EXCEL_VS_DB_PARTS.find(p => p.id === targetId)?.name}". (+30 XP)`,
            type: 'success'
          });
        }
      }
      setSelectedPartId(null);
    } else {
      setFeedback({
        message: `Ese elemento no corresponde a lo seleccionado. Recuerda revisar la definición pedagógica.`,
        type: 'error'
      });
    }
  };

  const handleReset = () => {
    setIdentifiedParts([]);
    setSelectedPartId(null);
    setFeedback({
      message: 'Laboratorio reiniciado. ¡Vuelve a asociar cada concepto con la hoja de cálculo!',
      type: 'info'
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/40 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              <Sparkles className="h-3 w-3" />
              Laboratorio Interactivo (Lámina 10)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              De la Hoja de Cálculo (Excel) al Modelo Relacional
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Haz clic en cada concepto conceptual y encuéntralo en la matriz de datos de la cátedra.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              Progreso: {identifiedParts.length} / {EXCEL_VS_DB_PARTS.length}
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              title="Reiniciar ejercicio"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Feedback Bar */}
        {feedback && (
          <div
            className={`mt-4 rounded-xl p-3 text-xs sm:text-sm flex items-center gap-2 transition ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : feedback.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
        {/* Concepts selector list */}
        <div className="lg:col-span-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Conceptos a Identificar
          </h4>
          <div className="space-y-1.5">
            {EXCEL_VS_DB_PARTS.map((part) => {
              const isFound = identifiedParts.includes(part.id);
              const isSelected = selectedPartId === part.id;

              return (
                <button
                  key={part.id}
                  onClick={() => handleSelectPart(part.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/20'
                      : isFound
                      ? 'border-emerald-200 bg-emerald-50/50 text-slate-700'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                      {isFound && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                      <span>{part.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                      {part.concept}
                    </p>
                  </div>
                  {isFound && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                      OK
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Excel Matrix Simulation */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Top toolbar representing SGBD / Excel */}
          <div className="flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-t-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-400">Microsoft Excel / SGBD</span>
              <span className="text-slate-400 text-[11px]">Inventario_Supermercado.xlsx</span>
            </div>
            <button
              onClick={() => handleHotspotClick('sgbd')}
              className={`px-2 py-0.5 rounded border text-[11px] transition ${
                identifiedParts.includes('sgbd')
                  ? 'border-emerald-400 bg-emerald-600 text-white'
                  : 'border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              [Zona: Sistema de Gestión de BD]
            </button>
          </div>

          {/* Database banner */}
          <div className="flex items-center justify-between bg-indigo-50 border-x border-indigo-200 px-4 py-1.5 text-xs">
            <span className="text-indigo-900 font-medium">
              Colección general de datos de la empresa
            </span>
            <button
              onClick={() => handleHotspotClick('db')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
                identifiedParts.includes('db')
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-indigo-300 bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
              }`}
            >
              [Zona: Base de Datos]
            </button>
          </div>

          {/* Main Table representation */}
          <div className="overflow-x-auto border border-slate-200 rounded-b-xl bg-white shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2 border-r border-slate-200 text-center w-8 text-slate-400">#</th>
                  {/* Codigo: Clave Primaria */}
                  <th className="p-2 border-r border-slate-200 bg-yellow-50/70">
                    <button
                      onClick={() => handleHotspotClick('pk')}
                      className={`w-full text-left font-bold transition flex items-center justify-between p-1 rounded ${
                        identifiedParts.includes('pk')
                          ? 'text-yellow-900 bg-yellow-200/70 ring-1 ring-yellow-400'
                          : 'text-yellow-800 hover:bg-yellow-100'
                      }`}
                    >
                      <span>Codigo (PK)</span>
                      <span className="text-[10px] text-yellow-600">[Clave]</span>
                    </button>
                  </th>
                  <th className="p-2 border-r border-slate-200">Nombre</th>
                  {/* Unidad Medida: Campo */}
                  <th className="p-2 border-r border-slate-200 bg-red-50/60">
                    <button
                      onClick={() => handleHotspotClick('campo')}
                      className={`w-full text-left font-bold transition flex items-center justify-between p-1 rounded ${
                        identifiedParts.includes('campo')
                          ? 'text-red-900 bg-red-200/70 ring-1 ring-red-400'
                          : 'text-red-800 hover:bg-red-100'
                      }`}
                    >
                      <span>Unidad Medida</span>
                      <span className="text-[10px] text-red-600">[Campo]</span>
                    </button>
                  </th>
                  <th className="p-2 border-r border-slate-200">Categoría</th>
                  <th className="p-2 border-r border-slate-200">Subcategoría</th>
                  <th className="p-2 border-r border-slate-200">Costo</th>
                  <th className="p-2 border-r border-slate-200">Existencia</th>
                  <th className="p-2">Fecha Últ. Compra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600 font-mono text-[11px]">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 text-center text-slate-400">2</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">102030</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Arroz Marfil</td>
                  <td className="p-2 border-r border-slate-200">Libra</td>
                  <td className="p-2 border-r border-slate-200">Alimentos</td>
                  <td className="p-2 border-r border-slate-200">Granos</td>
                  <td className="p-2 border-r border-slate-200">$1,200</td>
                  <td className="p-2 border-r border-slate-200">50</td>
                  <td className="p-2">05/05/2013</td>
                </tr>

                {/* Row 2: Selected as "Registro / Tupla" */}
                <tr className="bg-amber-50/50 hover:bg-amber-100/60 transition">
                  <td className="p-2 border-r border-slate-200 text-center text-slate-400">
                    <button
                      onClick={() => handleHotspotClick('registro')}
                      className="text-amber-700 font-bold hover:underline"
                    >
                      3 ▶
                    </button>
                  </td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">402536</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Mango Tommi</td>
                  <td className="p-2 border-r border-slate-200">Kilo</td>
                  <td className="p-2 border-r border-slate-200">Alimentos</td>
                  <td className="p-2 border-r border-slate-200">Frutas</td>
                  <td className="p-2 border-r border-slate-200">$2,500</td>
                  <td className="p-2 border-r border-slate-200">20</td>
                  <td className="p-2 flex items-center justify-between">
                    <span>24/05/2013</span>
                    <button
                      onClick={() => handleHotspotClick('registro')}
                      className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-sans font-semibold border ${
                        identifiedParts.includes('registro')
                          ? 'border-amber-400 bg-amber-300 text-amber-900'
                          : 'border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      [Fila / Tupla]
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 text-center text-slate-400">4</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">460421</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Cerveza Club Colombia</td>
                  <td className="p-2 border-r border-slate-200">Lata</td>
                  <td className="p-2 border-r border-slate-200">Bebidas</td>
                  <td className="p-2 border-r border-slate-200">Cervezas</td>
                  <td className="p-2 border-r border-slate-200">$1,900</td>
                  <td className="p-2 border-r border-slate-200">35</td>
                  <td className="p-2">12/03/2013</td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 text-center text-slate-400">5</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">956343</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Leche Colanta</td>
                  <td className="p-2 border-r border-slate-200">Litro</td>
                  <td className="p-2 border-r border-slate-200">Alimentos</td>
                  <td className="p-2 border-r border-slate-200">Lácteos</td>
                  <td className="p-2 border-r border-slate-200">$1,800</td>
                  <td className="p-2 border-r border-slate-200">12</td>
                  <td className="p-2">05/06/2013</td>
                </tr>

                {/* Row 5: With atomic data button */}
                <tr className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 text-center text-slate-400">6</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">463564</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Gaseosa Postobon</td>
                  <td className="p-2 border-r border-slate-200">Litro</td>
                  <td className="p-2 border-r border-slate-200">Bebidas</td>
                  <td className="p-2 border-r border-slate-200">Gaseosas</td>
                  {/* Costo 2,100: Dato atómico */}
                  <td className="p-2 border-r border-slate-200 bg-cyan-50/70">
                    <button
                      onClick={() => handleHotspotClick('dato')}
                      className={`w-full font-bold transition flex items-center justify-between p-1 rounded ${
                        identifiedParts.includes('dato')
                          ? 'text-cyan-900 bg-cyan-200 ring-1 ring-cyan-400'
                          : 'text-cyan-800 hover:bg-cyan-100'
                      }`}
                    >
                      <span>$2,100</span>
                      <span className="text-[10px] font-sans text-cyan-600">[Dato]</span>
                    </button>
                  </td>
                  <td className="p-2 border-r border-slate-200">70</td>
                  <td className="p-2">14/04/2013</td>
                </tr>
              </tbody>
            </table>

            {/* Bottom Tab representing the Table */}
            <div className="flex items-center justify-between bg-slate-100 border-t border-slate-200 px-4 py-2">
              <button
                onClick={() => handleHotspotClick('tabla')}
                className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold border transition ${
                  identifiedParts.includes('tabla')
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Hoja: [Productos]</span>
                <span className="text-[10px] opacity-80">(Pestaña / Tabla)</span>
              </button>
              <span className="text-[11px] text-slate-400">Hoja 1 de 1 • Vista Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
