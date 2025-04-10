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