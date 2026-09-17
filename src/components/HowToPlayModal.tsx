import React from 'react';
import { ArrowLeft, Flame, Droplets, Heart, Compass, ShieldAlert, Home, Sparkles } from 'lucide-react';
import { sounds } from '../services/sound';

interface Props {
  onBack: () => void;
}

export const HowToPlayModal: React.FC<Props> = ({ onBack }) => {
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
              <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
                PANDUAN OPERASI RESCUE PETUGAS
              </span>
              <h1 className="font-pixel text-base sm:text-xl text-stone-100 mt-0.5">
                Cara Bermain: Forest Fire Rescue
              </h1>
            </div>
          </div>
        </div>

        {/* Section 1: Controls */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-xl p-5 sm:p-6 mb-6">
          <h2 className="font-pixel text-xs sm:text-sm text-amber-400 mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4" /> KONTROL PETUGAS PENYELAMAT LINGKUNGAN
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {/* Movement */}
            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 flex flex-col items-center text-center">
              <div className="flex gap-1 mb-2 font-pixel text-xs">
                <span className="px-2 py-1 bg-stone-800 rounded border border-stone-600">W</span>
                <span className="px-2 py-1 bg-stone-800 rounded border border-stone-600">A</span>
                <span className="px-2 py-1 bg-stone-800 rounded border border-stone-600">S</span>
                <span className="px-2 py-1 bg-stone-800 rounded border border-stone-600">D</span>
              </div>
              <span className="font-semibold text-stone-200">Pergerakan Petugas</span>
              <p className="text-stone-400 text-[11px] mt-1">
                Gunakan tombol <b>W, A, S, D</b> atau <b>Tombol Panah</b> (atau Virtual D-Pad di layar sentuh) untuk bergerak di dalam area hutan dan pemukiman.
              </p>
            </div>

            {/* Water Refill E */}
            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 flex flex-col items-center text-center">
              <div className="mb-2">
                <span className="px-3 py-1 bg-sky-950 border border-sky-600 text-sky-300 font-pixel text-xs rounded">
                  [E] / [ENTER]
                </span>
              </div>
              <span className="font-semibold text-sky-300 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" /> Isi Ulang Tangki Air
              </span>
              <p className="text-stone-400 text-[11px] mt-1">
                Dekati aliran <b>Sungai</b>, <b>Pompa Sumur Bor</b>, atau <b>Pos Hidran Damkar</b>, lalu tekan <b>[E]</b> untuk mengisi penuh tangki air (100L).
              </p>
            </div>

            {/* Spray Water / Rescue Spacebar */}
            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 flex flex-col items-center text-center">
              <div className="mb-2">
                <span className="px-3 py-1 bg-amber-950 border border-amber-600 text-amber-300 font-pixel text-xs rounded">
                  [SPASI] (HOLD)
                </span>
              </div>
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> Semprot Air & Evakuasi
              </span>
              <p className="text-stone-400 text-[11px] mt-1">
                Arahkan semprotan air ke titik api berkobar hingga padam. Dekati satwa liar yang terjebak untuk membebaskannya dari asap tebal!
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Core Gameplay Mechanics */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-xl p-5 sm:p-6 mb-6">
          <h2 className="font-pixel text-xs sm:text-sm text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> MEKANISME & ATURAN UTAMA GAME
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-orange-400 font-pixel text-[11px]">
                <Flame className="w-4 h-4" /> 1. Padamkan Titik Api Sebelum Menyebar
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Setiap titik api memiliki tingkat intensitas kobaran. Jika dibiarkan terlalu lama, api dapat merambat membakar pepohonan sekitar dan mendekati pemukiman. Segera semprotkan air hingga keluar uap putih tanda api padam!
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-pixel text-[11px]">
                <Droplets className="w-4 h-4" /> 2. Manajemen Sumber Air
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Kapasitas tangki airmu adalah 100 Liter. Jangan biarkan air habis saat memadamkan api! Segera lari ke sungai atau pos hidran terdekat untuk mengisi ulang tangki dengan menekan tombol <b>[E]</b>.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-pixel text-[11px]">
                <Heart className="w-4 h-4" /> 3. Menyelamatkan Satwa Liar
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Beberapa satwa langka terjebak di dekat semak terbakar dan kepulan asap. Dekati mereka dan tekan <b>[SPASI]</b> untuk membebaskan mereka. Satwa akan mengikutimu kembali ke <b>Area Pemukiman / Posko Evakuasi Warga</b>.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-lg border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-pixel text-[11px]">
                <Home className="w-4 h-4" /> 4. Melindungi Pemukiman & Lingkungan
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Zona pemukiman warga desa dan suaka harus tetap aman. Jika api menyebar terlalu jauh melebihi batas toleransi, misi akan gagal dan kamu harus mengulang misi pemadaman.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Educational Scoring */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-xl p-5 sm:p-6">
          <h2 className="font-pixel text-xs sm:text-sm text-amber-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> SISTEM SKOR & KUIS EDUKASI
          </h2>
          <div className="space-y-2 text-stone-300 text-xs leading-relaxed font-sans">
            <p>
              • <b>+150 Poin</b> untuk setiap titik api yang berhasil dipadamkan tuntas.
            </p>
            <p>
              • <b>+400 Poin</b> untuk setiap satwa liar yang selamat sampai ke Posko Pemukiman.
            </p>
            <p>
              • <b>Bonus Sisa Waktu</b>: Kecepatanmu memadamkan api dan menyelamatkan lingkungan memberikan poin tambahan!
            </p>
            <p>
              • <b>Kuis Pengetahuan</b>: Ikuti kuis interaktif setelah menyelesaikan level untuk menambah skor dan mengoleksi lencana konservasi hutan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
