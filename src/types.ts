import type { Generation } from './constants';

export interface CaughtPokemon {
  name: string;
  sprite: string;
  types: string[];
}

export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  generation: number;
  forms: {
    name: string;
    isDefault: boolean;
  }[];
  spriteUrl?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export type TimeTrialDifficulty = 'easy' | 'medium' | 'hard';

export type PokemonCountCategory = '1-5' | '6-20' | '21-50' | '50+' | 'all';

export interface TimeTrialState {
  isActive: boolean;
  isPaused: boolean;
  difficulty: TimeTrialDifficulty;
  timeRemaining: number;
  pokemonCountCategory: PokemonCountCategory;
  caughtPokemon: CaughtPokemon[];
  inputValue: string;
  isEasyMode: boolean;
  error: string;
  startTime: number | null;
  endTime: number | null;
  filters: {
    generation: Generation;
    type: string;
    letter: string;
  };
  filteredPokemon: PokemonData[];
  totalPokemon: number;
  shareCode: string | null;
}

export interface TimeTrialSettings {
  initialTime: number; // Seconds
  timeAddedPerCatch: number; // Seconds
  easyMode: boolean;
}

export interface TimeTrialShareParams {
  difficulty: string;
  pokemonCountCategory: string;
  easyMode: boolean;
  generationIndex: number;
  type: string;
  letter: string;
}