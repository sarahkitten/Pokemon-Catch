import { useState, useCallback } from 'react';
import type { Pokemon, CaughtPokemon, PokemonData } from '../types';
import type { Generation } from '../constants';
import { GENERATIONS, POKEMON_TYPES, UI_CONSTANTS } from '../constants';
import { POKEMON_DATA } from '../data/pokemonData';
import { getRandomValue, findRandomValidCombination, isValidCombination } from '../utils/pokemonUtils';
import { createPokemonFilters, areAllPokemonCaught } from '../utils/pokemonStateUtils';

export interface GameState {
  caughtPokemon: CaughtPokemon[];
  inputValue: string;
  confettiProps: { sprite: string; position: { x: number; y: number } } | null;
  selectedGenerationIndex: number;
  selectedGeneration: Generation;
  selectedType: string;
  selectedLetter: string;
  totalPokemon: number;
  isGivingUp: boolean;
  revealedPokemon: Pokemon[];
  filteredPokemon: PokemonData[];
  isFetchingData: boolean;
  isMuted: boolean;
  isEasyMode: boolean;
  noResults: boolean;
  error: string;
  isLoading: boolean;
  isTotalLoading: boolean;
  allCaught: boolean;
  setCaughtPokemon: (pokemon: CaughtPokemon[] | ((prev: CaughtPokemon[]) => CaughtPokemon[])) => void;
  setInputValue: (value: string) => void;
  setConfettiProps: (props: { sprite: string; position: { x: number; y: number } } | null) => void;
  setSelectedGenerationIndex: (index: number) => void;
  setSelectedType: (type: string) => void;
  setSelectedLetter: (letter: string) => void;
  setTotalPokemon: (total: number) => void;
  setIsGivingUp: (value: boolean) => void;
  setRevealedPokemon: (pokemon: Pokemon[]) => void;
  setFilteredPokemon: (data: PokemonData[]) => void;
  setIsFetchingData: (value: boolean) => void;
  setIsMuted: (value: boolean) => void;
  setIsEasyMode: (value: boolean) => void;
  setNoResults: (value: boolean) => void;
  setError: (error: string) => void;
  setIsLoading: (value: boolean) => void;
  setIsTotalLoading: (value: boolean) => void;
  resetProgress: () => void;
  updateTotalCount: (generation: Generation, type: string, letter?: string) => Promise<void>;
  changeGeneration: (newIndex: number) => Promise<void>;
  changeType: (newType: string) => Promise<void>;
  changeLetter: (newLetter: string) => Promise<void>;
  resetGeneration: () => Promise<void>;
  resetType: () => Promise<void>;
  resetLetter: () => Promise<void>;
  resetAllFilters: () => Promise<void>;
  randomizeGeneration: () => Promise<void>;
  randomizeType: () => Promise<void>;
  randomizeLetter: () => Promise<void>;
  randomizeAllFilters: () => Promise<void>;
  getValidOptions: (filterType: 'generation' | 'type' | 'letter') => (number | string)[];
}

export function useGameState(): GameState {
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [confettiProps, setConfettiProps] = useState<{ sprite: string; position: { x: number; y: number } } | null>(null);
  const [selectedGenerationIndex, setSelectedGenerationIndex] = useState<number>(0);
  const selectedGeneration = GENERATIONS[selectedGenerationIndex];
  const [selectedType, setSelectedType] = useState<string>(POKEMON_TYPES[0]);
  const [selectedLetter, setSelectedLetter] = useState<string>("All");
  const [totalPokemon, setTotalPokemon] = useState<number>(GENERATIONS[0].total);
  const [isGivingUp, setIsGivingUp] = useState(false);
  const [revealedPokemon, setRevealedPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonData[]>(POKEMON_DATA);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTotalLoading, setIsTotalLoading] = useState(false);

  const allCaught = areAllPokemonCaught(caughtPokemon.length, totalPokemon);

  const resetProgress = () => {
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setRevealedPokemon([]);
  };

  const updateTotalCount = useCallback(async (generation: Generation, type: string, letter: string = selectedLetter) => {
    setIsTotalLoading(true);
    setIsFetchingData(true);
    setNoResults(false);
    
    try {
      // Use the extracted utility function to filter Pokemon
      const filteredPokemon = createPokemonFilters(POKEMON_DATA, generation, type, letter);
      
      setTotalPokemon(filteredPokemon.length);
      setFilteredPokemon(filteredPokemon);
      
      if (filteredPokemon.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      console.error('Error updating Pokemon data:', err);
    } finally {
      setIsTotalLoading(false);
      setIsFetchingData(false);
    }
  }, [selectedLetter]);

  const changeGeneration = async (newIndex: number) => {
    const newGen = GENERATIONS[newIndex];
    setSelectedGenerationIndex(newIndex);
    resetProgress();
    await updateTotalCount(newGen, selectedType, selectedLetter);
  };

  const changeType = async (newType: string) => {
    setSelectedType(newType);
    resetProgress();
    await updateTotalCount(selectedGeneration, newType, selectedLetter);
  };

  const changeLetter = async (newLetter: string) => {
    setSelectedLetter(newLetter);
    resetProgress();
    await updateTotalCount(selectedGeneration, selectedType, newLetter);
  };

  const resetGeneration = async () => {
    setSelectedGenerationIndex(0);
    resetProgress();
    await updateTotalCount(GENERATIONS[0], selectedType, selectedLetter);
  };

  const resetType = async () => {
    setSelectedType(POKEMON_TYPES[0]);
    resetProgress();
    await updateTotalCount(selectedGeneration, POKEMON_TYPES[0], selectedLetter);
  };

  const resetLetter = async () => {
    setSelectedLetter("All");
    resetProgress();
    await updateTotalCount(selectedGeneration, selectedType, "All");
  };

  const resetAllFilters = async () => {
    setSelectedGenerationIndex(0);
    setSelectedType(POKEMON_TYPES[0]);
    setSelectedLetter("All");
    resetProgress();
    await updateTotalCount(GENERATIONS[0], POKEMON_TYPES[0], "All");
  };

  const getValidOptions = (filterType: 'generation' | 'type' | 'letter'): (number | string)[] => {
    switch (filterType) {
      case 'generation':
        return GENERATIONS.map((_, index) => index).filter(genIndex => {
          const gen = GENERATIONS[genIndex];
          return isValidCombination(POKEMON_DATA, gen, selectedType, selectedLetter);
        });
      case 'type':
        return POKEMON_TYPES.filter(type =>
          isValidCombination(POKEMON_DATA, selectedGeneration, type, selectedLetter)
        );
      case 'letter': {
        const letters = ["All", ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];
        return letters.filter(letter =>
          isValidCombination(POKEMON_DATA, selectedGeneration, selectedType, letter)
        );
      }
      default:
        return [];
    }
  };

  const randomizeGeneration = async () => {
    const validOptions = getValidOptions('generation') as number[];
    const newGenIndex = getRandomValue(validOptions, selectedGenerationIndex);
    if (newGenIndex !== selectedGenerationIndex) {
      await changeGeneration(newGenIndex);
    }
  };

  const randomizeType = async () => {
    const validOptions = getValidOptions('type') as string[];
    const newType = getRandomValue(validOptions, selectedType);
    if (newType !== selectedType) {
      await changeType(newType);
    }
  };

  const randomizeLetter = async () => {
    const validOptions = getValidOptions('letter') as string[];
    const newLetter = getRandomValue(validOptions, selectedLetter);
    if (newLetter !== selectedLetter) {
      await changeLetter(newLetter);
    }
  };

  const randomizeAllFilters = async () => {
    const result = findRandomValidCombination(
      POKEMON_DATA,
      GENERATIONS,
      POKEMON_TYPES,
      UI_CONSTANTS.MAX_FILTER_ATTEMPTS
    );

    if (result) {
      const { generationIndex, type, letter } = result;
      setSelectedGenerationIndex(generationIndex);
      setSelectedType(type);
      setSelectedLetter(letter);
      resetProgress();
      await updateTotalCount(GENERATIONS[generationIndex], type, letter);
    } else {
      setSelectedGenerationIndex(0);
      setSelectedType(POKEMON_TYPES[0]);
      setSelectedLetter("All");
      resetProgress();
      await updateTotalCount(GENERATIONS[0], POKEMON_TYPES[0], "All");
    }
  };

  return {
    caughtPokemon,
    inputValue,
    confettiProps,
    selectedGenerationIndex,
    selectedGeneration,
    selectedType,
    selectedLetter,
    totalPokemon,
    isGivingUp,
    revealedPokemon,
    filteredPokemon,
    isFetchingData,
    isMuted,
    isEasyMode,
    noResults,
    error,
    isLoading,
    isTotalLoading,
    allCaught,
    setCaughtPokemon,
    setInputValue,
    setConfettiProps,
    setSelectedGenerationIndex,
    setSelectedType,
    setSelectedLetter,
    setTotalPokemon,
    setIsGivingUp,
    setRevealedPokemon,
    setFilteredPokemon,
    setIsFetchingData,
    setIsMuted,
    setIsEasyMode,
    setNoResults,
    setError,
    setIsLoading,
    setIsTotalLoading,
    resetProgress,
    updateTotalCount,
    changeGeneration,
    changeType,
    changeLetter,
    resetGeneration,
    resetType,
    resetLetter,
    resetAllFilters,
    randomizeGeneration,
    randomizeType,
    randomizeLetter,
    randomizeAllFilters,
    getValidOptions
  };
}