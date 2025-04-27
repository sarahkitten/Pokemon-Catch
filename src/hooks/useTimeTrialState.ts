import { useState, useCallback, useEffect, useRef } from 'react';
import type { 
  TimeTrialDifficulty, 
  PokemonCountCategory, 
  TimeTrialState, 
  CaughtPokemon, 
  PokemonData,
  TimeTrialSettings
} from '../types';
import { GENERATIONS, POKEMON_TYPES, TIME_TRIAL } from '../constants';
import { POKEMON_DATA } from '../data/pokemonData';
import { 
  createPokemonFilters, 
  validatePokemonInput, 
  isPokemonAlreadyCaught, 
  getPokemonSprite,
} from '../utils/pokemonStateUtils';
import { findRandomValidCombination } from '../utils/pokemonUtils';

export interface UseTimeTrialStateReturn extends TimeTrialState {
  // Action methods
  startTimeTrial: (difficulty: TimeTrialDifficulty, category: PokemonCountCategory, easyMode: boolean) => void;
  pauseTimeTrial: () => void;
  resumeTimeTrial: () => void;
  endTimeTrial: () => void;
  resetTimeTrial: () => void;
  validateInput: (input: string) => { valid: boolean; pokemon?: PokemonData };
  catchPokemon: (pokemon: PokemonData) => void;
  setInputValue: (value: string) => void;
  generateRandomChallenge: (category: PokemonCountCategory) => Promise<boolean>;
  getTimeTrialSettings: (difficulty: TimeTrialDifficulty) => TimeTrialSettings;
  shareTrial: () => string;
  loadSharedTrial: (code: string) => boolean;
}

/**
 * Hook for managing Time Trial state
 */
export function useTimeTrialState(): UseTimeTrialStateReturn {
  // Core time trial state
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<TimeTrialDifficulty>('medium');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [pokemonCountCategory, setPokemonCountCategory] = useState<PokemonCountCategory>('6-20');
  const [isEasyMode, setIsEasyMode] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  
  // Pokemon-related state
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonData[]>([]);
  const [totalPokemon, setTotalPokemon] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    generation: GENERATIONS[0],
    type: POKEMON_TYPES[0],
    letter: "All"
  });
  
  // Timer reference for cleanup
  const timerRef = useRef<number | null>(null);
  
  // Get time trial settings based on difficulty
  const getTimeTrialSettings = useCallback((difficultyLevel: TimeTrialDifficulty): TimeTrialSettings => {
    switch (difficultyLevel) {
      case 'easy':
        return {
          initialTime: TIME_TRIAL.DIFFICULTY.EASY.initialTime,
          timeAddedPerCatch: TIME_TRIAL.DIFFICULTY.EASY.timePerCatch,
          easyMode: isEasyMode
        };
      case 'hard':
        return {
          initialTime: TIME_TRIAL.DIFFICULTY.HARD.initialTime,
          timeAddedPerCatch: TIME_TRIAL.DIFFICULTY.HARD.timePerCatch,
          easyMode: isEasyMode
        };
      case 'medium':
      default:
        return {
          initialTime: TIME_TRIAL.DIFFICULTY.MEDIUM.initialTime,
          timeAddedPerCatch: TIME_TRIAL.DIFFICULTY.MEDIUM.timePerCatch,
          easyMode: isEasyMode
        };
    }
  }, [isEasyMode]);
  
  // Timer effect
  useEffect(() => {
    // Only run timer when active and not paused
    if (!isActive || isPaused) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    
    // Set up timer to count down every second
    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        // End trial if time is up
        if (prev <= TIME_TRIAL.MIN_TIME_REMAINING) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setEndTime(Date.now());
          setIsActive(false);
          return TIME_TRIAL.MIN_TIME_REMAINING;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup interval on unmount or state change
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, isPaused]);
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  
  // Start a time trial
  const startTimeTrial = useCallback((
    selectedDifficulty: TimeTrialDifficulty,
    selectedCategory: PokemonCountCategory,
    selectedEasyMode: boolean
  ) => {
    setDifficulty(selectedDifficulty);
    setPokemonCountCategory(selectedCategory);
    setIsEasyMode(selectedEasyMode);
    
    const settings = getTimeTrialSettings(selectedDifficulty);
    setTimeRemaining(settings.initialTime);
    
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setIsActive(true);
    setIsPaused(false);
    setStartTime(Date.now());
    setEndTime(null);
  }, [getTimeTrialSettings]);
  
  // Pause the time trial
  const pauseTimeTrial = useCallback(() => {
    if (isActive && !isPaused) {
      setIsPaused(true);
    }
  }, [isActive, isPaused]);
  
  // Resume the time trial
  const resumeTimeTrial = useCallback(() => {
    if (isActive && isPaused) {
      setIsPaused(false);
    }
  }, [isActive, isPaused]);
  
  // End the time trial
  const endTimeTrial = useCallback(() => {
    setIsActive(false);
    setEndTime(Date.now());
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  // Reset the time trial state
  const resetTimeTrial = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setStartTime(null);
    setEndTime(null);
    setShareCode(null);
  }, []);
  
  // Validate user input against filtered Pokemon
  const validateInput = useCallback((input: string) => {
    if (!input.trim()) {
      setError('');
      return { valid: false };
    }
    
    const pokemon = validatePokemonInput(input, filteredPokemon, isEasyMode);
    
    if (!pokemon) {
      setError('Pokemon not found');
      return { valid: false };
    }
    
    if (isPokemonAlreadyCaught(pokemon.name, caughtPokemon.map(p => p.name))) {
      setError('Already caught');
      return { valid: false };
    }
    
    setError('');
    return { valid: true, pokemon };
  }, [filteredPokemon, isEasyMode, caughtPokemon]);
  
  // Catch a Pokemon and add time based on difficulty
  const catchPokemon = useCallback((pokemon: PokemonData) => {
    const pokemonTypes = pokemon.types || [];
    const sprite = getPokemonSprite(pokemon.name);
    
    const newCaught: CaughtPokemon = {
      name: pokemon.name,
      sprite,
      types: pokemonTypes
    };
    
    setCaughtPokemon(prev => [...prev, newCaught]);
    setInputValue('');
    
    // Add time based on difficulty
    if (isActive) {
      const settings = getTimeTrialSettings(difficulty);
      setTimeRemaining(prev => prev + settings.timeAddedPerCatch);
      
      // End trial if all Pokemon caught
      if (caughtPokemon.length + 1 === totalPokemon) {
        endTimeTrial();
      }
    }
  }, [difficulty, isActive, caughtPokemon.length, totalPokemon, getTimeTrialSettings, endTimeTrial]);
  
  // Generate a random challenge based on the selected Pokemon count category
  const generateRandomChallenge = useCallback(async (category: PokemonCountCategory): Promise<boolean> => {
    setIsLoading(true);
    
    // Define target Pokemon count range based on selected category
    let targetMin = 0;
    let targetMax = 0;
    
    switch (category) {
      case '1-5':
        targetMin = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.VERY_FEW.min;
        targetMax = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.VERY_FEW.max;
        break;
      case '6-20':
        targetMin = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.FEW.min;
        targetMax = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.FEW.max;
        break;
      case '21-50':
        targetMin = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.SOME.min;
        targetMax = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.SOME.max;
        break;
      case '50+':
        targetMin = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.MANY.min;
        targetMax = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.MANY.max;
        break;
      case 'all':
      default:
        targetMin = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.ALL.min;
        targetMax = TIME_TRIAL.POKEMON_COUNT_CATEGORIES.ALL.max;
        break;
    }
    
    // Find a valid random combination with the target number of Pokemon
    const maxAttempts = 100; // Maximum filter attempts
    let attempts = 0;
    let found = false;
    
    while (attempts < maxAttempts && !found) {
      attempts++;
      
      // Get a random combination
      const combination = findRandomValidCombination(
        POKEMON_DATA,
        GENERATIONS,
        POKEMON_TYPES,
        maxAttempts
      );
      
      if (!combination) continue;
      
      const { generationIndex, type, letter } = combination;
      const generation = GENERATIONS[generationIndex];
      
      // Filter Pokemon based on the combination
      const filtered = createPokemonFilters(POKEMON_DATA, generation, type, letter);
      
      // Check if the count is within the target range
      if (filtered.length >= targetMin && filtered.length <= targetMax) {
        // We found a valid combination
        setFilters({
          generation,
          type,
          letter
        });
        
        setFilteredPokemon(filtered);
        setTotalPokemon(filtered.length);
        setIsLoading(false);
        
        found = true;
        break;
      }
    }
    
    setIsLoading(false);
    return found;
  }, []);
  
  // Generate a shareable code for the current trial
  const shareTrial = useCallback((): string => {
    // Find the index of the current generation
    const genIndex = GENERATIONS.findIndex(g => 
      g.startId === filters.generation.startId && g.endId === filters.generation.endId
    );
    
    // Create a share params object
    const shareParams = {
      d: difficulty,
      c: pokemonCountCategory,
      e: isEasyMode ? 1 : 0,
      g: genIndex,
      t: filters.type,
      l: filters.letter
    };
    
    // Convert to base64
    const code = btoa(JSON.stringify(shareParams));
    setShareCode(code);
    return code;
  }, [difficulty, pokemonCountCategory, isEasyMode, filters]);
  
  // Load a shared trial from a code
  const loadSharedTrial = useCallback((code: string): boolean => {
    try {
      // Decode the code
      const shareParams = JSON.parse(atob(code));
      
      // Validate required fields
      if (!shareParams.d || !shareParams.c || shareParams.g === undefined || 
          !shareParams.t || !shareParams.l) {
        return false;
      }
      
      // Extract and validate fields
      const sharedDifficulty = shareParams.d as TimeTrialDifficulty;
      const sharedCategory = shareParams.c as PokemonCountCategory;
      const sharedEasyMode = shareParams.e === 1;
      const genIndex = Number(shareParams.g);
      
      if (genIndex < 0 || genIndex >= GENERATIONS.length) {
        return false;
      }
      
      const generation = GENERATIONS[genIndex];
      const type = shareParams.t;
      const letter = shareParams.l;
      
      // Set the filters
      setFilters({
        generation,
        type,
        letter
      });
      
      // Filter Pokemon
      const filtered = createPokemonFilters(POKEMON_DATA, generation, type, letter);
      setFilteredPokemon(filtered);
      setTotalPokemon(filtered.length);
      
      // Set other state
      setDifficulty(sharedDifficulty);
      setPokemonCountCategory(sharedCategory);
      setIsEasyMode(sharedEasyMode);
      setShareCode(code);
      
      return true;
    } catch (err) {
      console.error('Error loading shared trial:', err);
      return false;
    }
  }, []);
  
  return {
    // State
    isActive,
    isPaused,
    difficulty,
    timeRemaining,
    pokemonCountCategory,
    caughtPokemon,
    inputValue,
    isEasyMode,
    error,
    startTime,
    endTime,
    filters,
    filteredPokemon,
    totalPokemon,
    isLoading,
    shareCode,
    
    // Methods
    startTimeTrial,
    pauseTimeTrial,
    resumeTimeTrial,
    endTimeTrial,
    resetTimeTrial,
    validateInput,
    catchPokemon,
    setInputValue,
    generateRandomChallenge,
    getTimeTrialSettings,
    shareTrial,
    loadSharedTrial
  };
}