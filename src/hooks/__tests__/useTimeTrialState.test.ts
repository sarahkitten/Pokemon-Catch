// import { renderHook, act } from '@testing-library/react';
// import { useTimeTrialState } from '../useTimeTrialState';
// import { TIME_TRIAL, GENERATIONS, POKEMON_TYPES } from '../../constants';
// import * as pokemonStateUtils from '../../utils/pokemonStateUtils';
// import { PokemonData } from '../../types';

// // Mock pokemon data
// const mockPokemonData: PokemonData[] = [
//   {
//     id: 1,
//     name: 'Bulbasaur',
//     types: ['Grass', 'Poison'],
//     sprite: 'bulbasaur.png'
//   },
//   {
//     id: 4,
//     name: 'Charmander',
//     types: ['Fire'],
//     sprite: 'charmander.png'
//   },
//   {
//     id: 7,
//     name: 'Squirtle',
//     types: ['Water'],
//     sprite: 'squirtle.png'
//   }
// ];

// // Mock the shared utilities
// jest.mock('../../utils/pokemonStateUtils', () => ({
//   createPokemonFilters: jest.fn(),
// }));

// describe('useTimeTrialState', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.useFakeTimers();
    
//     // Default mock implementation
//     (pokemonStateUtils.createPokemonFilters as jest.Mock).mockReturnValue(mockPokemonData);
//   });

//   afterEach(() => {
//     jest.useRealTimers();
//   });

//   test('should initialize with default state', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     expect(result.current.isActive).toBe(false);
//     expect(result.current.isPaused).toBe(false);
//     expect(result.current.difficulty).toBe('medium');
//     expect(result.current.pokemonCountCategory).toBe('6-20');
//     expect(result.current.caughtPokemon).toEqual([]);
//     expect(result.current.timeRemaining).toBe(0);
//     expect(result.current.isEasyMode).toBe(false);
//   });

//   test('should update difficulty and get correct initial time', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     act(() => {
//       result.current.setDifficulty('easy');
//     });
    
//     expect(result.current.difficulty).toBe('easy');
    
//     // Start time trial
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     // Check that initial time is set based on difficulty
//     expect(result.current.timeRemaining).toBe(TIME_TRIAL.DIFFICULTY.EASY.initialTime);
//   });

//   test('should update Pokemon count category', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     act(() => {
//       result.current.setPokemonCountCategory('21-50');
//     });
    
//     expect(result.current.pokemonCountCategory).toBe('21-50');
//   });

//   test('should start time trial with correct initial settings', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Configure time trial
//     act(() => {
//       result.current.setDifficulty('hard');
//       result.current.setPokemonCountCategory('1-5');
//       result.current.setIsEasyMode(true);
//     });
    
//     // Start time trial
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     expect(result.current.isActive).toBe(true);
//     expect(result.current.timeRemaining).toBe(TIME_TRIAL.DIFFICULTY.HARD.initialTime);
//     expect(result.current.isEasyMode).toBe(true);
//     expect(result.current.startTime).not.toBeNull();
//     expect(result.current.filteredPokemon.length).toBeGreaterThan(0);
//   });

//   test('should decrement time remaining as timer ticks', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start time trial with medium difficulty
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     const initialTime = result.current.timeRemaining;
    
//     // Fast-forward 1 second
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });
    
//     expect(result.current.timeRemaining).toBe(initialTime - 1);
    
//     // Fast-forward 5 more seconds
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
    
//     expect(result.current.timeRemaining).toBe(initialTime - 6);
//   });

//   test('should end time trial when time reaches zero', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start time trial
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     // Fast-forward to end of time
//     act(() => {
//       jest.advanceTimersByTime(result.current.timeRemaining * 1000);
//     });
    
//     expect(result.current.isActive).toBe(false);
//     expect(result.current.endTime).not.toBeNull();
//     expect(result.current.timeRemaining).toBe(0);
//   });

//   test('should catch Pokemon and add time to timer', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start time trial
//     act(() => {
//       result.current.setDifficulty('medium');
//       result.current.startTimeTrial();
//     });
    
//     const initialTime = result.current.timeRemaining;
    
//     // Catch a Pokemon
//     act(() => {
//       result.current.submitGuess('Bulbasaur');
//     });
    
//     // Should add time based on difficulty (medium = +10 seconds)
//     expect(result.current.timeRemaining).toBe(initialTime + TIME_TRIAL.DIFFICULTY.MEDIUM.timePerCatch);
//     expect(result.current.caughtPokemon.length).toBe(1);
//     expect(result.current.caughtPokemon[0].name).toBe('Bulbasaur');
//   });

//   test('should handle incorrect guesses', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start time trial
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     const initialCaughtCount = result.current.caughtPokemon.length;
//     const initialTime = result.current.timeRemaining;
    
//     // Submit an incorrect guess
//     act(() => {
//       result.current.submitGuess('NotAPokemon');
//     });
    
//     // Should not change caught Pokemon or add time
//     expect(result.current.caughtPokemon.length).toBe(initialCaughtCount);
//     expect(result.current.timeRemaining).toBe(initialTime);
//     expect(result.current.error).not.toBe('');
//   });

//   test('should allow pausing and resuming the timer', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start time trial
//     act(() => {
//       result.current.startTimeTrial();
//     });
    
//     const timeAfterStart = result.current.timeRemaining;
    
//     // Pause the timer
//     act(() => {
//       result.current.pauseTimeTrial();
//     });
    
//     expect(result.current.isPaused).toBe(true);
    
//     // Fast-forward 5 seconds while paused
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
    
//     // Time should not have decreased
//     expect(result.current.timeRemaining).toBe(timeAfterStart);
    
//     // Resume the timer
//     act(() => {
//       result.current.resumeTimeTrial();
//     });
    
//     expect(result.current.isPaused).toBe(false);
    
//     // Fast-forward 3 seconds after resuming
//     act(() => {
//       jest.advanceTimersByTime(3000);
//     });
    
//     // Time should now decrease
//     expect(result.current.timeRemaining).toBe(timeAfterStart - 3);
//   });

//   test('should generate a valid share code', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Configure and start time trial
//     act(() => {
//       result.current.setDifficulty('hard');
//       result.current.setPokemonCountCategory('1-5');
//       result.current.setIsEasyMode(true);
//       result.current.startTimeTrial();
//     });
    
//     // Generate share code
//     act(() => {
//       result.current.generateShareCode();
//     });
    
//     expect(result.current.shareCode).not.toBeNull();
//     expect(typeof result.current.shareCode).toBe('string');
    
//     // Share code should contain the relevant parameters
//     const shareCode = result.current.shareCode as string;
//     expect(shareCode).toContain('difficulty=hard');
//     expect(shareCode).toContain('easyMode=true');
//     expect(shareCode).toContain('pokemonCountCategory=1-5');
//   });

//   test('should reset time trial state', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     // Start and catch a Pokemon
//     act(() => {
//       result.current.startTimeTrial();
//       result.current.submitGuess('Bulbasaur');
//     });
    
//     // Reset state
//     act(() => {
//       result.current.resetTimeTrial();
//     });
    
//     expect(result.current.isActive).toBe(false);
//     expect(result.current.caughtPokemon).toEqual([]);
//     expect(result.current.startTime).toBeNull();
//     expect(result.current.endTime).toBeNull();
//     expect(result.current.shareCode).toBeNull();
//   });

//   test('should load a shared challenge from parameters', () => {
//     const { result } = renderHook(() => useTimeTrialState());
    
//     const sharedParams = {
//       difficulty: 'hard',
//       pokemonCountCategory: '21-50',
//       easyMode: 'true',
//       generationIndex: '2',
//       type: 'Water',
//       letter: 'S'
//     };
    
//     // Load shared challenge
//     act(() => {
//       result.current.loadSharedChallenge(sharedParams);
//     });
    
//     expect(result.current.difficulty).toBe('hard');
//     expect(result.current.pokemonCountCategory).toBe('21-50');
//     expect(result.current.isEasyMode).toBe(true);
//     expect(result.current.filters.generation).toEqual(GENERATIONS[2]);
//     expect(result.current.filters.type).toBe('Water');
//     expect(result.current.filters.letter).toBe('S');
//   });
// });