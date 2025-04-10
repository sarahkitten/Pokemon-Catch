import { useState, useRef, useEffect } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'
import { POKEMON_DATA } from './data/pokemonData'
import { handleNidoranInput, playPokemonCry } from './utils/pokemonUtils'
import { PokemonData, CaughtPokemon } from './types'

interface Generation {
  name: string;
  startId: number;
  endId: number;
  total: number;
}

interface Pokemon {
  name: string;
  sprite: string;
  types: string[];
  id: number;
}

const POKEMON_TYPES = [
  "All Types", "Normal", "Fire", "Water", "Electric", "Grass", "Ice", 
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", 
  "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

const GENERATIONS: Generation[] = [
  { name: "All Generations", startId: 1, endId: 1008, total: 1008 },
  { name: "Gen 1 (Kanto)", startId: 1, endId: 151, total: 151 },
  { name: "Gen 2 (Johto)", startId: 152, endId: 251, total: 100 },
  { name: "Gen 3 (Hoenn)", startId: 252, endId: 386, total: 135 },
  { name: "Gen 4 (Sinnoh)", startId: 387, endId: 493, total: 107 },
  { name: "Gen 5 (Unova)", startId: 494, endId: 649, total: 156 },
  { name: "Gen 6 (Kalos)", startId: 650, endId: 721, total: 72 },
  { name: "Gen 7 (Alola)", startId: 722, endId: 809, total: 88 },
  { name: "Gen 8 (Galar)", startId: 810, endId: 905, total: 96 },
  { name: "Gen 9 (Paldea)", startId: 906, endId: 1008, total: 103 },
];

function App() {
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTotalLoading, setIsTotalLoading] = useState(false);
  const [confettiProps, setConfettiProps] = useState<{ sprite: string; position: { x: number; y: number } } | null>(null);
  const [selectedGenerationIndex, setSelectedGenerationIndex] = useState<number>(0);
  const selectedGeneration = GENERATIONS[selectedGenerationIndex];
  const [selectedType, setSelectedType] = useState<string>(POKEMON_TYPES[0]);
  const [totalPokemon, setTotalPokemon] = useState<number>(GENERATIONS[0].total);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGivingUp, setIsGivingUp] = useState(false);
  const [remainingPokemon, setRemainingPokemon] = useState<Pokemon[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [spriteCache, setSpriteCache] = useState<Record<string, string>>({});
  const [isMuted, setIsMuted] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const fetchSprite = async (pokemonName: string): Promise<string> => {
    // Check cache first
    if (spriteCache[pokemonName]) {
      return spriteCache[pokemonName];
    }
    
    // Fetch from API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (response.ok) {
      const data = await response.json();
      const sprite = data.sprites.front_default;
      // Update cache
      setSpriteCache(prev => ({ ...prev, [pokemonName]: sprite }));
      return sprite;
    }
    return '';
  };

  useEffect(() => {
    updateTotalCount(selectedGeneration, selectedType);
  }, []);

  const resetProgress = () => {
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setRemainingPokemon([]);
  };

  const handleGenerationChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value);
    const newGen = GENERATIONS[newIndex];
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing generations will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    
    setSelectedGenerationIndex(newIndex);
    resetProgress();
    await updateTotalCount(newGen, selectedType);
  };

  const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing types will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    
    setSelectedType(newType);
    resetProgress();
    await updateTotalCount(selectedGeneration, newType);
  };

  const updateTotalCount = async (generation: Generation, type: string) => {
    console.log('Updating total count for:', generation.name, type);
    
    setIsTotalLoading(true);
    setIsFetchingData(true);
    setNoResults(false);
    
    try {
      // Filter Pokemon based on generation and type using local data
      const filteredPokemon = POKEMON_DATA.filter(pokemon => {
        const inGeneration = generation.name === "All Generations" || 
          (pokemon.id >= generation.startId && pokemon.id <= generation.endId);
        const matchesType = type === "All Types" || 
          pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
        return inGeneration && matchesType;
      });
      
      console.log('Filtered Pokemon list:', filteredPokemon);
      setTotalPokemon(filteredPokemon.length);
      setPokemonData(filteredPokemon);
      
      if (filteredPokemon.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      console.error('Error updating Pokemon data:', err);
    } finally {
      setIsTotalLoading(false);
      setIsFetchingData(false);
    }
  };

  const handleStartOver = () => {
    if (caughtPokemon.length === 0 && remainingPokemon.length === 0) return;
    
    const confirmReset = window.confirm(
      `Are you sure you want to start over?${caughtPokemon.length > 0 ? ` This will release all ${caughtPokemon.length} Pokemon.` : ''}`
    );
    
    if (confirmReset) {
      resetProgress();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pokemonName = inputValue.trim().toLowerCase().replace(/\s+/g, '-');
    
    // Special case for Nidoran
    if (pokemonName === 'nidoran') {
      setIsLoading(true);
      setError('');
      
      const result = await handleNidoranInput(pokemonData, caughtPokemon);
      
      if (!result.success) {
        setError(result.error || 'Error catching Nidoran!');
        setTimeout(() => inputRef.current?.focus(), 10);
        setIsLoading(false);
        return;
      }

      if (result.caughtPokemon) {
        // Update sprite cache with new sprites
        result.caughtPokemon.forEach(pokemon => {
          if (pokemon.sprite) {
            setSpriteCache(prev => ({ ...prev, [pokemon.name]: pokemon.sprite }));
          }
        });

        setCaughtPokemon(prev => [...result.caughtPokemon!, ...prev]);
        setInputValue('');
        setError('');
        
        // Play cry if not muted
        if (!isMuted && result.cryId) {
          await playPokemonCry(result.cryId, isMuted);
        }
        
        // Get position for confetti
        const rect = inputRef.current?.getBoundingClientRect();
        if (rect && result.sprite) {
          const centerX = rect.left + (rect.width / 2);
          const centerY = rect.top + (rect.height / 2);
          
          setConfettiProps({
            sprite: result.sprite,
            position: {
              x: centerX + window.scrollX,
              y: centerY + window.scrollY
            }
          });
          
          setTimeout(() => inputRef.current?.focus(), 10);
          setTimeout(() => setConfettiProps(null), 2000);
        }
      }
      
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Find the Pokemon in our pre-fetched data
      const pokemon = pokemonData.find(p => 
        p.name.toLowerCase() === pokemonName.toLowerCase() ||  // Match base name
        p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())  // Match specific form
      );
      
      if (!pokemon) {
        // Check if the Pokemon exists in POKEMON_DATA but not in current selection
        const pokemonExists = POKEMON_DATA.find(p => 
          p.name.toLowerCase() === pokemonName.toLowerCase() || 
          p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
        );

        if (pokemonExists) {
          // Check if it's a generation mismatch
          const inGeneration = selectedGeneration.name === "All Generations" || 
            (pokemonExists.id >= selectedGeneration.startId && pokemonExists.id <= selectedGeneration.endId);
          
          // Check if it's a type mismatch
          const matchesType = selectedType === "All Types" || 
            pokemonExists.types.some(t => t.toLowerCase() === selectedType.toLowerCase());

          if (!inGeneration) {
            setError(`That Pokemon is not in ${selectedGeneration.name}!`);
          } else if (!matchesType) {
            setError(`That Pokemon is not a ${selectedType} type!`);
          } else {
            setError('That\'s not a valid Pokemon name!');
          }
        } else {
          setError('That\'s not a valid Pokemon name!');
        }
        setTimeout(() => inputRef.current?.focus(), 10);
        return;
      }

      // Check if any form of this Pokemon is already caught
      const existingPokemon = caughtPokemon.find(p => {
        const pokemonInData = pokemonData.find(pd => 
          pd.forms.some(f => f.name.toLowerCase() === p.name.toLowerCase())
        );
        return pokemonInData?.name === pokemon.name;
      });

      if (existingPokemon) {
        // Check if they're trying to catch the exact same form
        const isSameForm = caughtPokemon.some(p => p.name.toLowerCase() === pokemonName.toLowerCase());
        
        if (isSameForm) {
          setError(`You already caught ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}!`);
        } else {
          setError(`You already caught a different form of ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
        }
        setTimeout(() => inputRef.current?.focus(), 10);
        return;
      }

      // Determine which form to use
      let form;
      if (pokemonName.includes('-')) {
        // If input includes a form, try to find that specific form
        form = pokemon.forms.find(f => f.name.toLowerCase() === pokemonName.toLowerCase());
      }
      
      // If no specific form found or no form specified, use the default form
      if (!form) {
        form = pokemon.forms.find(f => f.isDefault);
      }

      if (!form) {
        setError('Could not find a valid form for this Pokemon!');
        setTimeout(() => inputRef.current?.focus(), 10);
        return;
      }

      // Fetch sprite using the enhanced function
      const sprite = await fetchSprite(form.name);

      // Fetch and play the Pokemon's cry if not muted
      if (!isMuted) {
        try {
          const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
          const audio = new Audio(cryUrl);
          audio.play().catch(err => console.log('Error playing cry:', err));
        } catch (err) {
          console.log('Error fetching cry:', err);
        }
      }

      const newCaughtPokemon: CaughtPokemon = {
        name: form.name,
        sprite: sprite || '',
        types: pokemon.types
      };

      setCaughtPokemon(prev => [newCaughtPokemon, ...prev]);
      setInputValue('');
      setError('');
      
      // Get position for confetti
      const rect = inputRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + (rect.width / 2);
        const centerY = rect.top + (rect.height / 2);
        
        setConfettiProps({
          sprite: newCaughtPokemon.sprite,
          position: {
            x: centerX + window.scrollX,
            y: centerY + window.scrollY
          }
        });
        
        setTimeout(() => inputRef.current?.focus(), 10);
        setTimeout(() => setConfettiProps(null), 2000);
      }
    } catch (err) {
      setError('That\'s not a valid Pokemon name!');
      setTimeout(() => inputRef.current?.focus(), 10);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGiveUp = async () => {
    if (caughtPokemon.length === totalPokemon) {
      return; // No need to give up if all Pokemon are caught
    }

    const confirmGiveUp = window.confirm(
      `Are you sure you want to give up? This will reveal all remaining Pokemon!`
    );
    
    if (!confirmGiveUp) return;

    setIsGivingUp(true);
    setError(''); // Clear any error messages
    setInputValue(''); // Clear the input field
    const remaining: Pokemon[] = [];
    
    try {
      for (let id = selectedGeneration.startId; id <= selectedGeneration.endId; id++) {
        // Skip if already caught
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          const types = data.types.map((t: any) => t.type.name);
          
          // Skip if this Pokemon is already caught
          if (caughtPokemon.some(p => p.name === data.name)) {
            continue;
          }
          
          // Check if Pokemon matches selected type
          if (selectedType === "All Types" || types.includes(selectedType.toLowerCase())) {
            remaining.push({
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
              types
            });
          }
        }
      }
      setRemainingPokemon(remaining);
    } catch (err) {
      console.error('Error fetching remaining Pokemon:', err);
    } finally {
      setIsGivingUp(false);
    }
  };

  const handlePokemonClick = async (pokemon: CaughtPokemon | Pokemon) => {
    // Find the Pokemon in our data to get its ID
    const pokemonInData = POKEMON_DATA.find(p => 
      p.name.toLowerCase() === pokemon.name.toLowerCase() || 
      p.forms.some(f => f.name.toLowerCase() === pokemon.name.toLowerCase())
    );
    
    if (pokemonInData) {
      await playPokemonCry(pokemonInData.id, isMuted);
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <h1>Catch them all!</h1>
        
        <div className="pokemon-section">
          <h2>How many Pokemon can you catch?</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isFetchingData ? "Loading Pokemon data..." : remainingPokemon.length > 0 ? "Click 'Start Over' to catch more Pokemon" : "Enter a Pokemon name"}
              disabled={isLoading || remainingPokemon.length > 0 || isFetchingData}
            />
          </form>

          <div className="message-container">
            {error && <p className="error">{error}</p>}
            {isLoading && <p className="loading">Searching for Pokemon...</p>}
            {isFetchingData && <p className="loading">Loading Pokemon data...</p>}
            {noResults && <p className="error">No Pokemon found matching these filters!</p>}
            {remainingPokemon.length > 0 && (
              <p className="info">Click 'Start Over' to try catching Pokemon again!</p>
            )}
          </div>
          
          <div className="controls">
            {!noResults && (
              <p className={`counter ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
                {isTotalLoading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : caughtPokemon.length === totalPokemon ? (
                  `Congratulations! You've caught all ${totalPokemon} Pokemon!`
                ) : (
                  `You've caught ${caughtPokemon.length} Pokemon! ${totalPokemon - caughtPokemon.length} to go!`
                )}
              </p>
            )}
            <div className="button-group">
              {(caughtPokemon.length > 0 || remainingPokemon.length > 0) && (
                <button onClick={handleStartOver} className="start-over-button">
                  Start Over
                </button>
              )}
              {remainingPokemon.length === 0 && caughtPokemon.length < totalPokemon && (
                <button
                  className="give-up-button"
                  onClick={handleGiveUp}
                  disabled={isGivingUp}
                >
                  {isGivingUp ? "Loading..." : "Give Up"}
                </button>
              )}
              <button
                className={`mute-button ${isMuted ? 'muted' : ''}`}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute Pokemon cries" : "Mute Pokemon cries"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>

          {(caughtPokemon.length > 0 || remainingPokemon.length > 0) && (
            <div className={`caught-list ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
              <h3>Pokemon Collection:</h3>
              <div className="pokemon-list">
                {caughtPokemon.map((pokemon) => (
                  <div 
                    key={pokemon.name} 
                    className="pokemon-card"
                    onClick={() => handlePokemonClick(pokemon)}
                  >
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                    <span>{pokemon.name}</span>
                    <div className="pokemon-types">
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-tag ${type}`}>{type}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {remainingPokemon.map((pokemon) => (
                  <div 
                    key={pokemon.name} 
                    className="pokemon-card uncaught"
                    onClick={() => handlePokemonClick(pokemon)}
                  >
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                    <span>{pokemon.name}</span>
                    <div className="pokemon-types">
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-tag ${type}`}>{type}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar">
        <div className="filters">
          <div className="generation-selector">
            <label htmlFor="generation">Choose your region:</label>
            <select 
              id="generation" 
              onChange={handleGenerationChange}
              value={selectedGenerationIndex}
            >
              {GENERATIONS.map((gen, index) => (
                <option key={gen.name} value={index}>
                  {gen.name} ({gen.total} Pokemon)
                </option>
              ))}
            </select>
          </div>

          <div className="type-selector">
            <label htmlFor="type">Choose Pokemon type:</label>
            <select 
              id="type" 
              onChange={handleTypeChange}
              value={selectedType}
            >
              {POKEMON_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {confettiProps && (
        <PokemonConfetti
          spriteUrl={confettiProps.sprite}
          inputPosition={confettiProps.position}
        />
      )}
    </div>
  );
}

export default App;