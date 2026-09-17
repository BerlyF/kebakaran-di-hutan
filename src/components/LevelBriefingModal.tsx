import React from 'react';
import { LevelConfig } from '../types';
import { Flame, Droplets, Target, Play, ArrowLeft, ShieldAlert, Sparkles, Home } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  level: LevelConfig;
  onStartLevel: () => void;
  onBack: () => void;
}

export const LevelBriefingModal: React.FC<Props> = ({ level, onStartLevel, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-stone-900 border-4 border-stone-700 rounded-xl p-5 sm:p-6 shadow-2xl text-stone-100 flex flex-col max-h-[90vh] overflow-y-auto font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3 mb-3">
          <div>
            <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              PENGARAHAN MISI PEMADAM KEBAKARAN HUTAN
            </span>
            <h2 className="font-pixel text-base sm:text-lg text-emerald-400 mt-1">
              {level.title}
            </h2>
            <p className="text-xs text-stone-400">{level.location} • {level.subtitle}</p>
          </div>
          <div className="px-3 py-1 bg-stone-800 border border-stone-700 rounded text-center">
            <span className="text-[9px] text-stone-400 block font-pixel">BATAS WAKTU</span>
            <span className="font-pixel text-xs sm:text-sm text-sky-400">{level.timeLimit}s</span>
          </div>
        </div>

        {/* Story */}
        <div className="bg-stone-950/70 p-3.5 rounded-lg border border-stone-800 mb-3 text-stone-300 text-xs sm:text-sm leading-relaxed">
          <p className="italic font-serif text-stone-200">"{level.briefing.story}"</p>
        </div>

        {/* Cause & Prevention Education Box (Requirement #10) */}
        <div className="bg-amber-950/40 border-2 border-amber-600/70 p-3.5 rounded-lg mb-3">
          <div className="flex items-center gap-2 text-amber-400 font-pixel text-xs mb-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>EDUKASI: PENYEBAB & PENCEGAHAN KEBAKARAN HUTAN</span>
          </div>
          <p className="text-xs text-amber-100 leading-relaxed">
            {level.briefing.causeAndPrevention}
          </p>
        </div>

        {/* Mission Objectives & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {/* Mission Objective */}
          <div className="bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-pixel text-[11px] mb-1.5">
              <Target className="w-4 h-4" />
              <span>MISI UTAMA</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {level.briefing.mission}
            </p>
          </div>

          {/* Tips */}
          <div className="bg-sky-950/30 border border-sky-800/60 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sky-400 font-pixel text-[11px] mb-1.5">
              <Droplets className="w-4 h-4" />
              <span>PETUNJUK LAPANGAN</span>
            </div>
            <p className="text-xs text-sky-200/90 leading-relaxed">
              {level.briefing.tips}
            </p>
          </div>
        </div>

        {/* Target Details: Fire Spots & Animals */}
        <div className="bg-stone-950/60 border border-stone-800 p-3 rounded-lg mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-pixel">
            <span className="text-orange-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {level.fireSpots.length} TITIK API
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              ZONA AMAN: {level.settlement.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {level.animals.map((an) => (
              <div key={an.id} className="bg-stone-900/90 p-2 rounded border border-stone-700 flex items-center gap-2">
                <span className="text-lg">🐾</span>
                <div>
                  <span className="font-pixel text-[10px] text-stone-200 block truncate">{an.name}</span>
                  <span className="text-[9px] text-amber-300 block truncate">Status: Terancam Asap</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-800">
          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg border border-stone-600 transition font-pixel text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            KEMBALI
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onStartLevel();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg border-2 border-emerald-400 transition font-pixel text-xs shadow-lg hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            MULAI MISI PEMADAMAN
          </button>
        </div>
      </div>
    </div>
  );
};
