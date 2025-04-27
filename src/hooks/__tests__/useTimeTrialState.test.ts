import { renderHook } from '@testing-library/react';
import { useTimeTrialState } from '../useTimeTrialState';

describe('useTimeTrialState', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTimeTrialState());
    
    expect(result.current.isActive).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.difficulty).toBe('medium');
    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.pokemonCountCategory).toBe('6-20');
    expect(result.current.caughtPokemon).toEqual([]);
    expect(result.current.inputValue).toBe('');
    expect(result.current.isEasyMode).toBe(false);
  });
});