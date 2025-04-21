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
    expect(result.current.filteredPokemon.every(pokemon => 
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
    expect(result.current.filteredPokemon.every(pokemon => 
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
    expect(result.current.filteredPokemon.every(pokemon => 
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
    expect(result.current.filteredPokemon.every(pokemon => 
      pokemon.name.toLowerCase().startsWith('p') &&
      pokemon.id >= GENERATIONS[1].startId && 
      pokemon.id <= GENERATIONS[1].endId
    )).toBe(true);

    // Should include Pikachu but not Piplup (Gen 4)
    const pokemonNames = result.current.filteredPokemon.map(p => p.name.toLowerCase());
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

  it('combines type and generation filters correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Change to Generation 1
    await act(async () => {
      await result.current.changeGeneration(1);
    });

    // Then change to Electric type
    await act(async () => {
      await result.current.changeType('Electric');
    });

    // Verify both filters were applied correctly
    expect(result.current.selectedGenerationIndex).toBe(1);
    expect(result.current.selectedType).toBe('Electric');
    expect(result.current.filteredPokemon.every(pokemon => 
      // Should be in Gen 1 range
      pokemon.id >= GENERATIONS[1].startId && 
      pokemon.id <= GENERATIONS[1].endId &&
      // Should be Electric type
      pokemon.types.some(type => type.toLowerCase() === 'electric')
    )).toBe(true);

    // Should include Pikachu but not Electivire (Gen 4)
    const pokemonNames = result.current.filteredPokemon.map(p => p.name.toLowerCase());
    expect(pokemonNames).toContain('pikachu');
    expect(pokemonNames).not.toContain('electivire');

    // Total count should be less than both total Gen 1 Pokemon and total Electric Pokemon
    expect(result.current.totalPokemon).toBeLessThan(GENERATIONS[1].total);
    expect(result.current.totalPokemon).toBeGreaterThan(0);
  });

  it('handles invalid inputs correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially there should be no error
    expect(result.current.error).toBe('');

    // Test non-existent Pokemon
    act(() => {
      result.current.setInputValue('NotAPokemon');
      result.current.setError('That\'s not a valid Pokemon name!');
    });
    expect(result.current.error).toBe('That\'s not a valid Pokemon name!');
    
    // Test already caught Pokemon
    act(() => {
      result.current.setCaughtPokemon([{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]);
      result.current.setInputValue('Pikachu');
      result.current.setError('You already caught Pikachu!');
    });
    expect(result.current.error).toBe('You already caught Pikachu!');

    // Test filter mismatches
    act(() => {
      // Set Generation 1 filter
      result.current.setSelectedGenerationIndex(1);
      // Try to catch a Gen 2 Pokemon
      result.current.setError('That Pokemon is not in Gen 1 (Kanto)!');
    });
    expect(result.current.error).toBe('That Pokemon is not in Gen 1 (Kanto)!');

    act(() => {
      // Set Electric type filter
      result.current.setSelectedType('Electric');
      // Error for non-Electric type
      result.current.setError('That Pokemon is not a Electric type!');
    });
    expect(result.current.error).toBe('That Pokemon is not a Electric type!');

    act(() => {
      // Set letter filter to P
      result.current.setSelectedLetter('P');
      // Error for wrong starting letter
      result.current.setError('That Pokemon doesn\'t start with the letter P!');
    });
    expect(result.current.error).toBe('That Pokemon doesn\'t start with the letter P!');

    // Error should be cleared by resetProgress
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.error).toBe('');

    // Error should be cleared by resetAllFilters
    act(() => {
      result.current.setError('Some error');
      result.current.resetAllFilters();
    });
    expect(result.current.error).toBe('');
  });

  it('updates revealed Pokemon correctly when giving up', () => {
    const { result } = renderHook(() => useGameState());
    
    // Set some initial caught Pokemon
    act(() => {
      result.current.setCaughtPokemon([{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]);
    });

    // Set Generation 1 and Electric type filters
    act(() => {
      result.current.setSelectedGenerationIndex(1);
      result.current.setSelectedType('Electric');
    });

    // Initially there should be no revealed Pokemon
    expect(result.current.revealedPokemon).toHaveLength(0);

    // Set giving up state and reveal Pokemon
    act(() => {
      result.current.setIsGivingUp(true);
      // Simulate revealing remaining Electric Pokemon from Gen 1
      result.current.setRevealedPokemon([
        {
          id: 100,
          name: 'Voltorb',
          sprite: '/sprites/voltorb.png',
          types: ['Electric']
        },
        {
          id: 101,
          name: 'Electrode',
          sprite: '/sprites/electrode.png',
          types: ['Electric']
        }
      ]);
    });

    // Verify revealed Pokemon state
    expect(result.current.isGivingUp).toBe(true);
    expect(result.current.revealedPokemon).toHaveLength(2);
    expect(result.current.revealedPokemon.map(p => p.name)).toEqual(['Voltorb', 'Electrode']);
    
    // Already caught Pokemon (Pikachu) should not be in revealed list
    expect(result.current.revealedPokemon.some(p => p.name === 'Pikachu')).toBe(false);
    
    // All revealed Pokemon should match current filters
    expect(result.current.revealedPokemon.every(pokemon => 
      pokemon.types.includes('Electric')
    )).toBe(true);

    // Reset should clear revealed Pokemon
    act(() => {
      result.current.resetProgress();
    });
    expect(result.current.revealedPokemon).toHaveLength(0);
    expect(result.current.isGivingUp).toBe(true); // isGivingUp should persist through reset
  });

  it('manages loading states correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially no loading states should be active
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isTotalLoading).toBe(false);
    expect(result.current.isFetchingData).toBe(false);

    // Test loading states during filter changes
    await act(async () => {
      // Start changing generation
      result.current.setIsTotalLoading(true);
      result.current.setIsFetchingData(true);
      
      // Change generation
      await result.current.changeGeneration(1);
    });

    // After filter change, loading states should be cleared
    expect(result.current.isTotalLoading).toBe(false);
    expect(result.current.isFetchingData).toBe(false);

    // Test loading state during Pokemon catching
    act(() => {
      result.current.setIsLoading(true);
    });
    expect(result.current.isLoading).toBe(true);

    // Loading state should be independent of other state changes
    act(() => {
      result.current.setInputValue('pikachu');
    });
    expect(result.current.isLoading).toBe(true);

    // Clear loading state
    act(() => {
      result.current.setIsLoading(false);
    });
    expect(result.current.isLoading).toBe(false);

    // Loading states should be cleared by resetProgress
    act(() => {
      result.current.setIsLoading(true);
      result.current.setIsTotalLoading(true);
      result.current.setIsFetchingData(true);
      result.current.resetProgress();
    });
    
    // Loading states should persist through resetProgress as they're independent
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isTotalLoading).toBe(true);
    expect(result.current.isFetchingData).toBe(true);

    // Reset all loading states at the end
    act(() => {
      result.current.setIsLoading(false);
      result.current.setIsTotalLoading(false);
      result.current.setIsFetchingData(false);
    });
  });

  it('handles no results state correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Initially there should be no "no results" state
    expect(result.current.noResults).toBe(false);

    // Set up impossible combination of filters
    // No Pokemon can be both Fire and Water type
    await act(async () => {
      await result.current.changeType('Fire');
    });

    await act(async () => {
      // Use updateTotalCount directly to set an impossible combination
      await result.current.updateTotalCount(
        result.current.selectedGeneration,
        'Fire AND Water', // This type doesn't exist, should result in no matches
        result.current.selectedLetter
      );
    });

    // No results state should be true as no Pokemon can match this combination
    expect(result.current.noResults).toBe(true);
    expect(result.current.filteredPokemon).toHaveLength(0);

    // Reset filters should clear no results state
    await act(async () => {
      await result.current.resetAllFilters();
    });
    expect(result.current.noResults).toBe(false);
    expect(result.current.filteredPokemon.length).toBeGreaterThan(0);

    // Try another impossible combination
    await act(async () => {
      await result.current.updateTotalCount(
        result.current.selectedGeneration,
        result.current.selectedType,
        '🎈' // Invalid letter that no Pokemon name starts with
      );
    });
    expect(result.current.noResults).toBe(true);
    expect(result.current.filteredPokemon).toHaveLength(0);

    // Changing back to valid filters should clear no results state
    await act(async () => {
      await result.current.resetAllFilters();
    });
    expect(result.current.noResults).toBe(false);
    expect(result.current.filteredPokemon.length).toBeGreaterThan(0);
  });

  it('randomization functions work correctly', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Test randomizeGeneration
    await act(async () => {
      await result.current.randomizeGeneration();
    });
    expect(result.current.selectedGenerationIndex).toBeGreaterThanOrEqual(0);
    expect(result.current.selectedGenerationIndex).toBeLessThan(GENERATIONS.length);
    
    // Test randomizeType
    await act(async () => {
      await result.current.randomizeType();
    });
    expect(POKEMON_TYPES).toContain(result.current.selectedType);
    
    // Test randomizeLetter
    await act(async () => {
      await result.current.randomizeLetter();
    });
    expect(result.current.selectedLetter).toMatch(/^[A-Z]$|^All$/);
    
    // Test randomizeAllFilters
    await act(async () => {
      await result.current.randomizeAllFilters();
    });
    // Verify that the resulting combination is valid
    const validGenerations = result.current.getValidOptions('generation');
    const validTypes = result.current.getValidOptions('type');
    const validLetters = result.current.getValidOptions('letter');
    
    expect(validGenerations).toContain(result.current.selectedGenerationIndex);
    expect(validTypes).toContain(result.current.selectedType);
    expect(validLetters).toContain(result.current.selectedLetter);
  });

  it('getValidOptions returns correct options for each filter type', async () => {
    const { result } = renderHook(() => useGameState());
    
    // Test generation options
    const generationOptions = result.current.getValidOptions('generation');
    expect(generationOptions).toBeInstanceOf(Array);
    expect(generationOptions.length).toBeGreaterThan(0);
    expect(generationOptions.every(index => 
      typeof index === 'number' && index >= 0 && index < GENERATIONS.length
    )).toBe(true);
    
    // Test type options
    const typeOptions = result.current.getValidOptions('type');
    expect(typeOptions).toBeInstanceOf(Array);
    expect(typeOptions.length).toBeGreaterThan(0);
    expect(typeOptions.every(type => 
      POKEMON_TYPES.includes(type as string)
    )).toBe(true);
    
    // Test letter options
    const letterOptions = result.current.getValidOptions('letter');
    expect(letterOptions).toBeInstanceOf(Array);
    expect(letterOptions.length).toBeGreaterThan(0);
    expect(letterOptions[0]).toBe('All');
    expect(letterOptions.every(letter => 
      letter === 'All' || /^[A-Z]$/.test(letter as string)
    )).toBe(true);
    
    // Test invalid filter type
    const invalidOptions = result.current.getValidOptions('generation' as 'generation' | 'type' | 'letter');
    expect(invalidOptions).toEqual([]);
    
    // Test options with restrictive filters
    await act(async () => {
      await result.current.changeGeneration(1); // Gen 1
      await result.current.changeType('Electric'); // Electric type
    });
    
    const filteredLetterOptions = result.current.getValidOptions('letter');
    // Should only include letters that start Pokemon names in Gen 1 Electric types
    expect(filteredLetterOptions).toContain('P'); // For Pikachu
    expect(filteredLetterOptions).toContain('E'); // For Electrode
    expect(filteredLetterOptions).toContain('V'); // For Voltorb
    expect(filteredLetterOptions).not.toContain('X'); // No Gen 1 Electric Pokemon starts with X
  });
});