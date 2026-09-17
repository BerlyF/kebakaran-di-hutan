import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { sounds } from '../services/sound';
import confetti from 'canvas-confetti';

interface Props {
  onBack: () => void;
  onAddScore: (points: number) => void;
  onQuizCompleted: (correctCount: number, totalCount: number) => void;
}

export const QuizView: React.FC<Props> = ({ onBack, onAddScore, onQuizCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [scoreEarned, setScoreEarned] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playQuizCorrect();
      setScoreEarned((prev) => prev + currentQ.points);
      setCorrectAnswersCount((prev) => prev + 1);
      onAddScore(currentQ.points);
    } else {
      sounds.playQuizWrong();
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      sounds.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      onQuizCompleted(correctAnswersCount + (selectedOption === currentQ.correctIndex ? 1 : 0), QUIZ_QUESTIONS.length);
    }
  };

  const handleRestartQuiz = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScoreEarned(0);
    setCorrectAnswersCount(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full min-h-screen bg-stone-950 p-4 sm:p-6 text-stone-100 font-sans flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-stone-900 border-4 border-stone-700 rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onBack();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-xs transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              KEMBALI
            </button>
            <div>
              <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
                Uji Pemahaman Siswa Kelas 11 SMA
              </span>
              <h2 className="font-pixel text-base sm:text-lg text-amber-400 mt-0.5">
                Kuis Pencegahan & Penanganan Karhutla
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-amber-950/60 border border-amber-800/80 rounded text-right">
              <span className="text-[10px] text-amber-400/80 block font-pixel">BONUS SKOR</span>
              <span className="font-pixel text-xs text-amber-300">+{scoreEarned} Poin</span>
            </div>
          </div>
        </div>

        {!isFinished ? (
          <>
            {/* Progress Bar & Question Counter */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-pixel">
                <span>PERTANYAAN {currentIndex + 1} DARI {QUIZ_QUESTIONS.length}</span>
                <span className="text-emerald-400">{currentQ.topic}</span>
              </div>
              <div className="w-full bg-stone-950 h-2.5 rounded-full overflow-hidden border border-stone-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-stone-950/80 p-5 rounded-lg border border-stone-800 mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-stone-100 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-stone-800/80 hover:bg-stone-750 border-stone-700 text-stone-200';

                if (hasAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
                  } else {
                    btnStyle = 'bg-stone-900/60 border-stone-800 text-stone-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition flex items-center justify-between gap-3 text-xs sm:text-sm ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center font-pixel text-xs text-stone-300 flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>

                    {hasAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {hasAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {hasAnswered && (
              <div
                className={`p-4 rounded-lg border mb-6 text-xs sm:text-sm animate-fadeIn ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-100'
                    : 'bg-rose-950/30 border-rose-800/80 text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2 font-pixel text-xs mb-1.5">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> JAWABAN BENAR! (+{currentQ.points} POIN)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> JAWABAN BELUM TEPAT
                    </span>
                  )}
                </div>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                  <b className="text-stone-200">Penjelasan Ilmiah:</b> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {hasAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg border-2 border-emerald-400 font-pixel text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition"
                >
                  {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'PERTANYAAN BERIKUTNYA' : 'LIHAT HASIL AKHIR'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Finished Quiz Result Card */
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mb-4 shadow-xl">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="font-pixel text-lg sm:text-xl text-amber-300 mb-1">
              KUIS SELESAI!
            </h3>
            <p className="text-sm text-stone-300 mb-6">
              Kamu berhasil menyelesaikan Kuis Edukasi Pencegahan & Penanganan Kebakaran Hutan!
            </p>

            <div className="w-full bg-stone-950/80 p-5 rounded-lg border border-stone-800 mb-6 max-w-md">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800 text-xs text-stone-400">
                <span>Skor Jawaban Benar:</span>
                <span className="font-pixel text-emerald-400 text-sm">
                  {correctAnswersCount} / {QUIZ_QUESTIONS.length} Benar
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 text-xs text-stone-400">
                <span>Total Poin Bonus Game:</span>
                <span className="font-pixel text-amber-400 text-sm">+{scoreEarned} POIN</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                ULANGI KUIS
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onBack();
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded border-2 border-emerald-400 font-pixel text-xs flex items-center gap-2 shadow-lg"
              >
                KEMBALI KE MENU UTAMA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
