import React, { useState } from 'react';
import { EDUCATION_TOPICS } from '../data/education';
import { Flame, AlertTriangle, ShieldCheck, Trees, Droplets, Sparkles, ArrowLeft, BookOpen, Lightbulb, Heart } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  onBack: () => void;
  onGoToQuiz: () => void;
}

export const EducationView: React.FC<Props> = ({ onBack, onGoToQuiz }) => {
  const [activeTabId, setActiveTabId] = useState<string>(EDUCATION_TOPICS[0].id);

  const activeTopic = EDUCATION_TOPICS.find((t) => t.id === activeTabId) || EDUCATION_TOPICS[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'penyebab-kebakaran-hutan':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'dampak-kebakaran-hutan':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'cara-mencegah-kebakaran':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'pentingnya-menjaga-hutan':
        return <Trees className="w-4 h-4 text-teal-400" />;
      case 'manfaat-hutan-kehidupan':
        return <Droplets className="w-4 h-4 text-sky-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-950 p-4 sm:p-6 text-stone-100 font-sans flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-stone-800 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded border border-stone-700 transition font-pixel text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            KEMBALI
          </button>
          <div>
            <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
              KURIKULUM EDUKASI KELAS 11 SMA
            </span>
            <h1 className="font-pixel text-base sm:text-xl text-stone-100 mt-0.5">
              Pencegahan & Penanganan Kebakaran Hutan
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onGoToQuiz();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded border border-amber-400 transition font-pixel text-xs shadow-lg hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          IKUTI KUIS EDUKASI
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Tabs (Left Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="font-pixel text-[10px] text-stone-400 mb-1 px-1">
            TOPIK MATERI EDUKASI:
          </span>
          {EDUCATION_TOPICS.map((topic) => {
            const isActive = topic.id === activeTabId;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTabId(topic.id);
                }}
                className={`w-full text-left p-3.5 rounded-lg border transition flex items-center gap-3 ${
                  isActive
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-md translate-x-1'
                    : 'bg-stone-900/80 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                }`}
              >
                <div
                  className={`p-2 rounded flex-shrink-0 ${
                    isActive ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {getTabIcon(topic.id)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-pixel text-xs leading-snug truncate">
                    {topic.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 font-sans">
                    {topic.summary}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Quick Info Box */}
          <div className="mt-4 p-4 rounded-lg bg-stone-900/90 border border-stone-800 text-xs">
            <h4 className="font-pixel text-[10px] text-amber-400 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              TAHUKAH KAMU?
            </h4>
            <p className="text-stone-300 leading-relaxed text-[11px] font-sans">
              Lebih dari 99% kejadian kebakaran hutan dan lahan (karhutla) di Indonesia dipicu oleh aktivitas manusia, baik disengaja demi pembukaan lahan maupun kelalaian seperti puntung rokok dan api unggun!
            </p>
          </div>
        </div>

        {/* Content Display (Right Panel) */}
        <div className="lg:col-span-8 bg-stone-900 border-2 border-stone-800 rounded-xl p-6 shadow-xl flex flex-col">
          {/* Header of Active Topic */}
          <div className="border-b-2 border-stone-800 pb-4 mb-4">
            <div className="flex items-center gap-2 text-amber-400 font-pixel text-xs mb-1">
              {getTabIcon(activeTopic.id)}
              <span>MATERI PEMBELAJARAN</span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-stone-100">
              {activeTopic.title}
            </h2>
            <p className="text-sm text-stone-300 mt-2 leading-relaxed font-sans">
              {activeTopic.summary}
            </p>
          </div>

          {/* Core Bullet Points */}
          <div className="space-y-3 mb-6">
            {activeTopic.points.map((pt, idx) => {
              const [title, ...descParts] = pt.split(': ');
              const desc = descParts.join(': ');

              return (
                <div
                  key={idx}
                  className="bg-stone-950/60 border border-stone-800/80 p-3.5 rounded-lg flex items-start gap-3 hover:border-amber-500/40 transition"
                >
                  <span className="font-pixel text-xs text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 mt-0.5 flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="text-xs sm:text-sm font-sans">
                    {desc ? (
                      <>
                        <b className="text-amber-300 block mb-1 font-semibold">{title}</b>
                        <span className="text-stone-300 leading-relaxed">{desc}</span>
                      </>
                    ) : (
                      <span className="text-stone-200 leading-relaxed">{title}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scientific Fact Box */}
          <div className="bg-sky-950/30 border border-sky-800/60 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-sky-400 font-pixel text-xs mb-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>FAKTA SAINS & EKOLOGI</span>
            </div>
            <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed font-sans">
              {activeTopic.scientificFact}
            </p>
          </div>

          {/* Action Guide for Class 11 Students */}
          <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-pixel text-xs mb-1.5">
              <Heart className="w-4 h-4" />
              <span>PERAN NYATA PELAJAR KELAS 11</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-sans">
              {activeTopic.actionGuide}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
