import type { PokemonData } from '../types';
import type { Generation } from '../constants';
import { findClosestPokemon } from './pokemonUtils';

/**
 * Creates a filtered list of Pokemon based on the specified filters
 * @param pokemonData The complete Pokemon data to filter
 * @param generation The generation filter to apply
 * @param type The type filter to apply
 * @param letter The starting letter filter to apply
 * @returns An array of Pokemon data that matches all filters
 */
export function createPokemonFilters(
  pokemonData: PokemonData[],
  generation: Generation,
  type: string,
  letter: string
): PokemonData[] {
  return pokemonData.filter(pokemon => {
    const inGeneration = generation.name === "All Generations" || 
      (pokemon.id >= generation.startId && pokemon.id <= generation.endId);
    const matchesType = type === "All Types" || 
      pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
    const matchesLetter = letter === "All" || 
      pokemon.name.toLowerCase().startsWith(letter.toLowerCase());
    return inGeneration && matchesType && matchesLetter;
  });
}

/**
 * Validates a Pokemon name against a list of filtered Pokemon
 * @param input The user input to validate
 * @param filteredPokemon The filtered list of Pokemon to validate against
 * @param easyMode Whether easy mode is enabled (allows for fuzzy matching)
 * @returns The matched Pokemon data if valid, undefined otherwise
 */
export function validatePokemonInput(
  input: string,
  filteredPokemon: PokemonData[],
  easyMode: boolean
): PokemonData | undefined {
  const normalizedInput = input.toLowerCase().trim();
  
  // Special case for "nidoran" - match female or male variant based on filters
  if (normalizedInput === 'nidoran') {
    const nidoranFemale = filteredPokemon.find(pokemon => pokemon.name.toLowerCase() === 'nidoran-f');
    const nidoranMale = filteredPokemon.find(pokemon => pokemon.name.toLowerCase() === 'nidoran-m');
    
    // Return whichever variant is available in the filtered list
    return nidoranFemale || nidoranMale;
  }

  // Exact match check for any Pokemon
  const exactMatch = filteredPokemon.find(pokemon => 
    pokemon.name.toLowerCase() === normalizedInput ||
    pokemon.forms.some(form => form.name.toLowerCase() === normalizedInput)
  );
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // If in easy mode, allow for close matches
  if (easyMode) {
    return findClosestPokemon(normalizedInput, filteredPokemon);
  }
  
  return undefined;
}

/**
 * Checks whether the input Pokemon is already caught
 * @param pokemonName The name of the Pokemon to check
 * @param caughtPokemonNames Array of already caught Pokemon names
 * @returns true if the Pokemon is already caught, false otherwise
 */
export function isPokemonAlreadyCaught(
  pokemonName: string,
  caughtPokemonNames: string[]
): boolean {
  return caughtPokemonNames.some(
    name => name.toLowerCase() === pokemonName.toLowerCase()
  );
}

/**
 * Generates the sprite URL for a Pokemon
 * @param pokemonName The name of the Pokemon
 * @returns The URL to the Pokemon's sprite image
 */
export function getPokemonSprite(pokemonName: string): string {
  const normalizedName = pokemonName.toLowerCase().replace(/\s+/g, '-').replace(/[.']/g, '');
  return `/src/data/sprites/${normalizedName}.png`;
}

/**
 * Determines whether all Pokemon in the current filter set have been caught
 * @param caughtCount The number of Pokemon caught
 * @param totalCount The total number of Pokemon in the current filter set
 * @returns true if all Pokemon have been caught, false otherwise
 */
export function areAllPokemonCaught(caughtCount: number, totalCount: number): boolean {
  return caughtCount === totalCount && totalCount > 0;
}

/**
 * Estimates the difficulty of a filter combination based on the number of matching Pokemon
 * @param filteredPokemon The filtered Pokemon list
 * @returns An estimate of the difficulty as a string category
 */
export function estimateFilterDifficulty(filteredPokemon: PokemonData[]): string {
  const count = filteredPokemon.length;
  
  if (count === 0) return 'impossible';
  if (count <= 5) return '1-5';
  if (count <= 20) return '6-20';
  if (count <= 50) return '21-50';
  return '50+';
}