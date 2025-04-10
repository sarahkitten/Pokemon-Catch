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
): Promise<NidoranHandlingResult> {
  // Check if either form is already caught
  const hasNidoranF = caughtPokemon.some(p => p.name === 'nidoran-f');
  const hasNidoranM = caughtPokemon.some(p => p.name === 'nidoran-m');

  // Find Nidoran data
  const nidoranF = pokemonData.find(p => p.name === 'nidoran-f');
  const nidoranM = pokemonData.find(p => p.name === 'nidoran-m');

  if (!nidoranF || !nidoranM) {
    return {
      success: false,
      error: 'Error finding Nidoran data!'
    };
  }

  try {
    // Add both forms if neither is caught
    if (!hasNidoranF && !hasNidoranM) {
      const newCaughtPokemon: CaughtPokemon[] = [];
      
      // Add Nidoran-F
      const responseF = await fetch(`https://pokeapi.co/api/v2/pokemon/nidoran-f`);
      if (responseF.ok) {
        const dataF = await responseF.json();
        const spriteF = dataF.sprites.front_default;
        newCaughtPokemon.push({
          name: 'nidoran-f',
          sprite: spriteF,
          types: nidoranF.types
        });
      }

      // Add Nidoran-M
      const responseM = await fetch(`https://pokeapi.co/api/v2/pokemon/nidoran-m`);
      if (responseM.ok) {
        const dataM = await responseM.json();
        const spriteM = dataM.sprites.front_default;
        newCaughtPokemon.push({
          name: 'nidoran-m',
          sprite: spriteM,
          types: nidoranM.types
        });
      }

      if (newCaughtPokemon.length === 0) {
        return {
          success: false,
          error: 'Error fetching Nidoran sprites!'
        };
      }

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
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formName}`);
      if (!response.ok) {
        return {
          success: false,
          error: 'Error fetching Nidoran sprite!'
        };
      }

      const data = await response.json();
      const sprite = data.sprites.front_default;

      const caughtPokemon: CaughtPokemon = {
        name: formName,
        sprite: sprite,
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