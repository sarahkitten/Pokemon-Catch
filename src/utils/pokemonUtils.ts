import type { CaughtPokemon, PokemonData, Pokemon } from "../types";
import { distance } from 'fastest-levenshtein';

export async function playPokemonCry(pokemonId: number, isMuted: boolean) {
  if (isMuted) return;
  
  try {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
    const audio = new Audio(cryUrl);
    audio.play().catch(err => console.log('Error playing cry:', err));
  } catch (err) {
    console.log('Error playing cry:', err);
  }
}

export async function handlePokemonClick(pokemon: CaughtPokemon | Pokemon, pokemonData: PokemonData[], isMuted: boolean) {
  // Find the Pokemon in our data to get its ID
  const pokemonInData = pokemonData.find(p => 
    p.name.toLowerCase() === pokemon.name.toLowerCase() || 
    p.forms.some(f => f.name.toLowerCase() === pokemon.name.toLowerCase())
  );
  
  if (pokemonInData) {
    await playPokemonCry(pokemonInData.id, isMuted);
  }
}

interface ConfettiPosition {
  x: number;
  y: number;
}

export const calculateConfettiPosition = (element: HTMLElement): ConfettiPosition => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + (rect.width / 2);
  const centerY = rect.top + (rect.height / 2);
  
  return {
    x: centerX + window.scrollX,
    y: centerY + window.scrollY
  };
};

export async function fetchFormSprite(pokemonForm: string): Promise<string> {
  try {
    // Try to load from local sprites first
    const localSprite = await import(`../data/sprites/${pokemonForm}.png`);
    if (localSprite) {
      console.log(`Loaded local sprite for ${pokemonForm}`);
      return localSprite.default;
    }
  } catch {
    // If local sprite doesn't exist, fetch from API as fallback
    console.log(`Local sprite not found for ${pokemonForm}, fetching from API...`);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonForm}`);
      if (response.ok) {
        const data = await response.json();
        return data.sprites.front_default;
      }
    } catch (error) {
      console.error('Error fetching sprite:', error);
    }
  }
  return '';
}

export const findClosestPokemon = (input: string, pokemonData: PokemonData[]) => {
  const normalizedInput = input.toLowerCase().trim();
  let closestMatch: PokemonData | undefined = undefined;
  let minDistance = Infinity;
  const maxDistance = 3; // Maximum "distance" to consider a match

  for (const pokemon of pokemonData) {
    // Check base name
    const baseDistance = distance(normalizedInput, pokemon.name.toLowerCase());
    if (baseDistance < minDistance && baseDistance <= maxDistance) {
      minDistance = baseDistance;
      closestMatch = pokemon;
    }

    // Check forms
    for (const form of pokemon.forms) {
      const formDistance = distance(normalizedInput, form.name.toLowerCase());
      if (formDistance < minDistance && formDistance <= maxDistance) {
        minDistance = formDistance;
        closestMatch = pokemon;
      }
    }
  }

  return closestMatch || undefined;
};