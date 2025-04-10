import fs from 'fs';
import path from 'path';

interface PokemonData {
  id: number;
  name: string;
  types: string[];
  generation: number;
}

const GENERATIONS = [
  { name: "Gen 1 (Kanto)", startId: 1, endId: 151 },
  { name: "Gen 2 (Johto)", startId: 152, endId: 251 },
  { name: "Gen 3 (Hoenn)", startId: 252, endId: 386 },
  { name: "Gen 4 (Sinnoh)", startId: 387, endId: 493 },
  { name: "Gen 5 (Unova)", startId: 494, endId: 649 },
  { name: "Gen 6 (Kalos)", startId: 650, endId: 721 },
  { name: "Gen 7 (Alola)", startId: 722, endId: 809 },
  { name: "Gen 8 (Galar)", startId: 810, endId: 905 },
  { name: "Gen 9 (Paldea)", startId: 906, endId: 1008 },
];

async function fetchPokemonData(id: number): Promise<PokemonData | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      console.error(`Failed to fetch Pokemon ${id}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    const generation = GENERATIONS.findIndex(gen => id >= gen.startId && id <= gen.endId) + 1;

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      generation: generation || 1,
    };
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    return null;
  }
}

async function generatePokemonData() {
  const pokemonData: PokemonData[] = [];
  const totalPokemon = GENERATIONS[GENERATIONS.length - 1].endId;

  console.log('Starting to fetch Pokemon data...');
  
  for (let id = 1; id <= totalPokemon; id++) {
    const pokemon = await fetchPokemonData(id);
    if (pokemon) {
      pokemonData.push(pokemon);
      console.log(`Fetched data for ${pokemon.name} (${id}/${totalPokemon})`);
    }

    // Add a small delay to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Sort by ID
  pokemonData.sort((a, b) => a.id - b.id);

  // Generate the TypeScript file content
  const fileContent = `export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  generation: number;
}

export const POKEMON_DATA: PokemonData[] = [
${pokemonData.map(pokemon => `  { id: ${pokemon.id}, name: "${pokemon.name}", types: [${pokemon.types.map(t => `"${t}"`).join(', ')}], generation: ${pokemon.generation} },`).join('\n')}
];`;

  // Write to file
  const outputPath = path.join(process.cwd(), 'src', 'data', 'pokemonData.ts');
  fs.writeFileSync(outputPath, fileContent);
  
  console.log(`\nSuccessfully generated Pokemon data file at ${outputPath}`);
  console.log(`Total Pokemon processed: ${pokemonData.length}`);
}

// Run the script
generatePokemonData().catch(console.error); 