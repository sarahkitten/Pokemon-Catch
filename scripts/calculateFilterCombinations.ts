import { GENERATIONS, POKEMON_TYPES, type Generation } from '../src/constants.ts';
import { POKEMON_DATA, type PokemonData } from '../src/data/pokemonData.ts';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface FilterCombination {
  generation: string;
  type: string;
  letter: string;
  count: number;
}

function countMatchingPokemon(generation: Generation, type: string, letter: string): number {
  return POKEMON_DATA.filter((p: PokemonData) => {
    const inGeneration = generation.name === "All Generations" ||
      (p.id >= generation.startId && p.id <= generation.endId);
    const matchesType = type === "All Types" ||
      p.types.some((t: string) => t.toLowerCase() === type.toLowerCase());
    const matchesLetter = letter === "All" ||
      p.name.toLowerCase().startsWith(letter.toLowerCase());
    return inGeneration && matchesType && matchesLetter;
  }).length;
}

// Calculate all valid combinations
const combinations: FilterCombination[] = [];
const letters = ['All', ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];

// First get the "All/All/All" combination
const totalCount = countMatchingPokemon(GENERATIONS[0], "All Types", "All");
const allAllAll = {
  generation: GENERATIONS[0].name,
  type: "All Types",
  letter: "All",
  count: totalCount
};

// Then get all other combinations
for (const generation of GENERATIONS) {
  for (const type of POKEMON_TYPES) {
    for (const letter of letters) {
      // Skip the All/All/All combination since we handled it separately
      if (generation.name === "All Generations" && type === "All Types" && letter === "All") {
        continue;
      }
      
      const count = countMatchingPokemon(generation, type, letter);
      if (count > 0) {
        combinations.push({
          generation: generation.name,
          type,
          letter,
          count
        });
      }
    }
  }
}

// Group combinations by count ranges
const countRanges = {
  totalPokemon: allAllAll,
  '1-5': combinations.filter(c => c.count >= 1 && c.count <= 5),
  '6-20': combinations.filter(c => c.count > 5 && c.count <= 20),
  '21-50': combinations.filter(c => c.count > 20 && c.count <= 50),
  '50+': combinations.filter(c => c.count > 50)
};

// Save the data
writeFileSync(
  join(__dirname, '../src/data/filterCombinations.json'),
  JSON.stringify(countRanges, null, 2)
);

// Print some statistics
console.log('Filter combinations calculated:');
console.log(`Total Pokemon: ${totalCount}`);
Object.entries(countRanges).forEach(([range, combs]) => {
  if (range !== 'totalPokemon') {
    console.log(`${range}: ${(combs as FilterCombination[]).length} combinations`);
  }
});