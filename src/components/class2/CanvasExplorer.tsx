'use client';

import React, { useState } from 'react';
import { CLASS_2_CANVAS_BLOCKS, CanvasBlock } from '@/data/class2Data';
import { 
  Sparkles, 
  Database, 
  Users, 
  Tv, 
  HeartHandshake, 
  CreditCard, 
  Zap, 
  Building2, 
  Calculator,
  Film
} from 'lucide-react';

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-5 w-5 text-amber-500" />,
  Users: <Users className="h-5 w-5 text-blue-500" />,
  Tv: <Tv className="h-5 w-5 text-indigo-500" />,
  HeartHandshake: <HeartHandshake className="h-5 w-5 text-rose-500" />,
  CreditCard: <CreditCard className="h-5 w-5 text-emerald-500" />,
  Database: <Database className="h-5 w-5 text-cyan-500" />,
  Zap: <Zap className="h-5 w-5 text-yellow-500" />,
  Building2: <Building2 className="h-5 w-5 text-purple-500" />,
  Calculator: <Calculator className="h-5 w-5 text-slate-500" />
};

export const CanvasExplorer: React.FC = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('b1');
  const activeBlock = CLASS_2_CANVAS_BLOCKS.find((b) => b.id === selectedBlockId) || CLASS_2_CANVAS_BLOCKS[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
              <Sparkles className="h-3 w-3" />
              Lienzo de Negocio (Láminas 11 y 12)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              Business Model Canvas aplicado a Bases de Datos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Explora los 9 bloques del Canvas (Caso Netflix) y descubre cómo cada bloque define las tablas y requerimientos de la BD.
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-xs">
            <Film className="h-4 w-4 text-red-500" />
            <span className="font-semibold">Caso Oficial: Netflix</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* The 9 Canvas Blocks as an interactive grid */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-3">
          {CLASS_2_CANVAS_BLOCKS.map((block) => {
            const isSelected = selectedBlockId === block.id;

            return (
              <button
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-slate-400">
                    Bloque {block.number}
                  </span>
                  {BLOCK_ICONS[block.icon]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {block.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {block.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspector on right */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-200">
                {BLOCK_ICONS[activeBlock.icon]}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Bloque {activeBlock.number}
                </span>
                <h4 className="text-base font-bold text-slate-900">{activeBlock.name}</h4>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Definición en la Cátedra:
              </p>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                {activeBlock.description}
              </p>
            </div>

            {/* Netflix Example from slide 12 */}
            <div className="rounded-xl border border-red-200 bg-red-50/60 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 mb-1">
                <Film className="h-3.5 w-3.5 text-red-600" />
                <span>Ejemplo Netflix (Lámina 12):</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed font-sans">
                {activeBlock.netflixExample}
              </p>
            </div>

            {/* Direct relation to Database */}
            <div className="rounded-xl border border-cyan-200 bg-cyan-50/60 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-900 mb-1">
                <Database className="h-3.5 w-3.5 text-cyan-700" />
                <span>¿Cómo se traduce a la Base de Datos?</span>
              </div>
              <p className="text-xs text-cyan-900 leading-relaxed font-sans">
                {activeBlock.dbRelation}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-200">
            Pilar fundamental para el <strong>Taller Evaluativo</strong> (20% de la cátedra)
          </div>
        </div>
      </div>
    </div>
  );
};
