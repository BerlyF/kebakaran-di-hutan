import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LevelConfig, Animal, FireSpot, WaterStation, ToolType } from '../types';
import { sounds } from '../services/sound';
import {
  Flame,
  Droplets,
  Heart,
  Clock,
  Award,
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Home,
  ShieldAlert
} from 'lucide-react';

interface Props {
  level: LevelConfig;
  onLevelComplete: (earnedScore: number, animalsSaved: number) => void;
  onLevelFailed: (reason: string) => void;
  onExit: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type: 'water' | 'smoke' | 'steam' | 'spark' | 'heart' | 'sparkle';
}

export const PixelGameCanvas: React.FC<Props> = ({
  level,
  onLevelComplete,
  onLevelFailed,
  onExit,
  soundEnabled,
  onToggleSound
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HUD State synced from loop
  const [timeLeft, setTimeLeft] = useState<number>(level.timeLimit);
  const [score, setScore] = useState<number>(0);
  const [waterLevel, setWaterLevel] = useState<number>(100);
  const [activeFiresCount, setActiveFiresCount] = useState<number>(level.fireSpots.length);
  const [rescuedCount, setRescuedCount] = useState<number>(0);
  const [fireDangerPercent, setFireDangerPercent] = useState<number>(30);
  const [nearbyActionText, setNearbyActionText] = useState<string | null>(null);
  const [equippedTool, setEquippedTool] = useState<ToolType>('water_hose');

  // Mutable Game Loop State Ref for 60FPS performance
  const stateRef = useRef({
    gridWidth: level.gridCols * level.cellSize,
    gridHeight: level.gridRows * level.cellSize,
    player: {
      x: level.playerStart.x * level.cellSize,
      y: level.playerStart.y * level.cellSize,
      width: 28,
      height: 32,
      speed: 3.2,
      direction: 'down' as 'up' | 'down' | 'left' | 'right',
      frame: 0,
      frameTimer: 0,
      isSpraying: false,
      waterLevel: 100,
      maxWaterLevel: 100,
      equippedTool: 'water_hose' as ToolType
    },
    fireSpots: JSON.parse(JSON.stringify(level.fireSpots)) as FireSpot[],
    animals: JSON.parse(JSON.stringify(level.animals)) as Animal[],
    waterStations: level.waterStations || [],
    particles: [] as Particle[],
    keys: {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false,
      interact: false
    },
    score: 0,
    timeLeft: level.timeLimit,
    timeTimer: 0,
    waterTime: 0,
    fireDanger: 30,
    isGameOver: false,
    soundSprayThrottle: 0
  });

  // Set Equipped Tool
  const setTool = (tool: ToolType) => {
    sounds.playClick();
    setEquippedTool(tool);
    stateRef.current.player.equippedTool = tool;
  };

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const keys = stateRef.current.keys;

      if (k === 'w' || e.key === 'ArrowUp') keys.up = true;
      if (k === 's' || e.key === 'ArrowDown') keys.down = true;
      if (k === 'a' || e.key === 'ArrowLeft') keys.left = true;
      if (k === 'd' || e.key === 'ArrowRight') keys.right = true;
      if (k === ' ' || e.code === 'Space') {
        e.preventDefault();
        keys.action = true;
      }
      if (k === 'e' || e.key === 'Enter') {
        keys.interact = true;
      }

      // Quick Tool Switching (1: Selang Air, 2: Sekat Pemadam, 3: Medis P3K)
      if (k === '1') setTool('water_hose');
      if (k === '2') setTool('fire_break');
      if (k === '3') setTool('first_aid');
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const keys = stateRef.current.keys;

      if (k === 'w' || e.key === 'ArrowUp') keys.up = false;
      if (k === 's' || e.key === 'ArrowDown') keys.down = false;
      if (k === 'a' || e.key === 'ArrowLeft') keys.left = false;
      if (k === 'd' || e.key === 'ArrowRight') keys.right = false;
      if (k === ' ' || e.code === 'Space') keys.action = false;
      if (k === 'e' || e.key === 'Enter') keys.interact = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const s = stateRef.current;
      if (s.isGameOver) return;

      // 1. UPDATE TIMER & FIRE SPREAD DANGER
      s.timeTimer += 1 / 60;
      s.waterTime += 0.04;
      if (s.soundSprayThrottle > 0) s.soundSprayThrottle -= 1;

      if (s.timeTimer >= 1) {
        s.timeTimer = 0;
        s.timeLeft -= 1;
        setTimeLeft(s.timeLeft);

        // Check active fires
        const activeFires = s.fireSpots.filter((f) => !f.isExtinguished);
        setActiveFiresCount(activeFires.length);

        // Dynamic fire spread calculation
        if (activeFires.length > 0) {
          // Increase danger meter slowly if fires are neglected
          s.fireDanger = Math.min(100, s.fireDanger + activeFires.length * 0.45);
        } else {
          s.fireDanger = Math.max(0, s.fireDanger - 3);
        }
        setFireDangerPercent(Math.round(s.fireDanger));

        // Fail condition 1: Fire spread out of control!
        if (s.fireDanger >= level.maxAllowedFireSpread) {
          s.isGameOver = true;
          sounds.playDefeat();
          onLevelFailed(
            `Api menyebar terlalu jauh (${Math.round(s.fireDanger)}%) dan membahayakan lingkungan serta pemukiman warga! Kamu harus mengulang misi.`
          );
          return;
        }

        // Fail condition 2: Time ran out!
        if (s.timeLeft <= 0) {
          s.isGameOver = true;
          sounds.playDefeat();
          onLevelFailed(
            'Waktu misi habis! Api membakar vegetasi terlalu luas sebelum sempat dipadamkan. Kamu harus mengulang misi.'
          );
          return;
        }
      }

      // 2. PLAYER MOVEMENT & COLLISION
      let dx = 0;
      let dy = 0;
      if (s.keys.up) {
        dy -= s.player.speed;
        s.player.direction = 'up';
      }
      if (s.keys.down) {
        dy += s.player.speed;
        s.player.direction = 'down';
      }
      if (s.keys.left) {
        dx -= s.player.speed;
        s.player.direction = 'left';
      }
      if (s.keys.right) {
        dx += s.player.speed;
        s.player.direction = 'right';
      }

      // Diagonal speed normalization
      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      if (dx !== 0 || dy !== 0) {
        s.player.frameTimer += 1;
        if (s.player.frameTimer > 8) {
          s.player.frame = (s.player.frame + 1) % 4;
          s.player.frameTimer = 0;
        }
      }

      const nextX = s.player.x + dx;
      const nextY = s.player.y + dy;

      // Obstacle Collision Check
      let canMoveX = true;
      let canMoveY = true;
      const cs = level.cellSize;

      level.obstacles.forEach((ob) => {
        if (ob.passable) return; // bridges or paths are passable
        const ox = ob.x * cs;
        const oy = ob.y * cs;
        const ow = ob.width * cs;
        const oh = ob.height * cs;

        // Check horizontal movement collision
        if (
          nextX < ox + ow &&
          nextX + s.player.width > ox &&
          s.player.y < oy + oh &&
          s.player.y + s.player.height > oy
        ) {
          canMoveX = false;
        }

        // Check vertical movement collision
        if (
          s.player.x < ox + ow &&
          s.player.x + s.player.width > ox &&
          nextY < oy + oh &&
          nextY + s.player.height > oy
        ) {
          canMoveY = false;
        }
      });

      // Boundary Clamping
      if (canMoveX) {
        s.player.x = Math.max(0, Math.min(s.gridWidth - s.player.width, nextX));
      }
      if (canMoveY) {
        s.player.y = Math.max(0, Math.min(s.gridHeight - s.player.height, nextY));
      }

      // 3. WATER REFILL LOGIC (Near river or water pumps/hydrants)
      let isNearWater = false;
      let waterStationName = '';

      s.waterStations.forEach((ws) => {
        const wx = ws.x * cs;
        const wy = ws.y * cs;
        const ww = ws.width * cs;
        const wh = ws.height * cs;

        const playerCenterX = s.player.x + s.player.width / 2;
        const playerCenterY = s.player.y + s.player.height / 2;

        // Distance to water station box
        const closestX = Math.max(wx, Math.min(playerCenterX, wx + ww));
        const closestY = Math.max(wy, Math.min(playerCenterY, wy + wh));
        const dist = Math.hypot(playerCenterX - closestX, playerCenterY - closestY);

        if (dist < 55) {
          isNearWater = true;
          waterStationName = ws.name;
        }
      });

      // Refill action
      if (isNearWater && s.keys.interact) {
        if (s.player.waterLevel < s.player.maxWaterLevel) {
          s.player.waterLevel = s.player.maxWaterLevel;
          setWaterLevel(100);
          sounds.playWaterRefill();

          // Spawn splash particles
          for (let i = 0; i < 14; i++) {
            s.particles.push({
              x: s.player.x + s.player.width / 2,
              y: s.player.y + s.player.height / 2,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: Math.random() * 4 + 2,
              color: '#38bdf8',
              alpha: 1,
              life: 0,
              maxLife: 25,
              type: 'water'
            });
          }
        }
      }

      // 4. WATER SPRAY & FIRE FIGHTING LOGIC
      s.player.isSpraying = false;
      const playerCenterX = s.player.x + s.player.width / 2;
      const playerCenterY = s.player.y + s.player.height / 2;

      // Determine nozzle spray direction vector
      let sprayDx = 0;
      let sprayDy = 0;
      if (s.player.direction === 'up') sprayDy = -1;
      else if (s.player.direction === 'down') sprayDy = 1;
      else if (s.player.direction === 'left') sprayDx = -1;
      else if (s.player.direction === 'right') sprayDx = 1;

      // If action button pressed
      if (s.keys.action) {
        if (s.player.waterLevel > 0) {
          s.player.isSpraying = true;
          // Consume water
          s.player.waterLevel = Math.max(0, s.player.waterLevel - 0.45);
          setWaterLevel(Math.round(s.player.waterLevel));

          if (s.soundSprayThrottle <= 0) {
            sounds.playWaterSpray();
            s.soundSprayThrottle = 14;
          }

          // Spawn water stream droplets
          for (let i = 0; i < 4; i++) {
            const spread = (Math.random() - 0.5) * 0.4;
            s.particles.push({
              x: playerCenterX + sprayDx * 12,
              y: playerCenterY + sprayDy * 12,
              vx: (sprayDx + spread) * (Math.random() * 4 + 5),
              vy: (sprayDy + spread) * (Math.random() * 4 + 5),
              size: Math.random() * 3.5 + 2,
              color: Math.random() > 0.5 ? '#38bdf8' : '#0284c7',
              alpha: 0.9,
              life: 0,
              maxLife: 22,
              type: 'water'
            });
          }

          // Check hit against active fires
          s.fireSpots.forEach((fire) => {
            if (fire.isExtinguished) return;

            const fireX = fire.x * cs + cs / 2;
            const fireY = fire.y * cs + cs / 2;
            const dist = Math.hypot(fireX - playerCenterX, fireY - playerCenterY);

            // In range and player facing roughly towards fire
            const toFireX = (fireX - playerCenterX) / (dist || 1);
            const toFireY = (fireY - playerCenterY) / (dist || 1);
            const dot = toFireX * sprayDx + toFireY * sprayDy;

            if (dist < 72 && dot > 0.35) {
              // Extinguish intensity
              fire.intensity = Math.max(0, fire.intensity - 1.8);

              // Spawn sizzling steam
              if (Math.random() < 0.4) {
                sounds.playFireExtinguish();
                s.particles.push({
                  x: fireX + (Math.random() - 0.5) * 20,
                  y: fireY + (Math.random() - 0.5) * 20,
                  vx: (Math.random() - 0.5) * 1.5,
                  vy: -Math.random() * 2 - 1,
                  size: Math.random() * 6 + 4,
                  color: '#e2e8f0',
                  alpha: 0.8,
                  life: 0,
                  maxLife: 30,
                  type: 'steam'
                });
              }

              // Fully extinguished!
              if (fire.intensity <= 0) {
                fire.isExtinguished = true;
                s.score += 150;
                setScore(s.score);
                sounds.playSanctuaryArrive();

                // Sparkle burst
                for (let i = 0; i < 16; i++) {
                  s.particles.push({
                    x: fireX,
                    y: fireY,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    size: Math.random() * 4 + 2,
                    color: '#34d399',
                    alpha: 1,
                    life: 0,
                    maxLife: 35,
                    type: 'sparkle'
                  });
                }
              }
            }
          });
        }
      }

      // 5. ANIMAL RESCUE & SMOKE ESCAPE LOGIC
      let nearbyAnimal: Animal | null = null;

      s.animals.forEach((animal) => {
        const ax = animal.x * cs + cs / 2;
        const ay = animal.y * cs + cs / 2;
        const distToPlayer = Math.hypot(ax - playerCenterX, ay - playerCenterY);

        if (!animal.isRescued) {
          if (distToPlayer < 55) {
            nearbyAnimal = animal;

            // Player holding action near trapped animal -> rescues animal from smoke / debris
            if (s.keys.action || s.keys.interact) {
              animal.trapHp = Math.max(0, animal.trapHp - 1.6);
              sounds.playWaterSpray();

              // Steam / soothing droplets around animal
              s.particles.push({
                x: ax + (Math.random() - 0.5) * 20,
                y: ay + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 2,
                size: 3,
                color: '#6ee7b7',
                alpha: 0.9,
                life: 0,
                maxLife: 20,
                type: 'sparkle'
              });

              if (animal.trapHp <= 0) {
                animal.isRescued = true;
                animal.followingPlayer = true;
                sounds.playSanctuaryArrive();

                // Heart particles
                for (let i = 0; i < 12; i++) {
                  s.particles.push({
                    x: ax,
                    y: ay - 10,
                    vx: (Math.random() - 0.5) * 2.5,
                    vy: -Math.random() * 2.5 - 1,
                    size: 5,
                    color: '#f43f5e',
                    alpha: 1,
                    life: 0,
                    maxLife: 40,
                    type: 'heart'
                  });
                }
              }
            }
          }
        } else if (animal.followingPlayer && !animal.isInSanctuary) {
          // Smooth following AI
          const targetDist = 38;
          if (distToPlayer > targetDist) {
            const angle = Math.atan2(playerCenterY - ay, playerCenterX - ax);
            animal.x += (Math.cos(angle) * (s.player.speed * 0.85)) / cs;
            animal.y += (Math.sin(angle) * (s.player.speed * 0.85)) / cs;
          }

          // Check if entered Safe Settlement Zone
          const sz = level.safeZone;
          const inSafeZone =
            animal.x >= sz.x &&
            animal.x <= sz.x + sz.width &&
            animal.y >= sz.y &&
            animal.y <= sz.y + sz.height;

          if (inSafeZone) {
            animal.followingPlayer = false;
            animal.isInSanctuary = true;
            s.score += 400;
            setScore(s.score);
            sounds.playSanctuaryArrive();

            const currentRescued = s.animals.filter((a) => a.isInSanctuary).length;
            setRescuedCount(currentRescued);

            // Celebration sparks
            for (let i = 0; i < 20; i++) {
              s.particles.push({
                x: ax,
                y: ay,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 5 + 2,
                color: '#facc15',
                alpha: 1,
                life: 0,
                maxLife: 45,
                type: 'sparkle'
              });
            }
          }
        }
      });

      // 6. CHECK VICTORY CONDITION
      const allFiresExtinguished = s.fireSpots.every((f) => f.isExtinguished);
      const allAnimalsInSafeZone = s.animals.every((a) => a.isInSanctuary);

      if (allFiresExtinguished && allAnimalsInSafeZone) {
        s.isGameOver = true;
        sounds.playVictory();
        const timeBonus = Math.max(0, s.timeLeft * 10);
        const finalScore = s.score + timeBonus;
        onLevelComplete(finalScore, s.animals.length);
        return;
      }

      // 7. TOAST / HINT PROMPTS
      if (isNearWater && s.player.waterLevel < s.player.maxWaterLevel) {
        setNearbyActionText(`[E] Isi Ulang Air (${waterStationName})`);
      } else if (nearbyAnimal && !nearbyAnimal.isRescued) {
        setNearbyActionText(`Tahan [SPASI] untuk Evakuasi ${nearbyAnimal.name}`);
      } else if (s.player.waterLevel <= 0) {
        setNearbyActionText('⚠️ Air Habis! Dekati sungai/hidran lalu tekan [E]');
      } else {
        setNearbyActionText(null);
      }

      // 8. UPDATE PARTICLES & SMOKE/EMBER EMISSION FROM ACTIVE FIRES
      s.fireSpots.forEach((fire) => {
        if (fire.isExtinguished) return;

        const fx = fire.x * cs + cs / 2;
        const fy = fire.y * cs + cs / 2;

        // Rising smoke particles
        if (Math.random() < 0.25) {
          s.particles.push({
            x: fx + (Math.random() - 0.5) * 16,
            y: fy - 6,
            vx: (Math.random() - 0.5) * 0.8 + 0.5, // slight wind drift
            vy: -Math.random() * 1.5 - 1,
            size: Math.random() * 8 + 4,
            color: '#475569',
            alpha: 0.6,
            life: 0,
            maxLife: 45,
            type: 'smoke'
          });
        }

        // Rising sparks & embers
        if (Math.random() < 0.35) {
          s.particles.push({
            x: fx + (Math.random() - 0.5) * 14,
            y: fy,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2.5 - 1.2,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? '#f97316' : '#fbbf24',
            alpha: 1,
            life: 0,
            maxLife: 28,
            type: 'spark'
          });
        }
      });

      // Update particle physics
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.type === 'smoke') {
          p.size += 0.15; // smoke expands as it rises
        }

        if (p.life >= p.maxLife) {
          s.particles.splice(i, 1);
        }
      }

      // 9. RENDER COMPLETE 2D PIXEL ART SCENE
      renderScene(ctx);

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [level, onLevelComplete, onLevelFailed]);

  // RENDER CANVAS SCENE
  const renderScene = (ctx: CanvasRenderingContext2D) => {
    const s = stateRef.current;
    const w = s.gridWidth;
    const h = s.gridHeight;
    const cs = level.cellSize;

    // A. Base Ground Background (Forest / Peatland / Settlement Border)
    if (level.environment === 'peatland') {
      ctx.fillStyle = '#3f2b1d'; // dark peat soil
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#2c1e15';
      for (let c = 0; c < level.gridCols; c++) {
        for (let r = 0; r < level.gridRows; r++) {
          if ((c + r) % 2 === 0) {
            ctx.fillRect(c * cs + 2, r * cs + 2, cs - 4, cs - 4);
          }
        }
      }
    } else if (level.environment === 'settlement_border') {
      ctx.fillStyle = '#365314'; // border grassland
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#3f6212';
      for (let c = 0; c < level.gridCols; c++) {
        for (let r = 0; r < level.gridRows; r++) {
          if ((c + r) % 2 === 0) {
            ctx.fillRect(c * cs + 2, r * cs + 2, cs - 4, cs - 4);
          }
        }
      }
    } else {
      // Lush tropical forest
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#16a34a';
      for (let c = 0; c < level.gridCols; c++) {
        for (let r = 0; r < level.gridRows; r++) {
          if ((c + r) % 2 === 0) {
            ctx.fillRect(c * cs + 2, r * cs + 2, cs - 4, cs - 4);
          }
        }
      }
    }

    // B. Obstacles (Rivers, Rocks, Bridges, Trees, Dense Bushes)
    level.obstacles.forEach((ob) => {
      const ox = ob.x * cs;
      const oy = ob.y * cs;
      const ow = ob.width * cs;
      const oh = ob.height * cs;

      if (ob.type === 'river') {
        // Flowing River
        ctx.fillStyle = level.environment === 'peatland' ? '#78350f' : '#0284c7';
        ctx.fillRect(ox, oy, ow, oh);

        // Water waves
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let y = oy + 6; y < oy + oh; y += 14) {
          const waveOffset = Math.sin(s.waterTime * 3 + y) * 6;
          ctx.fillRect(ox + 4 + waveOffset, y, ow - 8, 2.5);
        }
      } else if (ob.type === 'rock') {
        // Wooden Bridge / Rock Path across river
        ctx.fillStyle = '#92400e';
        ctx.fillRect(ox, oy, ow, oh);
        // Wood planks
        ctx.fillStyle = '#78350f';
        for (let p = oy + 4; p < oy + oh; p += 8) {
          ctx.fillRect(ox + 2, p, ow - 4, 2);
        }
      } else if (ob.type === 'tree') {
        // Lush Forest Tree
        ctx.fillStyle = '#451a03';
        ctx.fillRect(ox + ow / 2 - 5, oy + oh - 16, 10, 16); // trunk
        ctx.fillStyle = '#14532d';
        ctx.beginPath();
        ctx.arc(ox + ow / 2, oy + oh / 2 - 6, ow / 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(ox + ow / 2 - 3, oy + oh / 2 - 8, ow / 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (ob.type === 'dense_bush') {
        // Dense shrub
        ctx.fillStyle = '#1b4332';
        ctx.beginPath();
        ctx.roundRect(ox, oy, ow, oh, 6);
        ctx.fill();
      } else if (ob.type === 'house') {
        // Village house
        drawPixelHouse(ctx, ox, oy, ow, oh);
      }
    });

    // C. Settlement & Safe Evacuation Zone (Pemukiman Warga)
    const sz = level.safeZone;
    const szX = sz.x * cs;
    const szY = sz.y * cs;
    const szW = sz.width * cs;
    const szH = sz.height * cs;

    // Fenced border for settlement
    ctx.fillStyle = 'rgba(22, 101, 52, 0.25)';
    ctx.fillRect(szX, szY, szW, szH);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.strokeRect(szX, szY, szW, szH);
    ctx.setLineDash([]);

    // Draw Settlement Houses & Evacuation Tents inside safe zone
    drawPixelHouse(ctx, szX + 12, szY + 12, cs * 1.5, cs * 1.3);
    drawPixelTent(ctx, szX + cs * 2.2, szY + 14, cs * 1.4, cs * 1.2);

    // Settlement Banner Label
    ctx.fillStyle = '#065f46';
    ctx.fillRect(szX + 6, szY + szH - 22, szW - 12, 18);
    ctx.fillStyle = '#86efac';
    ctx.font = 'bold 9px "Press Start 2P", sans-serif';
    ctx.fillText(`🏠 ${level.settlement.name}`, szX + 12, szY + szH - 9);

    // D. Water Stations (Pump / Hydrant)
    s.waterStations.forEach((ws) => {
      if (ws.type === 'river') return; // already drawn in obstacles
      const wx = ws.x * cs;
      const wy = ws.y * cs;

      if (ws.type === 'hydrant') {
        // Red Fire Hydrant
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(wx + 10, wy + 14, 16, 20);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(wx + 18, wy + 14, 9, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(wx + 7, wy + 20, 22, 5); // valves
      } else {
        // Water Pump / Tank
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(wx + 6, wy + 10, cs - 12, cs - 16);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(wx + 10, wy + 14, cs - 20, 10);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.fillText('AIR', wx + 12, wy + 22);
      }

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 8px "Press Start 2P", sans-serif';
      ctx.fillText('[E] ISI', wx + 6, wy + cs + 7);
    });

    // E. Draw Animals
    s.animals.forEach((animal) => {
      const ax = animal.x * cs + cs / 2;
      const ay = animal.y * cs + cs / 2;

      // Distress trap overlay if not rescued
      if (!animal.isRescued) {
        // Trapped in smoke / fire debris
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.beginPath();
        ctx.arc(ax, ay, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Distress SOS exclamation
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(ax, ay - 24, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "Press Start 2P", sans-serif';
        ctx.fillText('!', ax - 3, ay - 18);

        // Progress bar if taking rescue action
        if (animal.trapHp < animal.maxTrapHp) {
          const pbW = 34;
          const pbH = 5;
          ctx.fillStyle = 'rgba(0,0,0,0.8)';
          ctx.fillRect(ax - pbW / 2, ay - 36, pbW, pbH);
          const pct = 1 - animal.trapHp / animal.maxTrapHp;
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(ax - pbW / 2, ay - 36, pbW * pct, pbH);
        }
      } else if (animal.followingPlayer && !animal.isInSanctuary) {
        // Following heart
        ctx.fillStyle = '#f43f5e';
        ctx.font = '10px sans-serif';
        ctx.fillText('❤️', ax - 6, ay - 20);
      } else if (animal.isInSanctuary) {
        // Safe checkmark
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('✨ Aman', ax - 16, ay - 20);
      }

      // Draw Pixel Animal Avatar
      drawPixelAnimal(ctx, animal, ax, ay);
    });

    // F. Draw Active Fire Spots (Wildfire Flames)
    s.fireSpots.forEach((fire) => {
      const fx = fire.x * cs + cs / 2;
      const fy = fire.y * cs + cs / 2;

      if (!fire.isExtinguished) {
        drawPixelFire(ctx, fx, fy, fire.intensity);
      } else {
        // Extinguished charred ashes
        ctx.fillStyle = '#292524';
        ctx.beginPath();
        ctx.ellipse(fx, fy + 4, 16, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#78716c';
        ctx.font = 'bold 8px sans-serif';
        ctx.fillText('PADAM', fx - 16, fy + 6);
      }
    });

    // G. Draw Player Firefighter
    drawPixelPlayer(ctx, s.player);

    // H. Draw Active Particles (Water, Steam, Smoke, Embers, Confetti)
    s.particles.forEach((pt) => {
      ctx.save();
      ctx.globalAlpha = pt.alpha;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  // HELPER: DRAW PIXEL HOUSE
  const drawPixelHouse = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    // Wooden Cabin Walls
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, y + h * 0.35, w, h * 0.65);
    // Red Tile Roof
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x - 4, y + h * 0.38);
    ctx.lineTo(x + w + 4, y + h * 0.38);
    ctx.fill();
    // Door & Window
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x + w * 0.4, y + h * 0.6, w * 0.25, h * 0.4);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + w * 0.15, y + h * 0.48, w * 0.18, h * 0.2);
  };

  // HELPER: DRAW PIXEL TENT
  const drawPixelTent = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.fill();
    ctx.fillStyle = '#0369a1';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w * 0.35, y + h);
    ctx.lineTo(x + w * 0.65, y + h);
    ctx.fill();
  };

  // HELPER: DRAW PIXEL FIRE
  const drawPixelFire = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    intensity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    const flicker = Math.sin(Date.now() * 0.02 + x) * 2;
    const scale = (intensity / 100) * 1.2 + 0.5;

    // Charred ground underneath
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(0, 8, 14 * scale, 6 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Outer Red Flame
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, -18 * scale + flicker);
    ctx.lineTo(-12 * scale, 6 * scale);
    ctx.lineTo(12 * scale, 6 * scale);
    ctx.fill();

    // Middle Orange Flame
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(0, -12 * scale - flicker);
    ctx.lineTo(-8 * scale, 6 * scale);
    ctx.lineTo(8 * scale, 6 * scale);
    ctx.fill();

    // Core Bright Yellow Flame
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.moveTo(0, -6 * scale);
    ctx.lineTo(-4 * scale, 6 * scale);
    ctx.lineTo(4 * scale, 6 * scale);
    ctx.fill();

    // Flame Intensity Health Bar
    const barW = 28;
    const barH = 4;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(-barW / 2, -26 * scale, barW, barH);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(-barW / 2, -26 * scale, barW * (intensity / 100), barH);

    ctx.restore();
  };

  // HELPER: DRAW PIXEL ANIMAL
  const drawPixelAnimal = (
    ctx: CanvasRenderingContext2D,
    animal: Animal,
    x: number,
    y: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    if (animal.type === 'rabbit') {
      // White/Grey Fluffy Rabbit
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(-8, -4, 16, 12);
      ctx.fillRect(-6, -12, 12, 10);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(-5, -20, 3, 9);
      ctx.fillRect(2, -20, 3, 9);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-2, -9, 2, 2);
      ctx.fillRect(3, -9, 2, 2);
    } else if (animal.type === 'bird') {
      // Hornbill / Jalak Rimba
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-8, -6, 16, 12);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-6, -14, 12, 10);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(6, -11, 7, 4);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-6, -3, 10, 6);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(2, -12, 2, 2);
    } else if (animal.type === 'deer') {
      // Bawean / Forest Deer
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-12, -6, 24, 16);
      ctx.fillRect(-10, -18, 12, 14);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-12, -26, 3, 9);
      ctx.fillRect(-5, -26, 3, 9);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-4, -14, 2, 2);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(-10, 10, 4, 8);
      ctx.fillRect(6, 10, 4, 8);
    } else if (animal.type === 'monkey') {
      // Bekantan Monkey
      ctx.fillStyle = '#c2410c';
      ctx.fillRect(-10, -6, 20, 14);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(-8, -16, 16, 12);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(4, -13, 6, 8);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-1, -13, 2, 2);
    } else if (animal.type === 'bear') {
      // Sun Bear
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(-14, -8, 28, 20);
      ctx.fillRect(-10, -20, 18, 14);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-4, -2, 8, 8);
      ctx.fillStyle = '#a8a29e';
      ctx.fillRect(2, -15, 6, 6);
    } else if (animal.type === 'pangolin') {
      // Trenggiling
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-12, -6, 24, 12);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(8, -4, 6, 6);
      ctx.fillStyle = '#b45309';
      for (let i = -10; i < 10; i += 4) {
        ctx.fillRect(i, -7, 2, 14);
      }
    }

    ctx.restore();
  };

  // HELPER: DRAW PIXEL FIREFIGHTER PLAYER
  const drawPixelPlayer = (
    ctx: CanvasRenderingContext2D,
    p: typeof stateRef.current.player
  ) => {
    ctx.save();
    ctx.translate(p.x, p.y);

    // Firefighter Pants & Boots
    ctx.fillStyle = '#1e293b'; // Navy fire-resistant pants
    const legOffset = p.frame % 2 === 1 ? 2 : 0;
    ctx.fillRect(4, 20 + legOffset, 6, 10);
    ctx.fillRect(16, 20 - legOffset, 6, 10);

    // Boots
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 27 + legOffset, 8, 4);
    ctx.fillRect(15, 27 - legOffset, 8, 4);

    // Flame-Retardant Yellow/Orange Coat
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(4, 8, 18, 14);

    // High-visibility reflective silver stripe
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(4, 14, 18, 3);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(4, 15, 18, 1);

    // Backpack Water Tank on Back
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 10, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(1, 12, 2, 6);

    // Head / Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(6, 0, 14, 10);

    // Firefighter Helmet with Visor
    ctx.fillStyle = '#dc2626'; // Red Fire Chief / Rescue Helmet
    ctx.fillRect(3, -5, 20, 6);
    ctx.fillRect(6, -9, 14, 5);
    ctx.fillStyle = '#fef08a'; // reflective helmet strip
    ctx.fillRect(5, -4, 16, 2);

    // Eyes based on direction
    ctx.fillStyle = '#0f172a';
    if (p.direction === 'right') {
      ctx.fillRect(16, 3, 2, 3);
    } else if (p.direction === 'left') {
      ctx.fillRect(8, 3, 2, 3);
    } else if (p.direction === 'down') {
      ctx.fillRect(9, 3, 2, 3);
      ctx.fillRect(15, 3, 2, 3);
    }

    // Water Nozzle in Hand
    ctx.fillStyle = '#475569';
    if (p.direction === 'right') {
      ctx.fillRect(20, 14, 8, 4);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(26, 15, 3, 2);
    } else if (p.direction === 'left') {
      ctx.fillRect(-2, 14, 8, 4);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-4, 15, 3, 2);
    } else {
      ctx.fillRect(18, 16, 4, 8);
    }

    ctx.restore();
  };

  // Virtual Key Handlers for Mobile & Tablet
  const handleVirtualKey = (
    key: 'up' | 'down' | 'left' | 'right' | 'action' | 'interact',
    pressed: boolean
  ) => {
    stateRef.current.keys[key] = pressed;
  };

  return (
    <div className="relative w-full min-h-screen bg-stone-950 flex flex-col items-center justify-center p-2 sm:p-4 select-none font-sans">
      {/* Top Game HUD Bar */}
      <div className="w-full max-w-4xl bg-stone-900 border-2 border-stone-700 rounded-xl p-2.5 sm:p-3 mb-2 flex flex-wrap items-center justify-between gap-2.5 shadow-lg">
        {/* Left: Exit & Level Info */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onExit();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 font-pixel text-[11px] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            KELUAR
          </button>
          <div>
            <span className="font-pixel text-[9px] text-amber-400 block uppercase">
              {level.title}
            </span>
            <span className="text-xs font-semibold text-stone-200 truncate block max-w-[200px] sm:max-w-none">
              {level.location}
            </span>
          </div>
        </div>

        {/* Center: Mission Stats (Fire, Water, Animals, Timer) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Water Tank Level */}
          <div className="flex items-center gap-1.5 bg-sky-950/80 border border-sky-700/80 px-2.5 py-1 rounded-lg">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[9px] text-sky-300 font-pixel">AIR:</span>
            <span className="font-pixel text-xs text-sky-200">{waterLevel}L</span>
          </div>

          {/* Active Fire Spots */}
          <div className="flex items-center gap-1.5 bg-orange-950/80 border border-orange-700/80 px-2.5 py-1 rounded-lg">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span className="text-[9px] text-orange-300 font-pixel">API:</span>
            <span className="font-pixel text-xs text-orange-200">
              {activeFiresCount} / {level.fireSpots.length}
            </span>
          </div>

          {/* Animals Rescued */}
          <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-700/80 px-2.5 py-1 rounded-lg">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-[9px] text-emerald-300 font-pixel">SATWA:</span>
            <span className="font-pixel text-xs text-emerald-200">
              {rescuedCount} / {level.animals.length}
            </span>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
              timeLeft <= 20
                ? 'bg-rose-950/80 border-rose-600 text-rose-400 animate-pulse'
                : 'bg-stone-950 border-stone-800 text-stone-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-pixel text-xs">{timeLeft}s</span>
          </div>
        </div>

        {/* Right: Score & Sound */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-lg">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-pixel text-xs text-amber-300">{score}</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 transition"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div className="relative border-4 border-stone-700 rounded-xl overflow-hidden shadow-2xl bg-stone-950">
        <canvas
          ref={canvasRef}
          width={stateRef.current.gridWidth}
          height={stateRef.current.gridHeight}
          className="block image-pixelated cursor-crosshair max-w-full h-auto"
        />

        {/* Action Prompt Toast */}
        {nearbyActionText && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-stone-950/90 border-2 border-amber-400 text-amber-200 px-4 py-2 rounded-lg font-pixel text-[11px] shadow-2xl backdrop-blur-sm pointer-events-none flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{nearbyActionText}</span>
          </div>
        )}

        {/* Danger Warning Meter (When Wildfire spreads too far) */}
        {fireDangerPercent > 50 && (
          <div className="absolute bottom-3 left-3 bg-stone-950/90 border border-rose-600 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
            <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
            <div className="text-left">
              <span className="font-pixel text-[9px] text-rose-400 block">
                BAHAYA PENYEBARAN API: {fireDangerPercent}%
              </span>
              <div className="w-24 h-1.5 bg-stone-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-rose-600 transition-all"
                  style={{ width: `${fireDangerPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls & Quick Tips Footer */}
      <div className="w-full max-w-4xl mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 font-sans">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] text-stone-400 mr-1">PERALATAN:</span>
          <button
            onClick={() => setTool('water_hose')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-pixel text-[10px] transition ${
              equippedTool === 'water_hose'
                ? 'bg-sky-600 border-sky-400 text-white shadow'
                : 'bg-stone-900 border-stone-800 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            [1] Selang Air (100L)
          </button>
          <button
            onClick={() => setTool('fire_break')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-pixel text-[10px] transition ${
              equippedTool === 'fire_break'
                ? 'bg-amber-600 border-amber-400 text-white shadow'
                : 'bg-stone-900 border-stone-800 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            [2] Sekat Bakar
          </button>
          <button
            onClick={() => setTool('first_aid')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-pixel text-[10px] transition ${
              equippedTool === 'first_aid'
                ? 'bg-rose-600 border-rose-400 text-white shadow'
                : 'bg-stone-900 border-stone-800 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            [3] Evakuasi Satwa
          </button>
        </div>

        <div className="text-[11px] text-stone-400 font-sans hidden sm:block">
          Gunakan <b>WASD / Panah</b> untuk bergerak, <b>[SPASI]</b> semprot air/evakuasi, <b>[E]</b> isi air di sungai.
        </div>
      </div>

      {/* Touch Screen On-Screen Gamepad for Mobile & Tablet */}
      <div className="sm:hidden w-full max-w-sm mt-3 flex items-center justify-between px-3 pb-2">
        {/* Virtual D-PAD */}
        <div className="grid grid-cols-3 gap-1 w-32 h-32">
          <div />
          <button
            onTouchStart={() => handleVirtualKey('up', true)}
            onTouchEnd={() => handleVirtualKey('up', false)}
            className="bg-stone-800 active:bg-stone-600 rounded border border-stone-600 font-pixel text-xs text-white flex items-center justify-center shadow"
          >
            ▲
          </button>
          <div />
          <button
            onTouchStart={() => handleVirtualKey('left', true)}
            onTouchEnd={() => handleVirtualKey('left', false)}
            className="bg-stone-800 active:bg-stone-600 rounded border border-stone-600 font-pixel text-xs text-white flex items-center justify-center shadow"
          >
            ◀
          </button>
          <div className="bg-stone-900 rounded flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-stone-600" />
          </div>
          <button
            onTouchStart={() => handleVirtualKey('right', true)}
            onTouchEnd={() => handleVirtualKey('right', false)}
            className="bg-stone-800 active:bg-stone-600 rounded border border-stone-600 font-pixel text-xs text-white flex items-center justify-center shadow"
          >
            ▶
          </button>
          <div />
          <button
            onTouchStart={() => handleVirtualKey('down', true)}
            onTouchEnd={() => handleVirtualKey('down', false)}
            className="bg-stone-800 active:bg-stone-600 rounded border border-stone-600 font-pixel text-xs text-white flex items-center justify-center shadow"
          >
            ▼
          </button>
          <div />
        </div>

        {/* Virtual Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onTouchStart={() => handleVirtualKey('action', true)}
            onTouchEnd={() => handleVirtualKey('action', false)}
            className="w-24 h-14 bg-sky-600 active:bg-sky-500 rounded-xl border-2 border-sky-400 font-pixel text-xs text-white shadow-lg flex flex-col items-center justify-center"
          >
            <Droplets className="w-4 h-4 mb-0.5" />
            SEMPROT
          </button>
          <button
            onTouchStart={() => handleVirtualKey('interact', true)}
            onTouchEnd={() => handleVirtualKey('interact', false)}
            className="w-24 h-12 bg-amber-600 active:bg-amber-500 rounded-xl border-2 border-amber-400 font-pixel text-[11px] text-white shadow-lg flex items-center justify-center gap-1"
          >
            ISI AIR [E]
          </button>
        </div>
      </div>
    </div>
  );
};
