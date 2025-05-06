import type { PokemonData, CaughtPokemon, Pokemon } from '../types';
import type { Generation } from '../constants';
import { UI_CONSTANTS } from '../constants';
import { POKEMON_DATA } from '../data/pokemonData';
import { findClosestPokemon, fetchFormSprite, playPokemonCry, calculateConfettiPosition } from './pokemonUtils';
import type { GameState } from '../hooks/useGameState';

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

/**
 * Handles the Pokemon catch attempt logic 
 * @param gameState The current game state
 * @param inputRef Reference to the input element for focusing and confetti positioning
 * @returns A Promise that resolves when the submission process is complete
 */
export async function submitPokemonGuess(
  gameState: GameState, 
  inputRef: React.RefObject<HTMLInputElement>
): Promise<void> {
  const pokemonName = gameState.inputValue.trim().toLowerCase().replace(/\s+/g, '-');

  gameState.setIsLoading(true);
  gameState.setError('');

  try {
    // Special case for "nidoran" to match both variants
    const isNidoran = pokemonName === 'nidoran';
    let pokemon;
    let secondPokemon;

    if (isNidoran) {
      const nidoranF = gameState.filteredPokemon.find((p: PokemonData) => p.name === 'nidoran-f');
      const nidoranM = gameState.filteredPokemon.find((p: PokemonData) => p.name === 'nidoran-m');
      
      // If both variants are available and neither is caught, catch both
      if (nidoranF && nidoranM &&
          !gameState.caughtPokemon.some((p: CaughtPokemon) => p.name === 'nidoran-f') &&
          !gameState.caughtPokemon.some((p: CaughtPokemon) => p.name === 'nidoran-m')) {
        pokemon = nidoranF;
        secondPokemon = nidoranM;
      } else {
        // Otherwise fall back to catching whichever variant is available
        pokemon = nidoranF || nidoranM;
      }
    } else {
      pokemon = gameState.filteredPokemon.find((p: PokemonData) =>
        p.name.toLowerCase() === pokemonName.toLowerCase() ||
        p.forms.some((f: {name: string; isDefault: boolean}) => f.name.toLowerCase() === pokemonName.toLowerCase())
      );
    }

    if (!pokemon && gameState.isEasyMode) {
      pokemon = findClosestPokemon(pokemonName, gameState.filteredPokemon);
      if (pokemon) {
        gameState.setError(`Accepted "${gameState.inputValue}" as "${pokemon.name}" (Easy Mode)`);
      }
    }

    if (!pokemon) {
      const pokemonExists = POKEMON_DATA.find((p: PokemonData) =>
        p.name.toLowerCase() === pokemonName.toLowerCase() ||
        p.forms.some((f: {name: string; isDefault: boolean}) => f.name.toLowerCase() === pokemonName.toLowerCase()) ||
        (isNidoran && (p.name === 'nidoran-f' || p.name === 'nidoran-m'))
      );

      if (pokemonExists) {
        const inGeneration = gameState.selectedGeneration.name === "All Generations" ||
          (pokemonExists.id >= gameState.selectedGeneration.startId && pokemonExists.id <= gameState.selectedGeneration.endId);

        const matchesType = gameState.selectedType === "All Types" ||
          pokemonExists.types.some((t: string) => t.toLowerCase() === gameState.selectedType.toLowerCase());

        const matchesLetter = gameState.selectedLetter === "All" ||
          pokemonExists.name.toLowerCase().startsWith(gameState.selectedLetter.toLowerCase());

        if (!matchesLetter) {
          gameState.setError(`That Pokémon doesn't start with the letter ${gameState.selectedLetter}!`);
        } else if (!inGeneration) {
          gameState.setError(`That Pokémon is not in ${gameState.selectedGeneration.name}!`);
        } else if (!matchesType) {
          gameState.setError(`That Pokémon is not a ${gameState.selectedType} type!`);
        } else {
          gameState.setError('That\'s not a valid Pokémon name!');
        }
      } else {
        gameState.setError('That\'s not a valid Pokémon name!');
      }
      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
      return;
    }

    // Check for any existing caught forms
    const existingPokemon = gameState.caughtPokemon.find((p: CaughtPokemon) => {
      const pokemonInData = gameState.filteredPokemon.find((pd: PokemonData) =>
        pd.forms.some((f: {name: string; isDefault: boolean}) => f.name.toLowerCase() === p.name.toLowerCase())
      );
      return pokemonInData?.name === pokemon.name;
    });

    if (existingPokemon) {
      const isSameForm = gameState.caughtPokemon.some((p: CaughtPokemon) => p.name.toLowerCase() === pokemonName.toLowerCase());

      if (isSameForm) {
        gameState.setError(`You already caught ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}!`);
      } else {
        gameState.setError(`You already caught a different form of ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
      }
      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
      return;
    }

    const catchPokemon = async (pokemonToCatch: PokemonData) => {
      const form = pokemonName.includes('-') 
        ? pokemonToCatch.forms.find((f: {name: string; isDefault: boolean}) => f.name.toLowerCase() === pokemonName.toLowerCase())
        : pokemonToCatch.forms.find((f: {name: string; isDefault: boolean}) => f.isDefault);

      if (!form) {
        gameState.setError('Could not find a valid form for this Pokemon!');
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return null;
      }

      const sprite = await fetchFormSprite(form.name);
      await playPokemonCry(pokemonToCatch.id, gameState.isMuted);

      return {
        name: form.name,
        sprite: sprite || '',
        types: pokemonToCatch.types
      };
    };

    const firstCaught = await catchPokemon(pokemon);
    if (!firstCaught) return;

    let secondCaught = null;
    if (secondPokemon) {
      secondCaught = await catchPokemon(secondPokemon);
    }

    // Add caught Pokemon to state
    gameState.setCaughtPokemon((prev: CaughtPokemon[]) => {
      const newCaught = [firstCaught];
      if (secondCaught) {
        newCaught.push(secondCaught);
        gameState.setError('Nice! You caught both Nidoran♀ and Nidoran♂!');
      }
      return [...newCaught, ...prev];
    });
    
    gameState.setInputValue('');

    if (inputRef.current) {
      const position = calculateConfettiPosition(inputRef.current);
      gameState.setConfettiProps({
        sprite: firstCaught.sprite,
        position
      });

      // If both were caught, show second confetti after a delay
      if (secondCaught) {
        setTimeout(() => {
          if (inputRef.current) {
            const position = calculateConfettiPosition(inputRef.current);
            gameState.setConfettiProps({
              sprite: secondCaught.sprite,
              position
            });
          }
        }, UI_CONSTANTS.CONFETTI_ANIMATION_DURATION / 2);
      }

      setTimeout(() => {
        gameState.setConfettiProps(null);
      }, UI_CONSTANTS.CONFETTI_ANIMATION_DURATION + (secondCaught ? UI_CONSTANTS.CONFETTI_ANIMATION_DURATION / 2 : 0));

      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
    }
  } catch (error: unknown) {
    console.error('Error in submitPokemonGuess:', error);
    gameState.setError('That\'s not a valid Pokemon name!');
    setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
  } finally {
    gameState.setIsLoading(false);
  }
}

/**
 * Reveals all remaining Pokemon that haven't been caught yet
 * @param gameState The current game state
 * @param onComplete Callback function to run when the reveal process is complete
 * @returns A Promise that resolves when all remaining Pokemon have been revealed
 */
export async function revealRemainingPokemon(
  gameState: GameState,
  onComplete: () => void
): Promise<void> {
  gameState.setIsGivingUp(true);
  gameState.setError('');
  gameState.setInputValue('');
  const revealed: Pokemon[] = [];

  try {
    const revealedPokemonData = gameState.filteredPokemon.filter((pokemon: PokemonData) =>
      !gameState.caughtPokemon.some((caught: CaughtPokemon) =>
        caught.name === pokemon.name ||
        pokemon.forms.some((f: {name: string; isDefault: boolean}) => f.name === caught.name)
      )
    );

    for (const pokemon of revealedPokemonData) {
      const defaultForm = pokemon.forms.find((f: {name: string; isDefault: boolean}) => f.isDefault);
      const formNameToUse = defaultForm ? defaultForm.name : pokemon.name;

      const sprite = await fetchFormSprite(formNameToUse);
      revealed.push({
        id: pokemon.id,
        name: pokemon.name,
        sprite: sprite || '',
        types: pokemon.types
      });
    }
    gameState.setRevealedPokemon(revealed);
  } catch (err) {
    console.error('Error fetching remaining Pokémon sprites:', err);
  } finally {
    gameState.setIsGivingUp(false);
    onComplete();
  }
}