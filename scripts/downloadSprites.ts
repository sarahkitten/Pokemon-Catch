import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { POKEMON_DATA } from '../src/data/pokemonData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PokemonAPIResponse {
  sprites: {
    front_default: string | null;
  };
}

async function downloadSprite(pokemonForm: string): Promise<Buffer | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonForm}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as PokemonAPIResponse;
    const sprite = data.sprites.front_default;
    if (!sprite) {
      return null;
    }

    const spriteResponse = await fetch(sprite);
    if (!spriteResponse.ok) {
      throw new Error(`HTTP error! status: ${spriteResponse.status}`);
    }
    
    const arrayBuffer = await spriteResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error downloading sprite for ${pokemonForm}:`, error);
    return null;
  }
}

async function main() {
  // Create sprites directory if it doesn't exist
  const spritesDir = path.join(__dirname, '../src/data/sprites');
  if (!fs.existsSync(spritesDir)) {
    fs.mkdirSync(spritesDir, { recursive: true });
  }

  // Track sprites data for generating the index
  const spritesData: Record<string, string> = {};

  console.log('Starting to download Pokemon sprites...');
  
  // Download sprites for each Pokemon's default form
  const totalPokemon = POKEMON_DATA.length;
  for (let i = 0; i < POKEMON_DATA.length; i++) {
    const pokemon = POKEMON_DATA[i];
    const defaultForm = pokemon.forms.find(f => f.isDefault);
    if (defaultForm) {
      console.log(`Downloading sprite for ${defaultForm.name} (${i + 1}/${totalPokemon})...`);
      const spriteData = await downloadSprite(defaultForm.name);
      
      if (spriteData) {
        const fileName = `${defaultForm.name}.png`;
        const filePath = path.join(spritesDir, fileName);
        fs.writeFileSync(filePath, spriteData);
        spritesData[defaultForm.name] = fileName;
        console.log(`✓ Saved sprite for ${defaultForm.name} (${i + 1}/${totalPokemon})`);
      } else {
        console.error(`✗ Failed to download sprite for ${defaultForm.name} (${i + 1}/${totalPokemon})`);
      }

      // Add a small delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Generate sprites index file
  const spriteIndexPath = path.join(__dirname, '../src/data/spriteIndex.ts');
  const indexContent = `// This file is auto-generated. Do not edit manually.
export const SPRITE_INDEX: Record<string, string> = ${JSON.stringify(spritesData, null, 2)};
`;
  fs.writeFileSync(spriteIndexPath, indexContent);
  console.log('Generated sprite index file');
}

main().catch(console.error);