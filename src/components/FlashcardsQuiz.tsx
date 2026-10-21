'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CLASS_1_FLASHCARDS } from '@/data/class1Data';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookMarked,
  Layers,
  Key,
  Rows,
  Tag,
  Zap,
  GitBranch,
  Box,
  FileText
} from 'lucide-react';

const ICONS_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-6 w-6 text-blue-500" />,
  Box: <Box className="h-6 w-6 text-emerald-500" />,
  Tag: <Tag className="h-6 w-6 text-amber-500" />,
  Rows: <Rows className="h-6 w-6 text-purple-500" />,
  Key: <Key className="h-6 w-6 text-yellow-500" />,
  GitBranch: <GitBranch className="h-6 w-6 text-indigo-500" />,
  Zap: <Zap className="h-6 w-6 text-orange-500" />,
  Layers: <Layers className="h-6 w-6 text-rose-500" />
};

export const FlashcardsQuiz: React.FC = () => {
  const { addXp } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  const card = CLASS_1_FLASHCARDS[currentIndex];
  const isMastered = masteredCards.includes(card.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % CLASS_1_FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + CLASS_1_FLASHCARDS.length) % CLASS_1_FLASHCARDS.length);
  };

  const toggleMastered = () => {
    if (isMastered) {
      setMasteredCards(masteredCards.filter((id) => id !== card.id));
    } else {
      setMasteredCards([...masteredCards, card.id]);
      addXp(15, `card-${card.id}`);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              <Sparkles className="h-3 w-3" />
              Tarjetas de Memoria y Definiciones (Láminas 4, 5 y 6)
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1">
              Glosario Teórico de Bases de Datos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Haz clic en la tarjeta para voltearla y ver la definición oficial de la cátedra.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {masteredCards.length} de {CLASS_1_FLASHCARDS.length} dominadas
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 flex flex-col items-center">
        {/* Interactive 3D Flip Card */}
        <div
          onClick={handleFlip}
          className="w-full max-w-lg min-h-[260px] cursor-pointer rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center relative group"
        >
          {/* Card Top Category */}
          <div className="flex items-center justify-between w-full">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {card.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-blue-600 transition">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Girar</span>
            </div>
          </div>

          {/* Card Content (Front / Back) */}
          {!isFlipped ? (
            <div className="my-auto py-6 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 shadow-inner">
                {ICONS_MAP[card.iconName] || <BookMarked className="h-6 w-6 text-blue-500" />}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {card.term}
              </h4>
              <p className="text-xs text-slate-400">Toca para descubrir la definición y nota de clase</p>
            </div>
          ) : (
            <div className="my-auto py-4 space-y-3 animate-fadeIn">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {card.definition}
              </p>
              <div className="rounded-xl bg-blue-50 p-2.5 text-xs text-blue-800 border border-blue-200/60 font-sans">
                {card.ugmNote}
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="flex items-center justify-between w-full pt-2 border-t border-slate-100 text-xs text-slate-400">
            <span>
              Tarjeta {currentIndex + 1} / {CLASS_1_FLASHCARDS.length}
            </span>
            {isMastered && (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Dominada
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={toggleMastered}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isMastered ? 'Marcada como Aprendida' : 'Marcar como Aprendida (+15 XP)'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
