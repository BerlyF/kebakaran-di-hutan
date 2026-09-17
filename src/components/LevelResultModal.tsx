import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, ArrowRight, BookOpen, AlertTriangle, CheckCircle2, Flame, Droplets, Sparkles, Home } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  isVictory: boolean;
  score: number;
  animalsSaved: number;
  totalAnimalsInLevel: number;
  firesExtinguished?: number;
  totalFiresInLevel?: number;
  failedReason?: string;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onOpenEncyclopedia: () => void;
  onGoToQuiz: () => void;
  onExit: () => void;
}

export const LevelResultModal: React.FC<Props> = ({
  isVictory,
  score,
  animalsSaved,
  totalAnimalsInLevel,
  firesExtinguished,
  totalFiresInLevel,
  failedReason,
  hasNextLevel,
  onNextLevel,
  onRetry,
  onOpenEncyclopedia,
  onGoToQuiz,
  onExit
}) => {
  useEffect(() => {
    if (isVictory) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [isVictory]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-stone-900 border-4 border-stone-700 rounded-xl p-5 sm:p-6 shadow-2xl text-stone-100 flex flex-col items-center text-center font-sans max-h-[95vh] overflow-y-auto">
        {isVictory ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-2.5 shadow-lg">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="font-pixel text-base sm:text-xl text-emerald-400 mb-1">
              API BERHASIL DIKENDALIKAN!
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-sans mb-4">
              Hebat! Seluruh titik kebakaran hutan berhasil dipadamkan dan satwa liar telah dievakuasi ke zona aman pemukiman warga.
            </p>

            {/* Score Card */}
            <div className="w-full bg-stone-950/80 rounded-lg border border-stone-800 p-3.5 mb-3.5 text-left font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-stone-400">
                <span>Rincian Operasi Forest Fire Rescue</span>
                <span className="font-pixel text-amber-400 text-sm">+{score} Poin</span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> Titik Api Dipadamkan:
                  </span>
                  <span className="font-pixel text-emerald-400 font-bold">
                    {firesExtinguished ?? totalFiresInLevel ?? 4} / {totalFiresInLevel ?? 4} Titik (100%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    🐾 Satwa Selamat di Pemukiman:
                  </span>
                  <span className="font-pixel text-emerald-400 font-bold">
                    {animalsSaved} / {totalAnimalsInLevel} Ekor
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-sky-400" /> Keamanan Pemukiman:
                  </span>
                  <span className="font-pixel text-sky-400 font-bold">Terlindungi 100%</span>
                </div>
              </div>
            </div>

            {/* Quiz Recommendation Banner with Bonus Points */}
            <div className="w-full bg-amber-950/40 border-2 border-amber-600/70 rounded-lg p-3.5 mb-3.5 text-left flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[11px] mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KUIS SETELAH LEVEL (POIN TAMBAHAN!)</span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Uji pemahamanmu tentang pencegahan kebakaran hutan & dapatkan +150 poin per jawaban benar!
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  onGoToQuiz();
                }}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-pixel text-[10px] rounded border border-amber-400 flex items-center gap-1 whitespace-nowrap shadow hover:scale-105 transition flex-shrink-0"
              >
                IKUTI KUIS
              </button>
            </div>

            {/* Encyclopedia / Education CTA */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenEncyclopedia();
              }}
              className="w-full bg-stone-950/70 hover:bg-stone-800/80 border border-stone-700 rounded-lg p-3 mb-4 text-left flex items-center justify-between gap-2 transition"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-pixel text-[10px] text-emerald-300">JURNAL SATWA & MANFAAT HUTAN</h4>
                  <p className="text-[10px] text-stone-400">
                    Pelajari nama ilmiah, peran ekologis satwa, dan manfaat hutan bagi kehidupan.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
            </button>

            {/* Action Buttons */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => {
                  sounds.playClick();
                  onRetry();
                }}
                className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                ULANGI
              </button>

              {hasNextLevel ? (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onNextLevel();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded border-2 border-emerald-400 font-pixel text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <span>LEVEL BERIKUTNYA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onExit();
                  }}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded border-2 border-amber-400 font-pixel text-xs flex items-center gap-2 shadow-lg"
                >
                  <Award className="w-4 h-4" />
                  <span>KEMBALI KE MENU</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 mb-3 shadow-lg">
              <AlertTriangle className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="font-pixel text-lg sm:text-xl text-rose-400 mb-1">
              MISI GAGAL
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-sans mb-5 max-w-sm">
              {failedReason || 'Api menyebar terlalu jauh dan membahayakan lingkungan serta pemukiman warga! Kamu harus mengulang misi.'}
            </p>

            <div className="w-full bg-rose-950/30 border border-rose-800/60 rounded-lg p-3.5 mb-6 text-left text-xs text-rose-200/90 leading-relaxed font-sans">
              <span className="font-pixel text-[11px] text-rose-300 block mb-1">
                💡 TIPS PENCEGAHAN & PENANGANAN:
              </span>
              Segera isi ulang air di sungai atau posko hidran saat tangki menipis. Prioritaskan memadamkan titik api yang paling dekat dengan pemukiman warga atau satwa liar yang terkepung asap!
            </div>

            <div className="w-full flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onExit();
                }}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-xs"
              >
                MENU UTAMA
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onRetry();
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded border-2 border-rose-400 font-pixel text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
              >
                <RotateCcw className="w-4 h-4" />
                ULANGI MISI
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
