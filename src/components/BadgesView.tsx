import React from 'react';
import { Badge } from '../types';
import { Shield, Heart, Award, Flame, Home, BookOpen, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  badges: Badge[];
  onBack: () => void;
}

export const BadgesView: React.FC<Props> = ({ badges, onBack }) => {
  const getBadgeIcon = (iconName: string, unlocked: boolean) => {
    const className = `w-7 h-7 ${unlocked ? 'text-amber-400' : 'text-stone-500'}`;
    switch (iconName) {
      case 'Flame':
        return <Flame className={className} />;
      case 'Home':
        return <Home className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="w-full min-h-screen bg-stone-950 p-4 sm:p-6 text-stone-100 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between pb-4 border-b-2 border-stone-800 mb-6 gap-3">
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
              <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
                PRESTASI SATGAS FOREST FIRE RESCUE
              </span>
              <h1 className="font-pixel text-base sm:text-xl text-stone-100 mt-0.5">
                Lencana & Piagam Konservasi Hutan
              </h1>
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-amber-950/50 border border-amber-800/80 rounded-lg">
            <span className="text-[10px] text-amber-400 font-pixel block">TERBUKA</span>
            <span className="font-pixel text-xs text-amber-300">
              {unlockedCount} / {badges.length} LENCANA
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-xl border-2 transition flex items-start gap-4 ${
                  badge.unlocked
                    ? 'bg-stone-900/90 border-amber-500/80 shadow-lg shadow-amber-950/20'
                    : 'bg-stone-900/40 border-stone-800 opacity-60'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 flex-shrink-0 ${
                    badge.unlocked
                      ? 'bg-amber-950/60 border-amber-400/80 shadow'
                      : 'bg-stone-950 border-stone-800'
                  }`}
                >
                  {badge.unlocked ? (
                    getBadgeIcon(badge.iconName, true)
                  ) : (
                    <Lock className="w-6 h-6 text-stone-600" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-pixel text-xs sm:text-sm text-stone-100">
                      {badge.title}
                    </h3>
                    {badge.unlocked && (
                      <span className="text-[9px] font-pixel text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> TERCAPAI
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-amber-400 font-medium block mt-0.5">
                    {badge.subtitle}
                  </span>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed font-sans">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
