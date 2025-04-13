import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { GENERATIONS, POKEMON_TYPES } from '../../constants';

describe('useGameState', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.caughtPokemon).toEqual([]);
    expect(result.current.selectedGenerationIndex).toBe(0);
    expect(result.current.selectedGeneration).toBe(GENERATIONS[0]);
    expect(result.current.selectedType).toBe(POKEMON_TYPES[0]);
    expect(result.current.selectedLetter).toBe("All");
    expect(result.current.inputValue).toBe("");
    expect(result.current.isGivingUp).toBe(false);
  });

  it('resets progress correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    // Set some initial state
    act(() => {
      result.current.setCaughtPokemon([{ 
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]);
      result.current.setInputValue('test');
      result.current.setError('error message');
      result.current.setRevealedPokemon([{ 
        id: 25,
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]);
    });

    // Verify the state was set
    expect(result.current.caughtPokemon).toHaveLength(1);
    expect(result.current.inputValue).toBe('test');
    expect(result.current.error).toBe('error message');
    expect(result.current.revealedPokemon).toHaveLength(1);

    // Reset progress
    act(() => {
      result.current.resetProgress();
    });

    // Verify the state was reset
    expect(result.current.caughtPokemon).toEqual([]);
    expect(result.current.inputValue).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.revealedPokemon).toEqual([]);
  });

  it('updates total count when changing type', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Initial state should be "All Types"
    expect(result.current.selectedType).toBe(POKEMON_TYPES[0]);
    
    // Change to Electric type
    await act(async () => {
      await result.current.changeType('Electric');
    });

    // Verify type was changed and state was updated
    expect(result.current.selectedType).toBe('Electric');
    expect(result.current.totalPokemon).toBeGreaterThan(0);
    expect(result.current.totalPokemon).toBeLessThan(GENERATIONS[0].total);
    expect(result.current.pokemonData.every(pokemon => 
      pokemon.types.some(type => type.toLowerCase() === 'electric')
    )).toBe(true);
  });

  it('filters pokemon by generation correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Initial state should be "All Generations" (index 0)
    expect(result.current.selectedGenerationIndex).toBe(0);
    
    // Change to Generation 1
    await act(async () => {
      await result.current.changeGeneration(1);
    });

    // Verify generation was changed and state was updated
    expect(result.current.selectedGenerationIndex).toBe(1);
    expect(result.current.selectedGeneration.name).toBe('Gen 1 (Kanto)');
    expect(result.current.pokemonData.every(pokemon => 
      pokemon.id >= GENERATIONS[1].startId && pokemon.id <= GENERATIONS[1].endId
    )).toBe(true);
  });

  it('filters pokemon by starting letter correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Initial state should be "All"
    expect(result.current.selectedLetter).toBe("All");
    
    // Change to letter "P"
    await act(async () => {
      await result.current.changeLetter("P");
    });

    // Verify letter was changed and state was updated
    expect(result.current.selectedLetter).toBe("P");
    expect(result.current.pokemonData.every(pokemon => 
      pokemon.name.toLowerCase().startsWith('p')
    )).toBe(true);
  });

  it('combines generation and letter filters correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Change to Generation 1
    await act(async () => {
      await result.current.changeGeneration(1);
    });

    // Then change to letter "P"
    await act(async () => {
      await result.current.changeLetter("P");
    });

    // Verify both filters were applied correctly
    expect(result.current.selectedGenerationIndex).toBe(1);
    expect(result.current.selectedLetter).toBe("P");
    expect(result.current.pokemonData.every(pokemon => 
      pokemon.name.toLowerCase().startsWith('p') &&
      pokemon.id >= GENERATIONS[1].startId && 
      pokemon.id <= GENERATIONS[1].endId
    )).toBe(true);

    // Should include Pikachu but not Piplup (Gen 4)
    const pokemonNames = result.current.pokemonData.map(p => p.name.toLowerCase());
    expect(pokemonNames).toContain('pikachu');
    expect(pokemonNames).not.toContain('piplup');
  });

  it('resets filters correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Set some filters
    await act(async () => {
      await result.current.changeGeneration(1);
      await result.current.changeLetter("P");
    });

    // Reset all filters
    await act(async () => {
      await result.current.resetAllFilters();
    });

    // Verify everything was reset
    expect(result.current.selectedGenerationIndex).toBe(0);
    expect(result.current.selectedGeneration.name).toBe('All Generations');
    expect(result.current.selectedType).toBe(POKEMON_TYPES[0]);
    expect(result.current.selectedLetter).toBe("All");
  });

  it('handles error states correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially there should be no error
    expect(result.current.error).toBe('');

    // Setting an error message
    act(() => {
      result.current.setError('Test error message');
    });
    expect(result.current.error).toBe('Test error message');

    // Error should persist until explicitly cleared
    act(() => {
      result.current.setInputValue('test');  // Other state changes shouldn't affect error
    });
    expect(result.current.error).toBe('Test error message');

    // Error should be cleared by resetProgress
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.error).toBe('');

    // Can set new error after reset
    act(() => {
      result.current.setError('New error message');
    });
    expect(result.current.error).toBe('New error message');

    // resetAllFilters should also clear errors
    act(() => {
      result.current.resetAllFilters();
    });
    expect(result.current.error).toBe('');

    // Can explicitly clear error by setting empty string
    act(() => {
      result.current.setError('Another error');
      result.current.setError('');
    });
    expect(result.current.error).toBe('');
  });

  it('handles confetti animation state', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially there should be no confetti
    expect(result.current.confettiProps).toBeNull();

    // Set confetti props
    const testConfettiProps = {
      sprite: '/sprites/pikachu.png',
      position: { x: 100, y: 200 }
    };

    act(() => {
      result.current.setConfettiProps(testConfettiProps);
    });

    // Verify confetti props were set correctly
    expect(result.current.confettiProps).toEqual(testConfettiProps);
    expect(result.current.confettiProps?.sprite).toBe('/sprites/pikachu.png');
    expect(result.current.confettiProps?.position).toEqual({ x: 100, y: 200 });

    // Can clear confetti by setting to null
    act(() => {
      result.current.setConfettiProps(null);
    });
    expect(result.current.confettiProps).toBeNull();

    // Confetti state should be independent of other state changes
    act(() => {
      result.current.setConfettiProps(testConfettiProps);
      result.current.setInputValue('test');
    });
    expect(result.current.confettiProps).toEqual(testConfettiProps);

    // Confetti state should persist through resetProgress
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.confettiProps).toEqual(testConfettiProps);
  });

  it('manages easy mode state correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially easy mode should be off
    expect(result.current.isEasyMode).toBe(false);

    // Can enable easy mode
    act(() => {
      result.current.setIsEasyMode(true);
    });
    expect(result.current.isEasyMode).toBe(true);

    // Can disable easy mode
    act(() => {
      result.current.setIsEasyMode(false);
    });
    expect(result.current.isEasyMode).toBe(false);

    // Easy mode state should persist through other state changes
    act(() => {
      result.current.setIsEasyMode(true);
      result.current.setInputValue('test');
    });
    expect(result.current.isEasyMode).toBe(true);
    expect(result.current.inputValue).toBe('test');

    // Easy mode state should persist through resetProgress
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.isEasyMode).toBe(true);

    // Easy mode state should persist through filter changes
    act(() => {
      result.current.setSelectedType('Electric');
    });
    expect(result.current.isEasyMode).toBe(true);
    expect(result.current.selectedType).toBe('Electric');

    // Easy mode state should persist through resetAllFilters
    act(() => {
      result.current.resetAllFilters();
    });
    expect(result.current.isEasyMode).toBe(true);
  });

  it('handles sound muting correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially sound should be unmuted
    expect(result.current.isMuted).toBe(false);

    // Can mute sound
    act(() => {
      result.current.setIsMuted(true);
    });
    expect(result.current.isMuted).toBe(true);

    // Can unmute sound
    act(() => {
      result.current.setIsMuted(false);
    });
    expect(result.current.isMuted).toBe(false);

    // Mute state should persist through other state changes
    act(() => {
      result.current.setIsMuted(true);
      result.current.setInputValue('test');
    });
    expect(result.current.isMuted).toBe(true);
    expect(result.current.inputValue).toBe('test');

    // Mute state should persist through resetProgress
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.isMuted).toBe(true);

    // Mute state should persist through filter changes
    act(() => {
      result.current.setSelectedType('Electric');
    });
    expect(result.current.isMuted).toBe(true);
    expect(result.current.selectedType).toBe('Electric');

    // Mute state should persist through resetAllFilters
    act(() => {
      result.current.resetAllFilters();
    });
    expect(result.current.isMuted).toBe(true);
  });

  it('combines type and generation filters correctly', () => {
    // TODO: Test combining type and generation filters together
  });

  it('handles invalid inputs correctly', () => {
    // TODO: Test behavior when invalid Pokemon names are entered
  });

  it('updates revealed Pokemon correctly when giving up', () => {
    // TODO: Test the give up functionality and revealed Pokemon state
  });

  it('manages loading states correctly', () => {
    // TODO: Test isLoading and isTotalLoading states during async operations
  });

  it('handles no results state correctly', () => {
    // TODO: Test when filters result in no matching Pokemon
  });
});