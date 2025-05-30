import type { TimeTrialShareParams, TimeTrialDifficulty, PokemonCountCategory } from '../types';
import { GENERATIONS } from '../constants';

/**
 * Encodes Time Trial challenge parameters into a URL string using base64
 */
export function encodeTimeTrialChallenge(params: TimeTrialShareParams): string {
  // Create a compact object with the challenge data
  const challengeData = {
    d: params.difficulty,
    p: params.pokemonCountCategory,
    e: params.easyMode,
    g: params.generationIndex,
    t: params.type,
    l: params.letter
  };
  
  // Convert to JSON and encode with base64
  const jsonString = JSON.stringify(challengeData);
  const encodedData = btoa(jsonString);
  
  // Create URL with encoded challenge parameter
  const searchParams = new URLSearchParams();
  searchParams.set('c', encodedData);
  
  return `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
}

/**
 * Decodes Time Trial challenge parameters from URL search params
 */
export function decodeTimeTrialChallenge(searchParams: URLSearchParams): TimeTrialShareParams | null {
  const encodedChallenge = searchParams.get('c');
  if (!encodedChallenge) {
    return null;
  }
  
  try {
    // Decode base64 and parse JSON
    const jsonString = atob(encodedChallenge);
    const challengeData = JSON.parse(jsonString);
    
    // Extract values from compact format
    const difficulty = (challengeData.d || 'medium') as TimeTrialDifficulty;
    const pokemonCountCategory = (challengeData.p || '1-5') as PokemonCountCategory;
    const easyMode = challengeData.e || false;
    const generationIndex = challengeData.g || 0;
    const type = challengeData.t || 'All Types';
    const letter = challengeData.l || 'All';
    
    // Validate the parameters
    if (!difficulty || !pokemonCountCategory || typeof generationIndex !== 'number') {
      return null;
    }
    
    // Validate difficulty
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return null;
    }
    
    // Validate pokemon count category
    if (!['1-5', '6-20', '21-50', '50+', 'All'].includes(pokemonCountCategory)) {
      return null;
    }
    
    // Validate generation index
    if (generationIndex < 0 || generationIndex >= GENERATIONS.length) {
      return null;
    }
    
    return {
      difficulty,
      pokemonCountCategory,
      easyMode,
      generationIndex,
      type,
      letter
    };
  } catch (error) {
    console.error('Error decoding Time Trial challenge:', error);
    return null;
  }
}

/**
 * Checks if the current URL contains a shared Time Trial challenge
 */
export function hasSharedChallenge(): boolean {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('c');
}

/**
 * Clears the challenge parameters from the URL without page reload
 */
export function clearChallengeFromUrl(): void {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, document.title, url.toString());
}

/**
 * Copies text to clipboard with fallback for older browsers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Generates a readable description of the challenge filters
 */
export function getChallengeDescription(params: TimeTrialShareParams): string {
  const generation = GENERATIONS[params.generationIndex];
  const generationText = generation?.name || 'All Generations';
  const typeText = params.type === 'All Types' ? '' : ` ${params.type}-type`;
  const letterText = params.letter === 'All' ? '' : ` starting with "${params.letter}"`;
  
  return `Catch ${generationText}${typeText} Pokémon${letterText}!`;
}
