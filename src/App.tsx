import React, { useState, useEffect } from 'react';
import { GameView, LevelConfig, Badge, UserProgress } from './types';
import { GAME_LEVELS } from './data/levels';
import { INITIAL_BADGES } from './data/badges';
import { MainMenu } from './components/MainMenu';
import { LevelSelectView } from './components/LevelSelectView';
import { LevelBriefingModal } from './components/LevelBriefingModal';
import { PixelGameCanvas } from './components/PixelGameCanvas';
import { LevelResultModal } from './components/LevelResultModal';
import { AnimalEncyclopediaModal } from './components/AnimalEncyclopediaModal';
import { EducationView } from './components/EducationView';
import { QuizView } from './components/QuizView';
import { BadgesView } from './components/BadgesView';
import { HowToPlayModal } from './components/HowToPlayModal';
import { sounds } from './services/sound';

export default function App() {
  const [view, setView] = useState<GameView>('menu');
  const [selectedLevel, setSelectedLevel] = useState<LevelConfig>(GAME_LEVELS[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sounds.enabled);
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);

  // User persistent progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('animal_rescue_user_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      score: 0,
      highScore: 0,
      completedLevels: [],
      unlockedBadges: [],
      quizScores: {},
      totalAnimalsSaved: 0,
      soundEnabled: true
    };
  });

  // Badges state with unlocked flags
  const [badges, setBadges] = useState<Badge[]>(() => {
    return INITIAL_BADGES.map((b) => ({
      ...b,
      unlocked: progress.unlockedBadges.includes(b.id)
    }));
  });

  // Level result evaluation modal state
  const [levelResult, setLevelResult] = useState<{
    isVictory: boolean;
    score: number;
    animalsSaved: number;
    totalAnimalsInLevel: number;
    failedReason?: string;
  }>({
    isVictory: false,
    score: 0,
    animalsSaved: 0,
    totalAnimalsInLevel: 0
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animal_rescue_user_progress', JSON.stringify(progress));
    setBadges((prev) =>
      prev.map((b) => ({
        ...b,
        unlocked: progress.unlockedBadges.includes(b.id)
      }))
    );
  }, [progress]);

  const unlockBadge = (badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId]
      };
    });
  };

  const handleToggleSound = () => {
    const nextState = sounds.toggleSound();
    setSoundEnabled(nextState);
  };

  const handleStartGame = () => {
    setView('level-select');
  };

  const handleSelectLevel = (level: LevelConfig) => {
    setSelectedLevel(level);
    setView('briefing');
  };

  const handleStartLevelExecution = () => {
    setShowEncyclopedia(false);
    setView('playing');
  };

  const handleLevelComplete = (earnedScore: number, animalsSaved: number) => {
    const newCompleted = progress.completedLevels.includes(selectedLevel.id)
      ? progress.completedLevels
      : [...progress.completedLevels, selectedLevel.id];

    const totalScore = progress.score + earnedScore;
    const newHighScore = Math.max(progress.highScore, totalScore);
    const newTotalSaved = progress.totalAnimalsSaved + animalsSaved;

    setProgress((prev) => ({
      ...prev,
      score: totalScore,
      highScore: newHighScore,
      completedLevels: newCompleted,
      totalAnimalsSaved: newTotalSaved
    }));

    // Unlock Badges based on accomplishments
    unlockBadge('penjaga-hutan'); // First patrol / fire control
    if (animalsSaved > 0) {
      unlockBadge('penyelamat-satwa'); // Animal rescue from fire
    }
    if (selectedLevel.id >= 2 || newTotalSaved >= 4) {
      unlockBadge('pemadam-tangguh'); // Skilled fire fighter
    }
    if (newCompleted.length >= GAME_LEVELS.length) {
      unlockBadge('pahlawan-lingkungan'); // Highest eco guardian title
    }
    unlockBadge('pelindung-pemukiman'); // Settlement barrier guarded

    setLevelResult({
      isVictory: true,
      score: earnedScore,
      animalsSaved,
      totalAnimalsInLevel: selectedLevel.animals.length
    });

    // Automatically open the animal encyclopedia briefing so the student learns about the rescued animals!
    setShowEncyclopedia(true);
    setView('level-complete');
  };

  const handleLevelFailed = (reason: string) => {
    setLevelResult({
      isVictory: false,
      score: 0,
      animalsSaved: 0,
      totalAnimalsInLevel: selectedLevel.animals.length,
      failedReason: reason
    });
    setShowEncyclopedia(false);
    setView('level-failed');
  };

  const handleNextLevel = () => {
    const currentIndex = GAME_LEVELS.findIndex((l) => l.id === selectedLevel.id);
    if (currentIndex + 1 < GAME_LEVELS.length) {
      setSelectedLevel(GAME_LEVELS[currentIndex + 1]);
      setView('briefing');
    } else {
      setView('badges');
    }
  };

  const handleRetryLevel = () => {
    setShowEncyclopedia(false);
    setView('playing');
  };

  const handleAddQuizScore = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      score: prev.score + points,
      highScore: Math.max(prev.highScore, prev.score + points)
    }));
  };

  const handleQuizCompleted = (correctCount: number, totalCount: number) => {
    if (correctCount >= 3) {
      unlockBadge('cendekia-konservasi');
    }
    if (correctCount === totalCount && progress.completedLevels.length >= GAME_LEVELS.length) {
      unlockBadge('pahlawan-lingkungan');
    }
  };

  return (
    <main className="w-full min-h-screen bg-stone-950 text-stone-100 font-sans select-none antialiased">
      {/* 1. Main Menu View */}
      {view === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onOpenEducation={() => setView('education')}
          onOpenQuiz={() => setView('quiz')}
          onOpenHowToPlay={() => setView('how-to-play')}
          onOpenBadges={() => setView('badges')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          highScore={progress.highScore}
          rescuedTotal={progress.totalAnimalsSaved}
        />
      )}

      {/* 2. Level Selection View */}
      {view === 'level-select' && (
        <LevelSelectView
          completedLevels={progress.completedLevels}
          onSelectLevel={handleSelectLevel}
          onBack={() => setView('menu')}
        />
      )}

      {/* 3. Level Briefing Modal */}
      {view === 'briefing' && (
        <LevelBriefingModal
          level={selectedLevel}
          onStartLevel={handleStartLevelExecution}
          onBack={() => setView('level-select')}
        />
      )}

      {/* 4. Active Pixel Game Canvas */}
      {view === 'playing' && (
        <PixelGameCanvas
          level={selectedLevel}
          onLevelComplete={handleLevelComplete}
          onLevelFailed={handleLevelFailed}
          onExit={() => setView('menu')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* 5. Post-Level Animal Encyclopedia Debriefing */}
      {showEncyclopedia && view === 'level-complete' && (
        <AnimalEncyclopediaModal
          animals={selectedLevel.animals}
          levelTitle={selectedLevel.title}
          scoreEarned={levelResult.score}
          onContinue={() => setShowEncyclopedia(false)}
        />
      )}

      {/* 6. Level Result Modal (Victory or Defeat) */}
      {!showEncyclopedia && (view === 'level-complete' || view === 'level-failed') && (
        <LevelResultModal
          isVictory={levelResult.isVictory}
          score={levelResult.score}
          animalsSaved={levelResult.animalsSaved}
          totalAnimalsInLevel={levelResult.totalAnimalsInLevel}
          failedReason={levelResult.failedReason}
          hasNextLevel={
            GAME_LEVELS.findIndex((l) => l.id === selectedLevel.id) + 1 < GAME_LEVELS.length
          }
          onNextLevel={handleNextLevel}
          onRetry={handleRetryLevel}
          onOpenEncyclopedia={() => setShowEncyclopedia(true)}
          onGoToQuiz={() => setView('quiz')}
          onExit={() => setView('menu')}
        />
      )}

      {/* 7. Education Materials View */}
      {view === 'education' && (
        <EducationView
          onBack={() => setView('menu')}
          onGoToQuiz={() => setView('quiz')}
        />
      )}

      {/* 8. Interactive Quiz View */}
      {view === 'quiz' && (
        <QuizView
          onBack={() => setView('menu')}
          onAddScore={handleAddQuizScore}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {/* 9. Badges / Achievements View */}
      {view === 'badges' && (
        <BadgesView
          badges={badges}
          onBack={() => setView('menu')}
        />
      )}

      {/* 10. How to Play View */}
      {view === 'how-to-play' && (
        <HowToPlayModal
          onBack={() => setView('menu')}
        />
      )}
    </main>
  );
}
