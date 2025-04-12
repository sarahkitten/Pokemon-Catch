import { useState } from 'react';
import { Pokemon, CaughtPokemon, PokemonData } from '../types';
import { Generation, GENERATIONS, POKEMON_TYPES } from '../constants';

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
  };
}