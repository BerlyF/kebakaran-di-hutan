import React from 'react';
import { GAME_LEVELS } from '../data/levels';
import { LevelConfig } from '../types';
import { Play, ArrowLeft, CheckCircle2, Lock, Flame, Clock, Home } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  completedLevels: number[];
  onSelectLevel: (level: LevelConfig) => void;
  onBack: () => void;
}

export const LevelSelectView: React.FC<Props> = ({
  completedLevels,
  onSelectLevel,
  onBack
}) => {
  return (
    <div className="w-full min-h-screen bg-stone-950 p-4 sm:p-6 text-stone-100 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onBack();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded border border-stone-700 font-pixel text-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              KEMBALI
            </button>
            <div>
              <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                PETA SEKTOR OPERASI PEMADAMAN
              </span>
              <h1 className="font-pixel text-base sm:text-xl text-stone-100 mt-0.5">
                Pilih Wilayah Penyelamatan Hutan
              </h1>
            </div>
          </div>
        </div>

        {/* Level Cards */}
        <div className="space-y-4">
          {GAME_LEVELS.map((level, idx) => {
            const isCompleted = completedLevels.includes(level.id);
            const isUnlocked = idx === 0 || completedLevels.includes(GAME_LEVELS[idx - 1].id);

            return (
              <div
                key={level.id}
                className={`p-5 rounded-xl border-2 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isUnlocked
                    ? 'bg-stone-900/90 border-stone-700 hover:border-amber-500 shadow-lg'
                    : 'bg-stone-900/40 border-stone-800/60 opacity-60'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-pixel text-sm flex-shrink-0 border-2 ${
                      isCompleted
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400'
                        : isUnlocked
                        ? 'bg-amber-950 border-amber-400 text-amber-400'
                        : 'bg-stone-950 border-stone-800 text-stone-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isUnlocked ? (
                      `#${level.id}`
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-pixel text-xs sm:text-sm text-stone-100">
                        {level.title}
                      </h3>
                      {isCompleted && (
                        <span className="font-pixel text-[9px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          TERKENDALI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-1">{level.location} • {level.subtitle}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-stone-300">
                      <span className="flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 text-orange-400">
                        <Flame className="w-3.5 h-3.5" />
                        {level.fireSpots.length} Titik Api
                      </span>
                      <span className="flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 text-rose-400">
                        🐾 {level.animals.length} Satwa Terancam
                      </span>
                      <span className="flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 text-sky-400">
                        <Clock className="w-3.5 h-3.5" />
                        {level.timeLimit}s
                      </span>
                      <span className="flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 text-emerald-400">
                        <Home className="w-3.5 h-3.5" />
                        {level.settlement.name}
                      </span>
                    </div>

                    {/* Animal Name Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {level.animals.map((an) => (
                        <span key={an.id} className="text-[10px] bg-stone-950/80 text-stone-300 px-2 py-0.5 rounded border border-stone-800 font-sans">
                          🐾 {an.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto justify-end">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectLevel(level);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg border border-amber-400 font-pixel text-xs flex items-center justify-center gap-2 shadow hover:scale-105 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      {isCompleted ? 'MAIN LAGI' : 'MULAI MISI'}
                    </button>
                  ) : (
                    <span className="text-xs text-stone-500 font-pixel flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      TERKUNCI
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
