import { useState } from 'react';
import type { Pokemon, CaughtPokemon, PokemonData } from '../types';
import type { Generation} from '../constants';
import { GENERATIONS, POKEMON_TYPES } from '../constants';
import { POKEMON_DATA } from '../data/pokemonData';

interface GameState {
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
  pokemonData: PokemonData[];
  isFetchingData: boolean;
  isMuted: boolean;
  isEasyMode: boolean;
  noResults: boolean;
  error: string;
  isLoading: boolean;
  isTotalLoading: boolean;
  setCaughtPokemon: (pokemon: CaughtPokemon[] | ((prev: CaughtPokemon[]) => CaughtPokemon[])) => void;
  setInputValue: (value: string) => void;
  setConfettiProps: (props: { sprite: string; position: { x: number; y: number } } | null) => void;
  setSelectedGenerationIndex: (index: number) => void;
  setSelectedType: (type: string) => void;
  setSelectedLetter: (letter: string) => void;
  setTotalPokemon: (total: number) => void;
  setIsGivingUp: (value: boolean) => void;
  setRevealedPokemon: (pokemon: Pokemon[]) => void;
  setPokemonData: (data: PokemonData[]) => void;
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
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTotalLoading, setIsTotalLoading] = useState(false);

  const resetProgress = () => {
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setRevealedPokemon([]);
  };

  const updateTotalCount = async (generation: Generation, type: string, letter: string = selectedLetter) => {
    
    setIsTotalLoading(true);
    setIsFetchingData(true);
    setNoResults(false);
    
    try {
      // Filter Pokemon based on generation, type, and starting letter using local data
      const filteredPokemon = POKEMON_DATA.filter(pokemon => {
        const inGeneration = generation.name === "All Generations" || 
          (pokemon.id >= generation.startId && pokemon.id <= generation.endId);
        const matchesType = type === "All Types" || 
          pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
        const matchesLetter = letter === "All" || 
          pokemon.name.toLowerCase().startsWith(letter.toLowerCase());
        return inGeneration && matchesType && matchesLetter;
      });
      
      setTotalPokemon(filteredPokemon.length);
      setPokemonData(filteredPokemon);
      
      if (filteredPokemon.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      console.error('Error updating Pokemon data:', err);
    } finally {
      setIsTotalLoading(false);
      setIsFetchingData(false);
    }
  };

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
    pokemonData,
    isFetchingData,
    isMuted,
    isEasyMode,
    noResults,
    error,
    isLoading,
    isTotalLoading,
    setCaughtPokemon,
    setInputValue,
    setConfettiProps,
    setSelectedGenerationIndex,
    setSelectedType,
    setSelectedLetter,
    setTotalPokemon,
    setIsGivingUp,
    setRevealedPokemon,
    setPokemonData,
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
  };
}