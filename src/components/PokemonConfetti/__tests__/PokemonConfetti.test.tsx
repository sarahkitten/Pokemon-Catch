import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PokemonConfetti from '../../../PokemonConfetti';

describe('PokemonConfetti', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.scrollX = 0;
    window.scrollY = 0;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders particles at the correct position', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    const particles = container.getElementsByClassName('confetti-sprite');
    expect(particles.length).toBe(20); // Should match particleCount in component

    // Check that all particles start at roughly the same position (with sprite offset)
    Array.from(particles).forEach(particle => {
      const style = window.getComputedStyle(particle);
      expect(parseInt(style.left)).toBe(52); // 100 - 48 (half sprite width)
      expect(parseInt(style.top)).toBe(52); // 100 - 48 (half sprite height)
    });
  });

  it('creates particles with random velocities and rotations', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    const particles = container.getElementsByClassName('confetti-sprite');
    const rotations = new Set();
    
    // Check that particles have different rotation values
    Array.from(particles).forEach(particle => {
      const transform = particle.getAttribute('style')?.match(/rotate\((.*?)deg\)/);
      if (transform) {
        rotations.add(transform[1]);
      }
    });
    
    // Verify that particles have different rotations (randomization worked)
    expect(rotations.size).toBeGreaterThan(1);
  });

  it('cleans up animation timers on unmount', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { unmount } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    unmount();
    
    // Verify all timers were cleaned up
    expect(jest.getTimerCount()).toBe(0);
  });

  it('adjusts particle positions for scroll position', () => {
    window.scrollX = 50;
    window.scrollY = 75;
    
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    const particles = container.getElementsByClassName('confetti-sprite');
    
    // Check that particles are offset by scroll position
    Array.from(particles).forEach(particle => {
      const style = window.getComputedStyle(particle);
      expect(parseInt(style.left)).toBe(2); // (100 - 50) - 48
      expect(parseInt(style.top)).toBe(-23); // (100 - 75) - 48
    });
  });
});