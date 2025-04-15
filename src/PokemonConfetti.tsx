import { useEffect, useState } from 'react';
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
}

interface PokemonConfettiProps {
  spriteUrl: string;
  inputPosition: { x: number; y: number };
}

export default function PokemonConfetti({ spriteUrl, inputPosition }: PokemonConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles: Particle[] = [];
    
    // Get scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Adjust position for scroll
    const startX = inputPosition.x - scrollX;
    const startY = inputPosition.y - scrollY;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: startX - 48, // offset by half the sprite width
        y: startY - 48, // offset by half the sprite height
        rotation: Math.random() * 360,
        xVelocity: (Math.random() - 0.5) * 8,
        yVelocity: -Math.random() * 6 - 3,
        rotationVelocity: (Math.random() - 0.5) * 6,
      });
    }

    setParticles(newParticles);

    const animationInterval = setInterval(() => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.xVelocity,
          y: particle.y + particle.yVelocity,
          yVelocity: particle.yVelocity + 0.3,
          rotation: particle.rotation + particle.rotationVelocity,
        }));
        return updatedParticles;
      });
    }, 1000 / 60);

    const cleanup = setTimeout(() => {
      setParticles([]);
      clearInterval(animationInterval);
    }, UI_CONSTANTS.CONFETTI_ANIMATION_DURATION);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(cleanup);
    };
  }, [spriteUrl, inputPosition]);

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <img
          key={particle.id}
          src={spriteUrl}
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