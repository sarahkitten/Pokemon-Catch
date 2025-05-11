import { jest } from '@jest/globals';
import { GENERATIONS, POKEMON_TYPES } from '../constants';
import { POKEMON_DATA } from '../data/pokemonData';
import type { GameState } from '../hooks/useGameState';

export const createMockGameStateFunctions = () => ({
  mockChangeFilters: jest.fn<(newGenIndex: number, newType: string, newLetter: string) => Promise<void>>().mockImplementation(async () => {}),
  mockChangeGeneration: jest.fn<(newIndex: number) => Promise<void>>().mockImplementation(async () => {}),
  mockChangeType: jest.fn<(newType: string) => Promise<void>>().mockImplementation(async () => {}),
  mockChangeLetter: jest.fn<(newLetter: string) => Promise<void>>().mockImplementation(async () => {}),
  mockRandomizeGeneration: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockRandomizeType: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockRandomizeLetter: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockRandomizeAllFilters: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockResetGeneration: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockResetType: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockResetLetter: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockResetAllFilters: jest.fn<() => Promise<void>>().mockImplementation(async () => {}),
  mockUpdateTotalCount: jest.fn<GameState['updateTotalCount']>().mockImplementation(async () => {}),
  mockGetValidOptions: jest.fn<GameState['getValidOptions']>().mockImplementation(() => ['option1', 'option2'])
});

export const createMockGameState = (overrides: Partial<GameState> = {}): GameState => {
  const mockFunctions = createMockGameStateFunctions();

  const defaultState: GameState = {
    // State values
    selectedGenerationIndex: 0,
    selectedType: POKEMON_TYPES[0],
    selectedLetter: 'All',
    caughtPokemon: [],
    isEasyMode: false,
    inputValue: '',
    confettiProps: null,
    selectedGeneration: GENERATIONS[0],
    totalPokemon: GENERATIONS[0].total,
    isGivingUp: false,
    revealedPokemon: [],
    filteredPokemon: POKEMON_DATA,
    isFetchingData: false,
    isMuted: false,
    allCaught: false,
    noResults: false,
    error: '',
    isLoading: false,
    isTotalLoading: false,

    // Core state setters
    setCaughtPokemon: jest.fn(),
    setSelectedGenerationIndex: jest.fn(),
    setSelectedType: jest.fn(),
    setSelectedLetter: jest.fn(),
    setTotalPokemon: jest.fn(),
    setFilteredPokemon: jest.fn(),

    // Action handlers with typed mocks
    changeFilters: mockFunctions.mockChangeFilters,
    changeGeneration: mockFunctions.mockChangeGeneration,
    changeType: mockFunctions.mockChangeType,
    changeLetter: mockFunctions.mockChangeLetter,
    randomizeGeneration: mockFunctions.mockRandomizeGeneration,
    randomizeType: mockFunctions.mockRandomizeType,
    randomizeLetter: mockFunctions.mockRandomizeLetter,
    randomizeAllFilters: mockFunctions.mockRandomizeAllFilters,
    resetGeneration: mockFunctions.mockResetGeneration,
    resetType: mockFunctions.mockResetType,
    resetLetter: mockFunctions.mockResetLetter,
    resetAllFilters: mockFunctions.mockResetAllFilters,
    updateTotalCount: mockFunctions.mockUpdateTotalCount,

    // UI state setters
    setIsEasyMode: jest.fn(),
    setInputValue: jest.fn(),
    setConfettiProps: jest.fn(),
    setIsGivingUp: jest.fn(),
    setRevealedPokemon: jest.fn(),
    setIsFetchingData: jest.fn(),
    setIsMuted: jest.fn(),
    setNoResults: jest.fn(),
    setError: jest.fn(),
    setIsLoading: jest.fn(),
    setIsTotalLoading: jest.fn(),

    // Utilities
    getValidOptions: mockFunctions.mockGetValidOptions,
    resetProgress: jest.fn()
  };

  return {
    ...defaultState,
    ...overrides
  };
};