// import { createPokemonFilters } from '../pokemonStateUtils';
// import { GENERATIONS, POKEMON_TYPES } from '../../constants';
// import { PokemonData } from '../../types';

// describe('pokemonStateUtils', () => {
//   describe('createPokemonFilters', () => {
//     const mockPokemonData: PokemonData[] = [
//       {
//         id: 1,
//         name: 'Bulbasaur',
//         types: ['Grass', 'Poison'],
//         sprite: 'bulbasaur.png'
//       },
//       {
//         id: 4,
//         name: 'Charmander',
//         types: ['Fire'],
//         sprite: 'charmander.png'
//       },
//       {
//         id: 7,
//         name: 'Squirtle',
//         types: ['Water'],
//         sprite: 'squirtle.png'
//       },
//       {
//         id: 152,
//         name: 'Chikorita',
//         types: ['Grass'],
//         sprite: 'chikorita.png'
//       },
//       {
//         id: 252,
//         name: 'Treecko',
//         types: ['Grass'],
//         sprite: 'treecko.png'
//       }
//     ];

//     test('should filter by All Generations and All Types correctly', () => {
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[0], // All Generations
//         POKEMON_TYPES[0], // All Types
//         'All'
//       );

//       expect(result).toHaveLength(5);
//       expect(result).toEqual(mockPokemonData);
//     });

//     test('should filter by specific generation correctly', () => {
//       // Gen 1 (IDs 1-151)
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[1], // Gen 1
//         POKEMON_TYPES[0], // All Types
//         'All'
//       );

//       expect(result).toHaveLength(3);
//       expect(result[0].name).toBe('Bulbasaur');
//       expect(result[1].name).toBe('Charmander');
//       expect(result[2].name).toBe('Squirtle');
//     });

//     test('should filter by specific type correctly', () => {
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[0], // All Generations
//         'Grass', // Grass Type
//         'All'
//       );

//       expect(result).toHaveLength(3);
//       expect(result[0].name).toBe('Bulbasaur');
//       expect(result[1].name).toBe('Chikorita');
//       expect(result[2].name).toBe('Treecko');
//     });

//     test('should filter by starting letter correctly', () => {
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[0], // All Generations
//         POKEMON_TYPES[0], // All Types
//         'C'
//       );

//       expect(result).toHaveLength(2);
//       expect(result[0].name).toBe('Charmander');
//       expect(result[1].name).toBe('Chikorita');
//     });

//     test('should apply multiple filters simultaneously', () => {
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[1], // Gen 1
//         'Grass', // Grass Type
//         'B'
//       );

//       expect(result).toHaveLength(1);
//       expect(result[0].name).toBe('Bulbasaur');
//     });

//     test('should handle case insensitivity for types and letters', () => {
//       const resultType = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[0],
//         'grass', // lowercase type
//         'All'
//       );

//       expect(resultType).toHaveLength(3);
//       expect(resultType[0].name).toBe('Bulbasaur');

//       const resultLetter = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[0],
//         POKEMON_TYPES[0],
//         'c' // lowercase letter
//       );

//       expect(resultLetter).toHaveLength(2);
//       expect(resultLetter[0].name).toBe('Charmander');
//     });

//     test('should return empty array when no Pokemon match filters', () => {
//       const result = createPokemonFilters(
//         mockPokemonData,
//         GENERATIONS[1], // Gen 1
//         'Dragon', // Dragon Type
//         'Z'
//       );

//       expect(result).toHaveLength(0);
//       expect(result).toEqual([]);
//     });
//   });
// });