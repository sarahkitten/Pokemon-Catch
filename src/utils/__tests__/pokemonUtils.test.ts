import { 
  playPokemonCry, 
  handlePokemonClick, 
  calculateConfettiPosition, 
  findClosestPokemon, 
  isValidCombination, 
  getRandomValue, 
  findRandomValidCombination 
} from '../pokemonUtils';
import type { PokemonData } from '../../types';

// Mock Audio
const mockAudio = {
  play: jest.fn().mockResolvedValue(undefined)
};

global.Audio = jest.fn().mockImplementation(() => mockAudio);

// Mock console.error
console.error = jest.fn();

describe('pokemonUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('playPokemonCry', () => {
    test('plays pokemon cry when not muted', async () => {
      await playPokemonCry(1, false);
      expect(global.Audio).toHaveBeenCalledWith(
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg'
      );
      expect(mockAudio.play).toHaveBeenCalled();
    });

    test('does not play pokemon cry when muted', async () => {
      await playPokemonCry(25, true);
      expect(global.Audio).not.toHaveBeenCalled();
      expect(mockAudio.play).not.toHaveBeenCalled();
    });

    test('handles error when playing cry', async () => {
      mockAudio.play.mockRejectedValueOnce(new Error('Audio error'));
      await playPokemonCry(4, false);
      expect(console.error).toHaveBeenCalledWith('Error playing cry:', expect.any(Error));
    });
  });

  describe('handlePokemonClick', () => {
    test('finds pokemon by name and plays cry', async () => {
      const playCrySpy = jest.spyOn(global, 'Audio');
      
      const pokemon = { name: 'pikachu', id: 25, sprite: 'pikachu.png', types: ['electric'] };
      const pokemonData = [
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];
      
      await handlePokemonClick(pokemon, pokemonData, false);
      expect(playCrySpy).toHaveBeenCalledWith(
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg'
      );
    });
    
    test('finds pokemon by form name and plays cry', async () => {
      const playCrySpy = jest.spyOn(global, 'Audio');
      
      const pokemon = { name: 'charizard-mega-x', id: 6, sprite: 'charizard-mega-x.png', types: ['fire', 'dragon'] };
      const pokemonData = [
        { id: 6, name: 'charizard', forms: [{ name: 'charizard-mega-x', isDefault: false }], types: ['fire', 'flying'], generation: 1 }
      ];
      
      await handlePokemonClick(pokemon, pokemonData, false);
      expect(playCrySpy).toHaveBeenCalledWith(
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/6.ogg'
      );
    });
    
    test('does not play cry when pokemon is muted', async () => {
      const pokemon = { name: 'pikachu', id: 25, sprite: 'pikachu.png', types: ['electric'] };
      const pokemonData = [
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];
      
      await handlePokemonClick(pokemon, pokemonData, true);
      expect(global.Audio).not.toHaveBeenCalled();
    });
  });

  describe('calculateConfettiPosition', () => {
    test('calculates position correctly including scroll offset', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          left: 100,
          top: 100,
          width: 200,
          height: 200
        })
      };

      Object.defineProperty(window, 'scrollX', { value: 10 });
      Object.defineProperty(window, 'scrollY', { value: 20 });

      const result = calculateConfettiPosition(mockElement as unknown as HTMLElement);
      expect(result).toEqual({ x: 210, y: 220 });
    });
  });

  describe('findClosestPokemon', () => {
    test('finds exact match', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const result = findClosestPokemon('pikachu', mockPokemonData);
      expect(result).toEqual(mockPokemonData[1]);
    });

    test('finds close match within distance threshold', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const result = findClosestPokemon('pikchu', mockPokemonData); // Missing 'a'
      expect(result).toEqual(mockPokemonData[1]);
    });

    test('finds close match by form name', () => {
      const mockPokemonData = [
        { id: 6, name: 'charizard', forms: [{ name: 'charizard-mega-x', isDefault: false }], types: ['fire', 'flying'], generation: 1 },
      ];

      const result = findClosestPokemon('charizard mega x', mockPokemonData);
      expect(result).toEqual(mockPokemonData[0]);
    });

    test('returns undefined when no match is close enough', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const result = findClosestPokemon('mewtwo', mockPokemonData);
      expect(result).toBeUndefined();
    });
  });

  describe('isValidCombination', () => {
    test('returns true for valid generation, type, and letter combination', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const mockGeneration = { name: 'Generation I', startId: 1, endId: 151, total: 151 };
      
      const result = isValidCombination(mockPokemonData, mockGeneration, 'electric', 'p');
      expect(result).toBe(true);
    });

    test('returns false for invalid generation, type, and letter combination', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const mockGeneration = { name: 'Generation I', startId: 1, endId: 151, total: 151 };
      
      const result = isValidCombination(mockPokemonData, mockGeneration, 'fire', 'z');
      expect(result).toBe(false);
    });

    test('returns true for "All" options', () => {
      const mockPokemonData = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 }
      ];

      const mockGeneration = { name: 'All Generations', startId: 1, endId: 1008, total: 1008 };
      
      const result = isValidCombination(mockPokemonData, mockGeneration, 'All Types', 'All');
      expect(result).toBe(true);
    });
  });

  describe('getRandomValue', () => {
    test('returns a random value different from current value', () => {
      const validOptions = ['a', 'b', 'c', 'd'];
      const currentValue = 'a';
      
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValueOnce(0.5);
      
      const result = getRandomValue(validOptions, currentValue);
      
      expect(result).not.toBe(currentValue);
      expect(validOptions).toContain(result);
      
      Math.random = originalRandom;
    });

    test('returns current value if there are no other options', () => {
      const validOptions = ['a'];
      const currentValue = 'a';
      
      const result = getRandomValue(validOptions, currentValue);
      
      expect(result).toBe(currentValue);
    });
  });

  describe('findRandomValidCombination', () => {
    test('returns a valid combination when found', () => {
      const mockPokemonData: PokemonData[] = [
        { id: 1, name: 'bulbasaur', forms: [], types: ['grass', 'poison'], generation: 1 },
        { id: 4, name: 'charmander', forms: [], types: ['fire'], generation: 1 },
        { id: 25, name: 'pikachu', forms: [], types: ['electric'], generation: 1 }
      ];

      const mockGenerations = [
        { name: 'All Generations', startId: 1, endId: 1008, total: 1008 },
        { name: 'Generation I', startId: 1, endId: 151, total: 151 }
      ];

      const mockTypes = ['All Types', 'fire', 'electric', 'grass'];

      const originalRandom = Math.random;
      Math.random = jest.fn()
        .mockReturnValueOnce(0) // For generation (index 1)
        .mockReturnValueOnce(0) // For type (index 1)
        .mockReturnValueOnce(2/26); // For letter ('C')
      
      const result = findRandomValidCombination(mockPokemonData, mockGenerations, mockTypes, 10);
      
      expect(result).toEqual({
        generationIndex: 1,
        type: 'fire',
        letter: 'C'
      });
      
      Math.random = originalRandom;
    });

    test('returns null when no valid combination is found within attempts', () => {
      const mockPokemonData: PokemonData[] = [];
      const mockGenerations = [
        { name: 'All Generations', startId: 1, endId: 1008, total: 1008 },
        { name: 'Generation I', startId: 1, endId: 151, total: 151 }
      ];
      const mockTypes = ['All Types', 'fire', 'electric'];
      
      const result = findRandomValidCombination(mockPokemonData, mockGenerations, mockTypes, 5);
      
      expect(result).toBeNull();
    });
  });
});