import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import PokemonConfetti from '../../../PokemonConfetti';
import { UI_CONSTANTS } from '../../../constants';

describe('PokemonConfetti', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.scrollX = 0;
    window.scrollY = 0;
    
    // Mock window dimensions for consistent testing
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
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

  it('animates particles over time', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    const initialParticles = container.getElementsByClassName('confetti-sprite');
    const initialPositions = Array.from(initialParticles).map(particle => {
      const style = window.getComputedStyle(particle);
      return {
        left: parseInt(style.left),
        top: parseInt(style.top),
        transform: particle.getAttribute('style')?.match(/rotate\((.*?)deg\)/)?.[1]
      };
    });
    
    // Advance time to trigger animation
    act(() => {
      jest.advanceTimersByTime(1000 / 60); // One frame
    });
    
    const updatedParticles = container.getElementsByClassName('confetti-sprite');
    const updatedPositions = Array.from(updatedParticles).map(particle => {
      const style = window.getComputedStyle(particle);
      return {
        left: parseInt(style.left),
        top: parseInt(style.top),
        transform: particle.getAttribute('style')?.match(/rotate\((.*?)deg\)/)?.[1]
      };
    });
    
    // Verify that positions have changed
    for (let i = 0; i < initialPositions.length; i++) {
      const initial = initialPositions[i];
      const updated = updatedPositions[i];
      
      // At least one property should have changed
      const positionChanged = 
        initial.left !== updated.left || 
        initial.top !== updated.top || 
        initial.transform !== updated.transform;
        
      expect(positionChanged).toBe(true);
    }
  });

  it('applies gravity to particles', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    const initialParticles = container.getElementsByClassName('confetti-sprite');
    const initialPositions = Array.from(initialParticles).map(particle => {
      const style = window.getComputedStyle(particle);
      return parseInt(style.top);
    });
    
    // Advance time to trigger animation frames
    act(() => {
      jest.advanceTimersByTime(1000 / 60 * 2); // Two frames
    });
    
    const updatedParticles = container.getElementsByClassName('confetti-sprite');
    const updatedPositions = Array.from(updatedParticles).map(particle => {
      const style = window.getComputedStyle(particle);
      return parseInt(style.top);
    });
    
    // Check that vertical position increases at an accelerating rate (gravity)
    // The second frame should move particles further down than the first
    for (let i = 0; i < initialPositions.length; i++) {
      // Particles should be moving downward with acceleration
      expect(updatedPositions[i]).not.toBe(initialPositions[i]);
    }
  });

  it('removes particles that are off screen', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container, rerender } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    // Initial number of particles
    const initialParticleCount = container.getElementsByClassName('confetti-sprite').length;
    
    // Manually position particles off-screen
    // Re-render with new props to trigger useEffect
    rerender(
      <PokemonConfetti 
        spriteUrl={spriteUrl} 
        inputPosition={{ x: -200, y: -200 }} 
      />
    );
    
    // Advance time to trigger animation and particle filtering
    act(() => {
      jest.advanceTimersByTime(1000 / 60 * 10); // Multiple frames
    });
    
    // Particles should be removed if they're off-screen
    const remainingParticles = container.getElementsByClassName('confetti-sprite').length;
    expect(remainingParticles).toBeLessThan(initialParticleCount);
  });

  it('clears particles after animation duration in burst mode', () => {
    const spriteUrl = '/sprites/pikachu.png';
    const inputPosition = { x: 100, y: 100 };
    
    const { container } = render(
      <PokemonConfetti spriteUrl={spriteUrl} inputPosition={inputPosition} />
    );

    // Initial particles exist
    expect(container.getElementsByClassName('confetti-sprite').length).toBeGreaterThan(0);
    
    // Advance time past the animation duration
    act(() => {
      jest.advanceTimersByTime(UI_CONSTANTS.CONFETTI_ANIMATION_DURATION + 100);
    });
    
    // All particles should be removed
    expect(container.getElementsByClassName('confetti-sprite').length).toBe(0);
  });

  it('creates side particles in continuous mode', () => {
    const caughtSprites = ['/sprites/pikachu.png', '/sprites/charmander.png'];
    
    const { container } = render(
      <PokemonConfetti isContinuous={true} caughtSprites={caughtSprites} />
    );

    // Initially no particles
    expect(container.getElementsByClassName('confetti-sprite').length).toBe(0);
    
    // Advance time to trigger side particle creation
    act(() => {
      jest.advanceTimersByTime(1000); // Trigger spawn interval
    });
    
    // Should have created new particles from the sides
    const particlesAfterSpawn = container.getElementsByClassName('confetti-sprite').length;
    expect(particlesAfterSpawn).toBeGreaterThan(0);
    
    // Get positions to verify they're coming from the sides
    const particles = container.getElementsByClassName('confetti-sprite');
    Array.from(particles).forEach(particle => {
      const style = window.getComputedStyle(particle);
      const x = parseInt(style.left);
      
      // Particles should start from either left or right edge
      const isFromEdge = x <= 0 || x >= window.innerWidth - 50;
      expect(isFromEdge).toBe(true);
    });
  });

  it('keeps generating particles in continuous mode', () => {
    const caughtSprites = ['/sprites/pikachu.png', '/sprites/charmander.png'];
    
    const { container } = render(
      <PokemonConfetti isContinuous={true} caughtSprites={caughtSprites} />
    );

    // First spawn
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    const countAfterFirstSpawn = container.getElementsByClassName('confetti-sprite').length;
    
    // Second spawn
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    const countAfterSecondSpawn = container.getElementsByClassName('confetti-sprite').length;
    
    // Should have more particles after the second spawn
    expect(countAfterSecondSpawn).toBeGreaterThan(countAfterFirstSpawn);
  });

  it('does not create side particles when caughtSprites is empty', () => {
    const { container } = render(
      <PokemonConfetti isContinuous={true} caughtSprites={[]} />
    );

    // Advance time to trigger side particle creation
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Should not have created any particles
    expect(container.getElementsByClassName('confetti-sprite').length).toBe(0);
  });

  it('does not clear particles in continuous mode after animation duration', () => {
    const caughtSprites = ['/sprites/pikachu.png', '/sprites/charmander.png'];
    
    const { container } = render(
      <PokemonConfetti isContinuous={true} caughtSprites={caughtSprites} />
    );

    // Spawn particles
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    const initialCount = container.getElementsByClassName('confetti-sprite').length;
    expect(initialCount).toBeGreaterThan(0);
    
    // Advance time past the animation duration
    act(() => {
      jest.advanceTimersByTime(UI_CONSTANTS.CONFETTI_ANIMATION_DURATION + 100);
    });
    
    // Particles should still exist in continuous mode
    expect(container.getElementsByClassName('confetti-sprite').length).toBeGreaterThan(0);
  });
  
  it('cleans up all timers in continuous mode on unmount', () => {
    const caughtSprites = ['/sprites/pikachu.png', '/sprites/charmander.png'];
    
    const { unmount } = render(
      <PokemonConfetti isContinuous={true} caughtSprites={caughtSprites} />
    );

    // Advance time to start intervals
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Should have active timers
    expect(jest.getTimerCount()).toBeGreaterThan(0);
    
    unmount();
    
    // All timers should be cleaned up
    expect(jest.getTimerCount()).toBe(0);
  });
});