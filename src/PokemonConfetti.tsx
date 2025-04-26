import { useEffect, useState, useCallback } from 'react';
import { UI_CONSTANTS } from './constants';
import './PokemonConfetti.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  xVelocity: number;
  yVelocity: number;
  rotationVelocity: number;
  sprite: string;
}

interface PokemonConfettiProps {
  spriteUrl?: string;
  inputPosition?: { x: number; y: number };
  caughtSprites?: string[];
  isContinuous?: boolean;
}

export default function PokemonConfetti({ spriteUrl, inputPosition, caughtSprites, isContinuous }: PokemonConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Create a burst of particles from a point
  const createBurst = (x: number, y: number, sprite: string) => {
    const particleCount = 20;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x - 48, // offset by half the sprite width
        y: y - 48, // offset by half the sprite height
        rotation: Math.random() * 360,
        xVelocity: (Math.random() - 0.5) * 12, // Increased horizontal spread
        yVelocity: -Math.random() * 8 - 4, // Increased upward velocity
        rotationVelocity: (Math.random() - 0.5) * 12, // Increased rotation speed
        sprite
      });
    }
    return newParticles;
  };

  // Create particles from the sides of the screen
  const createSideParticles = useCallback(() => {
    if (!caughtSprites || caughtSprites.length === 0) return [];
    
    const particleCount = 2;
    const newParticles: Particle[] = [];
    const viewportHeight = window.innerHeight;
    
    for (let i = 0; i < particleCount; i++) {
      const fromRight = Math.random() > 0.5;
      const sprite = caughtSprites[Math.floor(Math.random() * caughtSprites.length)];
      const y = Math.random() * viewportHeight;
      
      newParticles.push({
        id: Date.now() + i,
        x: fromRight ? window.innerWidth + 48 : -48,
        y,
        rotation: Math.random() * 360,
        xVelocity: fromRight ? -Math.random() * 4 - 2 : Math.random() * 4 + 2,
        yVelocity: (Math.random() - 0.5) * 2,
        rotationVelocity: (Math.random() - 0.5) * 4,
        sprite
      });
    }
    return newParticles;
  }, [caughtSprites]);

  useEffect(() => {
    let spawnInterval: number;
    const animationInterval = window.setInterval(() => {
      setParticles(prevParticles => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        return prevParticles
          .filter(particle => {
            // Remove particles that are off screen
            return !(particle.x < -100 || particle.x > viewportWidth + 100 ||
                    particle.y < -100 || particle.y > viewportHeight + 100);
          })
          .map(particle => ({
            ...particle,
            x: particle.x + particle.xVelocity,
            y: particle.y + particle.yVelocity,
            yVelocity: particle.yVelocity + 0.1,
            rotation: particle.rotation + particle.rotationVelocity,
          }));
      });
    }, 1000 / 60) as unknown as number;

    if (isContinuous && caughtSprites && caughtSprites.length > 0) {
      // Continuous mode - spawn particles from sides
      spawnInterval = window.setInterval(() => {
        setParticles(prev => [...prev, ...createSideParticles()]);
      }, 1000) as unknown as number;
    } else if (spriteUrl && inputPosition) {
      // Burst mode - create single burst
      setParticles(createBurst(inputPosition.x - window.scrollX, inputPosition.y - window.scrollY, spriteUrl));
    }

    if (!isContinuous) {
      const cleanup = setTimeout(() => {
        setParticles([]);
        clearInterval(animationInterval);
      }, UI_CONSTANTS.CONFETTI_ANIMATION_DURATION);

      return () => {
        clearInterval(animationInterval);
        clearTimeout(cleanup);
      };
    }

    return () => {
      clearInterval(animationInterval);
      if (spawnInterval) clearInterval(spawnInterval);
    };
  }, [spriteUrl, inputPosition, isContinuous, caughtSprites, createSideParticles]);

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <img
          key={particle.id}
          src={particle.sprite}
          className="confetti-sprite"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
          alt=""
        />
      ))}
    </div>
  );
}