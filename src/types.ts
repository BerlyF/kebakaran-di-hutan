export type GameView = 
  | 'menu' 
  | 'level-select' 
  | 'briefing' 
  | 'playing' 
  | 'animal-encyclopedia'
  | 'level-complete' 
  | 'level-failed' 
  | 'education' 
  | 'quiz' 
  | 'how-to-play' 
  | 'badges';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type ToolType = 'water_hose' | 'fire_beater' | 'fire_break' | 'first_aid';

export interface RescueTool {
  type: ToolType;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  speed: number;
  selectedTool: ToolType;
  waterLevel: number;
  maxWaterLevel: number;
  isSprayingWater: boolean;
  frame: number;
  carryingAnimal: Animal | null;
}

export type AnimalType = 'deer' | 'bird' | 'rabbit' | 'monkey' | 'bear' | 'pangolin';
export type DangerType = 'burning_bush' | 'smoke_trap' | 'fallen_fire_log';

export interface AnimalInfo {
  scientificName: string;
  habitat: string;
  conservationStatus: string;
  ecologicalRole: string;
  threats: string;
  diet: string;
  funFact: string;
}

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  x: number;
  y: number;
  dangerType: DangerType;
  trapHp: number;
  maxTrapHp: number;
  isRescued: boolean;
  followingPlayer: boolean;
  isInSanctuary: boolean;
  info: AnimalInfo;
  frameTimer?: number;
}

export interface FireSpot {
  id: string;
  x: number;
  y: number;
  intensity: number; // 0 - 100
  maxIntensity: number;
  isExtinguished: boolean;
  spreadTimer: number;
  name: string;
}

export interface WaterStation {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'river' | 'water_pump' | 'hydrant';
  name: string;
}

export interface SettlementZone {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  housesCount: number;
}

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rock' | 'dense_bush' | 'river' | 'tree' | 'house';
  passable: boolean;
}

export interface SafeZone {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'sparkle' | 'heart' | 'leaf' | 'water' | 'smoke' | 'fire' | 'steam';
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  environment: 'forest' | 'peatland' | 'settlement_border';
  timeLimit: number; // in seconds
  briefing: {
    story: string;
    mission: string;
    tips: string;
    targetFireCount: number;
    targetAnimalCount: number;
    causeAndPrevention: string;
  };
  gridCols: number;
  gridRows: number;
  cellSize: number;
  playerStart: { x: number; y: number };
  safeZone: SafeZone;
  settlement: SettlementZone;
  waterStations: WaterStation[];
  fireSpots: FireSpot[];
  animals: Animal[];
  obstacles: Obstacle[];
  maxAllowedFireSpread: number; // percentage threshold (e.g. 70)
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  category: 'rescue' | 'fire' | 'quiz' | 'master';
}

export interface EducationTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  points: string[];
  scientificFact: string;
  actionGuide: string;
}

export interface UserProgress {
  score: number;
  highScore: number;
  completedLevels: number[];
  unlockedBadges: string[];
  rescuedAnimalIds: string[];
  quizScores: { [questionId: number]: boolean };
  totalAnimalsSaved: number;
  totalFiresExtinguished: number;
  soundEnabled: boolean;
}
