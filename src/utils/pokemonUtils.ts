import { CaughtPokemon, PokemonData, Pokemon } from "../types";

interface NidoranHandlingResult {
  success: boolean;
  error?: string;
  caughtPokemon?: CaughtPokemon[];
  sprite?: string;
  cryId?: number;
}

export async function handleNidoranInput(
  pokemonData: PokemonData[],
  caughtPokemon: CaughtPokemon[],
  spriteCache: Record<string, string>,
): Promise<NidoranHandlingResult> {
  // Check if either form is already caught
  const hasNidoranF = caughtPokemon.some(p => p.name.toLowerCase() === 'nidoran-f');
  const hasNidoranM = caughtPokemon.some(p => p.name.toLowerCase() === 'nidoran-m');
  
  if (hasNidoranF && hasNidoranM) {
    return {
      success: false,
      error: 'You already caught both Nidoran forms!'
    };
  }

  try {
    // Find both Nidoran forms
    const nidoranF = pokemonData.find(p => p.name.toLowerCase() === 'nidoran-f');
    const nidoranM = pokemonData.find(p => p.name.toLowerCase() === 'nidoran-m');
    
    if (!nidoranF || !nidoranM) {
      return {
        success: false,
        error: 'Error finding Nidoran forms!'
      };
    }

    // Add both forms if neither is caught
    if (!hasNidoranF && !hasNidoranM) {
      const newCaughtPokemon: CaughtPokemon[] = [];
      
      // Add Nidoran-F
      let spriteF = spriteCache['nidoran-f'];
      if (!spriteF) {
        const responseF = await fetch(`https://pokeapi.co/api/v2/pokemon/nidoran-f`);
        if (responseF.ok) {
          const dataF = await responseF.json();
          spriteF = dataF.sprites.front_default;
        }
      }
      
      newCaughtPokemon.push({
        name: 'nidoran-f',
        sprite: spriteF || '',
        types: nidoranF.types
      });

      // Add Nidoran-M
      let spriteM = spriteCache['nidoran-m'];
      if (!spriteM) {
        const responseM = await fetch(`https://pokeapi.co/api/v2/pokemon/nidoran-m`);
        if (responseM.ok) {
          const dataM = await responseM.json();
          spriteM = dataM.sprites.front_default;
        }
      }
      
      newCaughtPokemon.push({
        name: 'nidoran-m',
        sprite: spriteM || '',
        types: nidoranM.types
      });

      return {
        success: true,
        caughtPokemon: newCaughtPokemon,
        sprite: newCaughtPokemon[0].sprite,
        cryId: nidoranF.id
      };
    } else {
      // Add the missing form
      const missingForm = hasNidoranF ? nidoranM : nidoranF;
      const formName = hasNidoranF ? 'nidoran-m' : 'nidoran-f';
      
      let sprite = spriteCache[formName];
      if (!sprite) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formName}`);
        if (response.ok) {
          const data = await response.json();
          sprite = data.sprites.front_default;
        }
      }

      const caughtPokemon: CaughtPokemon = {
        name: formName,
        sprite: sprite || '',
        types: missingForm.types
      };

      return {
        success: true,
        caughtPokemon: [caughtPokemon],
        sprite: caughtPokemon.sprite,
        cryId: missingForm.id
      };
    }
  } catch (err) {
    return {
      success: false,
      error: 'Error catching Nidoran!'
    };
  }
}

export async function fetchPokemonForms(baseName: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${baseName}`);
    if (!response.ok) return null;
    const speciesData = await response.json();
    const forms = speciesData.varieties.map((variety: any) => ({
      name: variety.pokemon.name,
      isDefault: variety.is_default
    }));
    return forms;
  } catch (err) {
    console.error('Error fetching Pokemon forms:', err);
    return null;
  }
}

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