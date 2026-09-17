import React, { useEffect, useRef, useState } from 'react';
import { Play, BookOpen, HelpCircle, Award, Volume2, VolumeX, Flame, Droplets, Trees, Sparkles, LogOut, X } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  onStartGame: () => void;
  onOpenEducation: () => void;
  onOpenQuiz: () => void;
  onOpenHowToPlay: () => void;
  onOpenBadges: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  highScore: number;
  rescuedTotal: number;
}

export const MainMenu: React.FC<Props> = ({
  onStartGame,
  onOpenEducation,
  onOpenQuiz,
  onOpenHowToPlay,
  onOpenBadges,
  soundEnabled,
  onToggleSound,
  highScore,
  rescuedTotal
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Animated Pixel Forest Fire Rescue Scene on Main Menu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      // Dusk / Golden Sunset Atmosphere with Ember Glow
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1c1917'); // dark twilight
      grad.addColorStop(0.45, '#78350f'); // warm amber twilight
      grad.addColorStop(0.75, '#1e3a5f'); // blue river bank
      grad.addColorStop(1, '#14532d'); // forest floor
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Distant rolling hills
      ctx.fillStyle = '#0f291e';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.65);
      ctx.lineTo(w * 0.25, h * 0.48);
      ctx.lineTo(w * 0.55, h * 0.68);
      ctx.lineTo(w * 0.8, h * 0.45);
      ctx.lineTo(w, h * 0.62);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Flowing blue river
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, h * 0.82, w, h * 0.18);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let x = 0; x < w; x += 40) {
        const wave = Math.sin(t * 2.5 + x) * 2.5;
        ctx.fillRect(x + ((t * 25) % 40), h * 0.86 + wave, 22, 2.5);
      }

      // Foreground trees
      for (let i = 0; i < 9; i++) {
        const tx = (i * (w / 8)) + Math.sin(i * 1.5) * 14;
        const ty = h * 0.74;
        // Trunk
        ctx.fillStyle = '#451a03';
        ctx.fillRect(tx + 12, ty, 8, 26);
        // Foliage
        ctx.fillStyle = i % 2 === 0 ? '#15803d' : '#166534';
        ctx.beginPath();
        ctx.moveTo(tx + 16, ty - 42);
        ctx.lineTo(tx - 12, ty + 6);
        ctx.lineTo(tx + 44, ty + 6);
        ctx.fill();
      }

      // Rising sparks and firefly embers
      for (let j = 0; j < 22; j++) {
        const lx = ((j * 37 + t * 18) % w);
        const ly = ((h * 0.85) - ((j * 23 + t * 35) % (h * 0.65)));
        const emberColor = j % 3 === 0 ? '#f97316' : j % 3 === 1 ? '#fbbf24' : '#ef4444';
        ctx.fillStyle = emberColor;
        ctx.fillRect(lx, ly, 3, 3);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 text-stone-100 overflow-hidden font-sans">
      {/* Background Animated Pixel Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
      />

      {/* Top Navbar */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2 bg-stone-900/85 border border-stone-800 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow">
          <Trees className="w-4 h-4 text-emerald-400" />
          <span className="font-pixel text-[9px] sm:text-[10px] text-stone-300">
            PROYEK TUGAS SEKOLAH SISWA KELAS 11 SMA
          </span>
        </div>

        <div className="flex items-center gap-3">
          {highScore > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-950/70 border border-amber-700 px-3 py-1 rounded-full text-xs font-pixel text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>SKOR TERTINGGI: {highScore}</span>
            </div>
          )}

          {rescuedTotal > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-700 px-3 py-1 rounded-full text-xs font-pixel text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{rescuedTotal} SATWA DISELAMATKAN</span>
            </div>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="p-2.5 bg-stone-900/85 hover:bg-stone-800 text-stone-300 rounded-full border border-stone-700 transition"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
          <span className="font-pixel text-[11px] sm:text-xs tracking-widest uppercase">
            Game Edukasi Pencegahan & Penanganan Kebakaran Hutan
          </span>
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
        </div>

        <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-orange-400 to-red-500 drop-shadow-[0_4px_16px_rgba(249,115,22,0.45)] tracking-wide mb-3">
          FOREST FIRE
          <br />
          RESCUE
        </h1>

        <p className="max-w-xl text-stone-300 text-xs sm:text-sm leading-relaxed font-sans bg-stone-950/70 p-3.5 rounded-lg border border-stone-800/80 backdrop-blur-sm mb-6">
          Berperanlah sebagai petugas penyelamat lingkungan! Padamkan titik api hutan menggunakan semprotan air, kelola sumber air dari sungai, selamatkan satwa liar dari kepungan asap, dan lindungi pemukiman warga desa dari bahaya kebakaran hutan.
        </p>

        {/* Primary Play Button (Menu 1: Mulai Game) */}
        <button
          onClick={() => {
            sounds.playClick();
            onStartGame();
          }}
          className="group relative px-8 sm:px-12 py-4 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-pixel text-sm sm:text-base rounded-xl border-4 border-amber-400 shadow-[0_0_30px_rgba(249,115,22,0.5)] transition flex items-center gap-3 hover:scale-105 mb-6"
        >
          <Play className="w-5 h-5 text-amber-200 fill-amber-200 group-hover:translate-x-1 transition" />
          <span>MULAI GAME</span>
        </button>

        {/* Secondary Navigation Menu Buttons (Materi Edukasi, Kuis, Cara Bermain, Lencana, Keluar) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full max-w-3xl">
          {/* Menu 2: Materi Edukasi */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenEducation();
            }}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 bg-stone-900/90 hover:bg-stone-800/90 border-2 border-stone-700 hover:border-emerald-500 rounded-lg transition text-stone-200 group shadow"
          >
            <BookOpen className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition" />
            <span className="font-pixel text-[10px]">MATERI EDUKASI</span>
          </button>

          {/* Menu 3: Kuis */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenQuiz();
            }}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 bg-stone-900/90 hover:bg-stone-800/90 border-2 border-stone-700 hover:border-amber-500 rounded-lg transition text-stone-200 group shadow"
          >
            <Sparkles className="w-5 h-5 text-amber-400 mb-1 group-hover:scale-110 transition" />
            <span className="font-pixel text-[10px]">KUIS INTERAKTIF</span>
          </button>

          {/* Menu 4: Cara Bermain */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenHowToPlay();
            }}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 bg-stone-900/90 hover:bg-stone-800/90 border-2 border-stone-700 hover:border-sky-500 rounded-lg transition text-stone-200 group shadow"
          >
            <HelpCircle className="w-5 h-5 text-sky-400 mb-1 group-hover:scale-110 transition" />
            <span className="font-pixel text-[10px]">CARA BERMAIN</span>
          </button>

          {/* Menu 5: Lencana Penghargaan */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenBadges();
            }}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 bg-stone-900/90 hover:bg-stone-800/90 border-2 border-stone-700 hover:border-yellow-500 rounded-lg transition text-stone-200 group shadow"
          >
            <Award className="w-5 h-5 text-yellow-400 mb-1 group-hover:scale-110 transition" />
            <span className="font-pixel text-[10px]">LENCANA PRESTASI</span>
          </button>

          {/* Menu 6: Keluar */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowExitModal(true);
            }}
            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 sm:p-3.5 bg-stone-900/90 hover:bg-rose-950/60 border-2 border-stone-700 hover:border-rose-500 rounded-lg transition text-stone-200 group shadow"
          >
            <LogOut className="w-5 h-5 text-rose-400 mb-1 group-hover:scale-110 transition" />
            <span className="font-pixel text-[10px] text-rose-300">KELUAR</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full max-w-4xl flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-800/60 font-sans">
        <span>© 2026 Forest Fire Rescue • Proyek Tugas Sekolah Siswa Kelas 11 SMA</span>
        <span>Edukasi Pencegahan Karhutla & Pelestarian Ekosistem Indonesia</span>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 border-4 border-stone-700 rounded-xl p-6 shadow-2xl text-stone-100 flex flex-col items-center text-center font-sans animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-400 mb-3">
              <LogOut className="w-6 h-6" />
            </div>

            <h3 className="font-pixel text-sm sm:text-base text-stone-100 mb-2">
              Keluar Dari Game?
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-6 font-sans">
              Progres petualangan dan lencana yang telah kamu raih tersimpan secara otomatis di browsermu. Kamu bisa kembali melanjutkan misi penyelamatan hutan kapan saja!
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-xs transition"
              >
                KEMBALI KE GAME
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  window.location.reload();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded border border-rose-400 font-pixel text-xs transition shadow"
              >
                TUTUP SESI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
