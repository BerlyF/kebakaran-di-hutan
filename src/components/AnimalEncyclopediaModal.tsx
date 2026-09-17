import React, { useState } from 'react';
import { Animal } from '../types';
import { ArrowRight, BookOpen, Award, CheckCircle2, Shield, Heart, Sparkles } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  animals: Animal[];
  levelTitle: string;
  scoreEarned: number;
  onContinue: () => void;
}

export const AnimalEncyclopediaModal: React.FC<Props> = ({
  animals,
  levelTitle,
  scoreEarned,
  onContinue
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const currentAnimal = animals[selectedIdx] || animals[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-stone-900 border-4 border-amber-500/80 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col text-stone-100 font-sans animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[10px] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jurnal Satwa Penyelamat • {levelTitle}</span>
            </div>
            <h2 className="font-pixel text-base sm:text-lg text-emerald-400 mt-1">
              Satwa Berhasil Diselamatkan!
            </h2>
          </div>

          <div className="px-3.5 py-1.5 bg-amber-950/70 border border-amber-700/80 rounded-lg text-right">
            <span className="text-[10px] text-amber-400 font-pixel block">SKOR MISI</span>
            <span className="font-pixel text-xs text-amber-300">+{scoreEarned} Poin</span>
          </div>
        </div>

        {/* Animal Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
          {animals.map((an, idx) => (
            <button
              key={an.id}
              onClick={() => {
                sounds.playClick();
                setSelectedIdx(idx);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border font-pixel text-xs whitespace-nowrap transition ${
                selectedIdx === idx
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedIdx === idx ? 'text-white fill-white' : 'text-rose-400'}`} />
              <span>{an.name}</span>
            </button>
          ))}
        </div>

        {/* Animal Details Card */}
        {currentAnimal && (
          <div className="bg-stone-950/80 border-2 border-stone-800 rounded-xl p-4 sm:p-5 mb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-800">
              <div>
                <h3 className="font-pixel text-sm sm:text-base text-amber-300">
                  {currentAnimal.name}
                </h3>
                <span className="text-xs text-stone-400 italic">
                  ({currentAnimal.info.scientificName})
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-pixel text-[9px]">
                {currentAnimal.info.conservationStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Habitat Alami:</span>
                <span className="text-stone-200 font-medium">{currentAnimal.info.habitat}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Makanan Utama:</span>
                <span className="text-stone-200 font-medium">{currentAnimal.info.diet}</span>
              </div>
            </div>

            <div className="bg-emerald-950/30 p-3 rounded-lg border border-emerald-800/60">
              <span className="font-pixel text-[10px] text-emerald-400 block mb-1">
                🌿 PERAN PENTING DI EKOSISTEM:
              </span>
              <p className="text-xs text-emerald-200/90 leading-relaxed font-sans">
                {currentAnimal.info.ecologicalRole}
              </p>
            </div>

            <div className="bg-amber-950/30 p-3 rounded-lg border border-amber-800/60">
              <span className="font-pixel text-[10px] text-amber-400 block mb-1">
                ✨ FAKTA MENARIK:
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                {currentAnimal.info.funFact}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">
            Satwa ke-{selectedIdx + 1} dari {animals.length}
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onContinue();
            }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl border-2 border-emerald-400 font-pixel text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
          >
            LANJUTKAN MISI
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
